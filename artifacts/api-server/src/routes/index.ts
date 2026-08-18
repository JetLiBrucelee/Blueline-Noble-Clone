import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import adminRouter from "./admin";
import settingsRouter from "./settings";
import ownerControlRouter from "./owner-control";

const router: IRouter = Router();

// Owner-control routes must come first — they are exempt from the pause middleware.
router.use(ownerControlRouter);
router.use(healthRouter);
router.use(contactRouter);
router.use(adminRouter);
router.use(settingsRouter);

export default router;
