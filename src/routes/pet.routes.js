import Router from "express";
import { addPet, getAllPetData } from "../controllers/pet.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();
router.route("/addPet").post(upload.single("file"), addPet);
router.route("/getAllPets").get(getAllPetData);
export default router;
