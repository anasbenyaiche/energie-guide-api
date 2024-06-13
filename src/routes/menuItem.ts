import { Router } from "express";
import * as menuItemController from "../controllers/menuItemController";
import { authenticateJWT, authorizeRoles } from "../middleware/auth";

const router = Router();

// Menu item routes
router.post(
  "/:id/items",
  authenticateJWT,
  authorizeRoles(["admin"]),
  menuItemController.createMenuItem
);
router.get("/:id/items", menuItemController.getAllMenuItems);
router.get("/items/:id", menuItemController.getMenuItemById);
router.put(
  "/items/:id",
  authenticateJWT,
  authorizeRoles(["admin"]),
  menuItemController.updateMenuItem
);
router.delete(
  "/items/:id",
  authenticateJWT,
  authorizeRoles(["admin"]),
  menuItemController.deleteMenuItem
);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     MenuItem:
 *       type: object
 *       required:
 *         - title
 *         - url
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the menu item
 *         url:
 *           type: string
 *           description: The URL of the menu item
 */

/**
 * @swagger
 * tags:
 *   name: MenuItem
 *   description: API endpoints for managing menu items
 */

/**
 * @swagger
 * /api/menuItems:
 *   post:
 *     summary: Create a new menu item
 *     tags: [MenuItem]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
 *     responses:
 *       201:
 *         description: Menu item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       400:
 *         description: Invalid request body
 *       403:
 *         description: Unauthorized - User not authenticated
 */

/**
 * @swagger
 * /api/menuItems:
 *   get:
 *     summary: Get all menu items
 *     tags: [MenuItem]
 *     responses:
 *       200:
 *         description: List of menu items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuItem'
 *       403:
 *         description: Unauthorized - User not authenticated
 */

/**
 * @swagger
 * /api/menuItems/{id}:
 *   get:
 *     summary: Get a menu item by ID
 *     tags: [MenuItem]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the menu item to get
 *     responses:
 *       200:
 *         description: Menu item found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       404:
 *         description: Menu item not found
 *       403:
 *         description: Unauthorized - User not authenticated
 */

/**
 * @swagger
 * /api/menuItems/{id}:
 *   put:
 *     summary: Update a menu item
 *     tags: [MenuItem]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the menu item to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Menu item not found
 *       403:
 *         description: Unauthorized - User not authenticated
 */

/**
 * @swagger
 * /api/menuItems/{id}:
 *   delete:
 *     summary: Delete a menu item
 *     tags: [MenuItem]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the menu item to delete
 *     responses:
 *       204:
 *         description: Menu item deleted successfully
 *       404:
 *         description: Menu item not found
 *       403:
 *         description: Unauthorized - User not authenticated
 */
