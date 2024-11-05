import { Router } from "express";
import {
  registerUser,
  addtoFavourite,
  removefromFavourite,
  getFavourites,
} from "../controllers/user.controller.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/addtoFavourite").post(addtoFavourite);
router.route("/removefromFavourite").post(removefromFavourite);
router.route("/getFavourites").post(getFavourites);

export default router;
