import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegTimesCircle } from "react-icons/fa";

const AllListings = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showListingsError, setShowListingsError] = useState(false);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setShowListingsError(false);
        const res = await fetch(
          `http://localhost:4000/api/v1/user/listings/${currentUser._id}`,
          { method: "GET", credentials: "include" }
        );
        const data = await res.json();
        if (!res.ok) {
          setShowListingsError(true);
          return;
        }
        const listingsWithData = await Promise.all(
          data.map(async (listing) => {
            const userRes = await fetch(
              `http://localhost:4000/api/v1/user/${listing.userRef}`,
              { method: "GET", credentials: "include" }
            );
            const userData = await userRes.json();
            return { ...listing, userRef: userData };
          })
        );
        setListings(listingsWithData);
      } catch (error) {
        setShowListingsError(true);
      }
    };
    fetchListings();
  }, [currentUser._id]);

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/v1/listing/delete/${listingId}`,
        { method: "DELETE", credentials: "include" }
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data);
        return;
      }
      setListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  if (!currentUser?.isAdmin) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="w-full mx-auto flex flex-col gap-4 overflow-hidden">
      <h1 className="text-start mt-7 text-2xl font-semibold mx-6 text-gray-600 dark:text-gray-100 my-4">
        All Listings
      </h1>
      <div className="overflow-x-auto w-screen p-2">
        {listings && listings.length > 0 ? (
          <Table
            hoverable
            className="table-auto overflow-x-scroll w-fit scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-gray-300 dark:scrollbar-thumb-gray-600"
          >
            <Table.Head>
              <Table.HeadCell className="bg-blue-600 text-gray-100 text-lg font-normal capitalize">
                Image
              </Table.HeadCell>
              <Table.HeadCell className="bg-blue-600 text-gray-100 text-lg font-normal capitalize">
                Name
              </Table.HeadCell>
              <Table.HeadCell className="bg-blue-600 text-gray-100 text-lg font-normal capitalize">
                Owner
              </Table.HeadCell>
              <Table.HeadCell className="bg-blue-600 text-gray-100 text-lg font-normal capitalize">
                Type
              </Table.HeadCell>
              <Table.HeadCell className="bg-blue-600 text-gray-100 text-lg font-normal capitalize">
                Offer
              </Table.HeadCell>
              <Table.HeadCell className="bg-blue-600 text-gray-100 text-lg font-normal capitalize">
                Delete
              </Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {listings.map((listing) => (
                <Table.Row
                  className="bg-gray-100 dark:bg-gray-600 dark:hover:bg-opacity-40 text-gray-600 dark:text-gray-100 transition-all duration-300"
                  key={listing._id}
                >
                  <Table.Cell>
                    <Link to={`/listing/${listing._id}`}>
                      <img
                        src={listing.imageUrls[0]}
                        alt="listing cover"
                        className="h-16 w-16 object-contain rounded-md"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/listing/${listing._id}`}>{listing.name}</Link>
                  </Table.Cell>
                  <Table.Cell>{listing.userRef?.username}</Table.Cell>
                  <Table.Cell className="capitalize">{listing.type}</Table.Cell>
                  <Table.Cell className="text-xl">
                    {listing.offer ? (
                      <FaRegCircleCheck />
                    ) : (
                      <FaRegTimesCircle />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => handleListingDelete(listing._id)}
                      className="font-medium text-sm text-red-700  dark:text-red-400 hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <p className="text-lg text-slate-500">You Have No Listings Yet!</p>
        )}
      </div>
    </div>
  );
};

export default AllListings;
