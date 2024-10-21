import { asyncHandler } from "../utils/ayncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Pet from "../models/Pet.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addPet = asyncHandler(async (req, res) => {
  const { name, breed, age, weight, about, category, gender, address, owner } =
    req.body;

  console.log(req.body);

  if (!name || !breed || !age || !weight || !about || !category) {
    throw new ApiError(400, "Please fill all the fields");
  }

  // //check profile image is uploaded to backend or not
  const petImageLocalPath = req.file?.path;
  if (!petImageLocalPath) {
    throw new ApiError(400, "profileImage is required");
  }
  // upload to clodinary
  const petImage = await uploadOnCloudinary(petImageLocalPath);

  if (!petImage) {
    throw new ApiError(500, "Something went wrong while uploading the image");
  }

  // //add pet
  const pet = await Pet.create({
    name,
    breed,
    age,
    weight,
    about,
    gender,
    displayImage: petImage.url,
    category,
    address,
    owner,
  });

  const createdPet = await Pet.findById(pet._id);

  if (!createdPet) {
    throw new ApiError(500, "Something went wrong while adding the pet");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdPet, "Pet added Successfully"));
});

const getAllPetData = asyncHandler(async (req, res) => {
  const pets = await Pet.find().populate("owner");
  return res
    .status(200)
    .json(new ApiResponse(200, pets, "All pets fetched successfully"));
});

export { getAllPetData, addPet };
