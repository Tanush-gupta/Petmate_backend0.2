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

export { registerUser };
