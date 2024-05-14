import { Modal, Table, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import axios from "axios";

const Users = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/v1/user/getallusers/${currentUser._id}`,
          { method: "GET", credentials: "include" }
        );
        const data = await res.json();
        if (res?.ok) {
          setUsers(data);
          if (data?.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser?.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(
        `http://localhost:4000/api/v1/user/getusers?startIndex=${startIndex}`,
        { method: "GET", credentials: "include" }
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data?.users]);
        if (data?.users?.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `http://localhost:4000/api/v1/user/delete/${userIdToDelete}`,
        { method: "DELETE", credentials: "include" }
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data?.message);
      } else {
        setUsers((users) =>
          users.filter((user) => user._id !== userIdToDelete)
        );
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="w-full mx-auto flex flex-col gap-4 overflow-hidden">
      <h1 className="text-start mt-7 text-2xl font-semibold mx-6 text-gray-600 dark:text-gray-100 my-4">
        Users
      </h1>
      <div className="overflow-x-auto w-screen p-2">
        {currentUser?.isAdmin && users.length > 0 ? (
          <>
            <Table
              hoverable
              className="table-auto overflow-x-scroll w-fit scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
            >
              <Table.Head>
                <Table.HeadCell className="bg-blue-600 text-gray-100 text-lg font-normal capitalize">
                  Profile
                </Table.HeadCell>
                <Table.HeadCell className="bg-blue-600 text-gray-100 text-lg font-normal capitalize">
                  Username
                </Table.HeadCell>
                <Table.HeadCell className="bg-blue-600 text-gray-100 text-lg font-normal capitalize">
                  Email
                </Table.HeadCell>
                <Table.HeadCell className="bg-blue-600 text-gray-100 text-lg font-normal capitalize">
                  {" "}
                  Status
                </Table.HeadCell>
                <Table.HeadCell className="bg-blue-600 text-gray-100 text-lg font-normal capitalize">
                  {" "}
                  Delete
                </Table.HeadCell>
              </Table.Head>
              {users.map((user) => (
                <Table.Body className="divide-y">
                  <Table.Row
                    className="bg-gray-100 dark:bg-gray-600 dark:hover:bg-opacity-40 text-gray-600 dark:text-gray-100 transition-all duration-300"
                    key={user._id}
                  >
                    <Table.Cell>
                      <img
                        src={user?.avatar}
                        alt="profile"
                        className="w-10 rounded-full"
                      />
                    </Table.Cell>
                    <Table.Cell>{user?.username}</Table.Cell>
                    <Table.Cell>{user?.email}</Table.Cell>
                    <Table.Cell>{user?.isAdmin ? "Admin" : "User"}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setUserIdToDelete(user._id);
                        }}
                        className="font-medium text-sm text-red-700  dark:text-red-400 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
            {showMore && (
              <button
                onClick={handleShowMore}
                className="w-full text-teal-500 self-center text-sm py-7"
              >
                Show More
              </button>
            )}
          </>
        ) : (
          <p className="text-lg text-slate-500">You Have No Users Yet!</p>
        )}
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Do You Really Want to Delete
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm Sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Users;
