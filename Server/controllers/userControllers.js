import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";
import { ErrorHandler } from "../utils/error.js";
import Listing from "../models/listingModel.js";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(new ErrorHandler("You can Update Only Your Account", 401));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  console.log(req.user);
  if (req?.user?.isAmin && req.user.id !== req.params.id)
    return next(new ErrorHandler("You can Delete Only Your Account", 401));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("accessToken");
    res.status(200).json("User has been Deleted Successfully");
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id || req?.user?.isAdmin) {
    try {
      let listings;
      if (req?.user?.isAdmin) {
        listings = await Listing.find();
      } else {
        listings = await Listing.find({ userRef: req.params.id });
      }
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(new ErrorHandler("You Can View Only Your Listings", 401));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(new ErrorHandler("User not Found!", 404));

    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    if (req?.user.id !== req?.params?.id) {
      return next(new ErrorHandler("Invalid Admin", 400));
    }
    if (!req?.user?.isAdmin) {
      return next(new ErrorHandler("Not Authorized", 400));
    }
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
