import mongoose from "mongoose"

const userSchema = new mongoose.Schema({   
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    myPets:{
        type: Array,
        default: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Pet"
            }
        ]
    }
})
export default mongoose.model('User', userSchema);