// user.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { Fullname, email, username, password } = req.body;

  if ([Fullname, email, username, password].some((field) => !field.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverimageLocalPath = req.files?.coverimage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverimageLocalPath);

  if (!avatar || !avatar.url) {
    throw new ApiError(400, "Failed to upload Avatar");
  }

  const user = await User.create({
    Fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  if (!user) {
    throw new ApiError(500, "Failed to create user");
  }

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Failed to fetch user details");
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully")
  );
});

export { registerUser };

 



// get user details details from frontend
// validation lgana padega - atleast one non-empty
// check if user already exist or not 
// check for images , check for avatar
// upload them to cloudinary , check avatar is cloudinary uplaod or not
// create object bnana padega user object ke naam se - create entry in db
// remove password and referesh token field from response 
// check for user creation
// return res

//req.files?.avatar[0]?.path , isse hmm multer se file ka path le rhe hai



// const registerUser = asyncHandler(async (req, res) => {
//     res.status(200).json({
//         message: "ok"
//     });
// });

