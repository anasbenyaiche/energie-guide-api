import { Router } from "express";
import * as pageController from "../controllers/pageController";
import { authenticateJWT, authorizeRoles } from "../middleware/auth";

const router = Router();

router.post(
  "/pages",
  authenticateJWT,
  authorizeRoles(["admin"]),
  pageController.createPage
);
router.get("/pages", pageController.getAllPages);
router.get("/pages/:id", pageController.getPageById);
router.put(
  "/pages/:id",
  authenticateJWT,
  authorizeRoles(["admin"]),
  pageController.updatePage
);
router.delete(
  "/pages/:id",
  authenticateJWT,
  authorizeRoles(["admin"]),
  pageController.deletePage
);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Page:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the page
 *         content:
 *           type: string
 *           description: The content of the page
 */

/**
 * @swagger
 * tags:
 *   name: Page
 *   description: API endpoints for managing pages
 */

/**
 * @swagger
 * /api/pages:
 *   post:
 *     summary: Create a new page
 *     tags: [Page]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Page'
 *     responses:
 *       201:
 *         description: Page created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Page'
 *       400:
 *         description: Invalid request body
 *       403:
 *         description: Unauthorized - User not authenticated
 */

/**
 * @swagger
 * /api/pages:
 *   get:
 *     summary: Get all pages
 *     tags: [Page]
 *     responses:
 *       200:
 *         description: List of pages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Page'
 *       403:
 *         description: Unauthorized - User not authenticated
 */

/**
 * @swagger
 * /api/pages/{id}:
 *   get:
 *     summary: Get a page by ID
 *     tags: [Page]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the page to get
 *     responses:
 *       200:
 *         description: Page found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Page'
 *       404:
 *         description: Page not found
 *       403:
 *         description: Unauthorized - User not authenticated
 */

/**
 * @swagger
 * /api/pages/{id}:
 *   put:
 *     summary: Update a page
 *     tags: [Page]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the page to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Page'
 *     responses:
 *       200:
 *         description: Page updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Page'
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Page not found
 *       403:
 *         description: Unauthorized - User not authenticated
 */

/**
 * @swagger
 * /api/pages/{id}:
 *   delete:
 *     summary: Delete a page
 *     tags: [Page]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the page to delete
 *     responses:
 *       204:
 *         description: Page deleted successfully
 *       404:
 *         description: Page not found
 *       403:
 *         description: Unauthorized - User not authenticated
 */
