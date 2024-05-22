import { Router } from "express";
import * as contentBlockController from "../controllers/contentBlockController";
import { authenticateJWT, authorizeRoles } from "../middleware/auth";

const router = Router();

router.post(
  "/pages/:pageId/blocks",
  authenticateJWT,
  authorizeRoles(["admin"]),
  contentBlockController.createContentBlock
);
router.get(
  "/pages/:pageId/blocks",
  contentBlockController.getAllContentBlocksForPage
);
router.put(
  "/blocks/:id",
  authenticateJWT,
  authorizeRoles(["admin"]),
  contentBlockController.updateContentBlock
);
router.delete(
  "/blocks/:id",
  authenticateJWT,
  authorizeRoles(["admin"]),
  contentBlockController.deleteContentBlock
);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     ContentBlock:
 *       type: object
 *       required:
 *         - type
 *         - content
 *       properties:
 *         type:
 *           type: string
 *           description: The type of content block (e.g., text, image, chart)
 *         content:
 *           type: string
 *           description: The content of the content block
 */

/**
 * @swagger
 * tags:
 *   name: ContentBlock
 *   description: API endpoints for managing content blocks
 */

/**
 * @swagger
 * /api/contentBlocks:
 *   post:
 *     summary: Create a new content block
 *     tags: [ContentBlock]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContentBlock'
 *     responses:
 *       201:
 *         description: Content block created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContentBlock'
 *       400:
 *         description: Invalid request body
 *       403:
 *         description: Unauthorized - User not authenticated
 */

/**
 * @swagger
 * /api/contentBlocks:
 *   get:
 *     summary: Get all content blocks
 *     tags: [ContentBlock]
 *     responses:
 *       200:
 *         description: List of content blocks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ContentBlock'
 *       403:
 *         description: Unauthorized - User not authenticated
 */

/**
 * @swagger
 * /api/contentBlocks/{id}:
 *   get:
 *     summary: Get a content block by ID
 *     tags: [ContentBlock]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the content block to get
 *     responses:
 *       200:
 *         description: Content block found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContentBlock'
 *       404:
 *         description: Content block not found
 *       403:
 *         description: Unauthorized - User not authenticated
 */

/**
 * @swagger
 * /api/contentBlocks/{id}:
 *   put:
 *     summary: Update a content block
 *     tags: [ContentBlock]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the content block to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContentBlock'
 *     responses:
 *       200:
 *         description: Content block updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContentBlock'
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Content block not found
 *       403:
 *         description: Unauthorized - User not authenticated
 */

/**
 * @swagger
 * /api/contentBlocks/{id}:
 *   delete:
 *     summary: Delete a content block
 *     tags: [ContentBlock]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the content block to delete
 *     responses:
 *       204:
 *         description: Content block deleted successfully
 *       404:
 *         description: Content block not found
 *       403:
 *         description: Unauthorized - User not authenticated
 */
