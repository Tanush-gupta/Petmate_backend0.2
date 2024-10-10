import mongoose from "mongoose";

const PetSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    age: { 
        type: String,
        required: true 
    },
    breed: 
    { type: String,
      required: true 
    },
    weight: { 
        type: String, 
        required: true 
    },
    about: {
        type: String,
        required: true,
    },
    displayImage: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
        // type: String,
        // required: true,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
});
export default mongoose.model("Pet", PetSchema);