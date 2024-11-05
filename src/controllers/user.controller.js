import { asyncHandler } from "../utils/ayncHandler.js";
import User from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res, next) => {
  const { email, name, photo } = req.body;
  console.log(req.body);
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    const response = new ApiResponse(202, existedUser, "User already exist");
    return res.status(202).json(response);
  }
  const user = await User.create({
    email,
    name,
    photo,
  });
  if (!user) {
    res.status(400);
    throw new ApiError(400, "user not created");
  }
  const response = new ApiResponse(201, user, "User registered successfully");
  return res.status(201).json(response);
});

const addtoFavourite = asyncHandler(async (req, res) => {
  const { userId, petId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  user.favourites.push(petId);
  await user.save();
  const response = new ApiResponse(200, user, "Pet added to favourite");
  return res.status(200).json(response);
});

const removefromFavourite = asyncHandler(async (req, res) => {
  const { userId, petId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  user.favourites = user.favourites.filter((id) => id !== petId);
  await user.save();
  const response = new ApiResponse(200, user, "Pet removed from favourite");
  return res.status(200).json(response);
});

const getFavourites = asyncHandler(async (req, res) => {
  console.log("Request body:", req.body); // Log the request body
  const { userId } = req.body;
  if (!userId) {
    throw new ApiError(400, "User id is required");
  }
  const user =
    (await User.findById(userId).populate("favourites").select("favourites")) ||
    [];

  const response = new ApiResponse(200, user, "Favourite pets fetched");
  // console.log("Response:", response.data.favourites);
  return res.status(200).json(response);
});

export { registerUser, addtoFavourite, removefromFavourite, getFavourites };
