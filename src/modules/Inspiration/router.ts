import express from "express";
import inspirationController from "./controller";
import { authenticateJWT } from "../../common/jwt";

const inspirationRouter = express.Router();

//GET INSPIRATIONS
inspirationRouter.get(
  "/:userId",
  authenticateJWT,
  inspirationController.getInspirationsByUserId
);

// POST INSPIRATION
inspirationRouter.post(
  "/new",
  authenticateJWT,
  inspirationController.createInspiration
);

//DELETE INSPIRATION
inspirationRouter.delete(
  "/:userId/:postId",
  authenticateJWT,
  inspirationController.deleteInspiration
);

export default inspirationRouter;
