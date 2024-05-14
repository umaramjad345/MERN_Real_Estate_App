import Listing from "../models/listingModel.js";
import User from "../models/userModel.js";
import { ErrorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(new ErrorHandler("Listing Not Found", 401));
  }

  if (req.user.id !== listing.userRef && !req?.user?.isAdmin) {
    return next(new ErrorHandler("You can Delete Only Your Listing!", 401));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(new ErrorHandler("Listing Not Found!", 404));
  }
  if (req.user.id !== listing.userRef) {
    return next(new ErrorHandler("You can Update Only Your Listings", 401));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(new ErrorHandler("Listing Not Found", 404));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const dashboardStats = async (req, res, next) => {
  try {
    if (!req?.user?.isAdmin) {
      return next(new ErrorHandler("User Not Authorized!", 400));
    }
    const [userCount, listingCount, rentListingCount, saleListingCount] =
      await Promise.all([
        User.countDocuments(),
        Listing.countDocuments(),
        Listing.countDocuments({ type: "rent" }),
        Listing.countDocuments({ type: "sale" }),
      ]);

    res
      .status(200)
      .json({ userCount, listingCount, rentListingCount, saleListingCount });
  } catch (error) {
    next(error);
  }
};
