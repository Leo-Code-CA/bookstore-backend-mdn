import { Router } from "express";
import homeRouter from "./home.mjs";
import usersRouter from "./users.mjs";

const router = Router();

router.use("/", homeRouter);
router.use("/users", usersRouter);

export default router;
