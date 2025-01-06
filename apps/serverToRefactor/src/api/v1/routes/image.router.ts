import { Router } from "express";
import { ImageController } from "./image.service";

const router = Router();

router.get("/v1/image", ImageController.generateImage);

export default router;
