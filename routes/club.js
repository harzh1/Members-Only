import express from "express";
const router = express.Router();

// Require controller modules.
import * as user_controller from "../controller/userController.js";
import * as message_controller from "../controller/messageController.js";

/* GET Homepage */
router.get("/", message_controller.index);

router.get("/signup", user_controller.signup_get);

router.get("/login", user_controller.login_get);

router.get("/logout", user_controller.logout_get);

router.get("/profile", user_controller.profile_get);

router.post("/signup", user_controller.signup_post);

router.post("/login", user_controller.login_post);

router.post("/message", message_controller.message_post);

export default router;
