import { Router } from "express";
import authRoutes from "./auth";
import pageRoutes from "./page";
import menuRoutes from "./menu";
import contentBlockRoutes from "./contentBlock";

const router = Router();

router.use("/auth", authRoutes);
router.use("/pages", pageRoutes);
router.use("/menus", menuRoutes);
router.use("/blocks", contentBlockRoutes);

export default router;

/**
 * @swagger
 * /api/pages:
 *   post:
 *     summary: Create a new page
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Page'
 *     responses:
 *       201:
 *         description: Page created successfully
 *       400:
 *         description: Invalid request body
 */
