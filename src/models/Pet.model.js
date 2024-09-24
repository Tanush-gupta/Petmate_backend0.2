import mongoose from "mongoose";

const PetSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    age: { 
        type: Number,
        required: true 
    },
    breed: 
    { type: String,
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
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
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