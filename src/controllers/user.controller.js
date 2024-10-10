import { asyncHandler } from "../utils/ayncHandler.js";
import  User from "../models/User.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    const existedUser = await User.findOne({email});
    if( existedUser ){
        const response= new ApiResponse(202,user,'User already exist');
        return res.status(202).json(response);
    }
    const user = await User.create({
        name,
        email,
        password
    });
    if(!user){
    res.status(400);
    throw new ApiError(400,'user not created');
    }
    const response = new ApiResponse(201,user,'User registered successfully');
    return res.status(201).json(response);
});


export { registerUser };