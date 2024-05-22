import { Router } from "express";
import * as menuController from "../controllers/menuController";
import { authenticateJWT, authorizeRoles } from "../middleware/auth";

const router = Router();

router.post(
  "/menus",
  authenticateJWT,
  authorizeRoles(["admin"]),
  menuController.createMenu
);
router.get("/menus", menuController.getAllMenus);
router.get("/menus/:id", menuController.getMenuById);
router.put(
  "/menus/:id",
  authenticateJWT,
  authorizeRoles(["admin"]),
  menuController.updateMenu
);
router.delete(
  "/menus/:id",
  authenticateJWT,
  authorizeRoles(["admin"]),
  menuController.deleteMenu
);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Menu:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the menu
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
 *   name: Menu
 *   description: API endpoints for managing menus and menu items
 */

/**
 * @swagger
 * /api/menus:
 *   post:
 *     summary: Create a new menu
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       201:
 *         description: Menu created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       400:
 *         description: Invalid request body
 *       403:
 *         description: Unauthorized - User not authenticated
 */

/**
 * @swagger
 * /api/menus:
 *   get:
 *     summary: Get all menus
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: List of menus
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 *       403:
 *         description: Unauthorized - User not authenticated
 */

/**
 * @swagger
 * /api/menus/{id}:
 *   get:
 *     summary: Get a menu by ID
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the menu to get
 *     responses:
 *       200:
 *         description: Menu found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       404:
 *         description: Menu not found
 *       403:
 *         description: Unauthorized - User not authenticated
 */

/**
 * @swagger
 * /api/menus/{id}:
 *   put:
 *     summary: Update a menu
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the menu to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       200:
 *         description: Menu updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Menu not found
 *       403:
 *         description: Unauthorized - User not authenticated
 */

/**
 * @swagger
 * /api/menus/{id}:
 *   delete:
 *     summary: Delete a menu
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the menu to delete
 *     responses:
 *       204:
 *         description: Menu deleted successfully
 *       404:
 *         description: Menu not found
 *       403:
 *         description: Unauthorized - User not authenticated
 */

/**
 * @swagger
 * /api/menus/{id}/items:
 *   post:
 *     summary: Add an item to a menu
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the menu to add the item to
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
 *     responses:
 *       201:
 *         description: Menu item added successfully
 *       400:
 *         description: Invalid request body
 *       403:
 *         description: Unauthorized - User not authenticated
 */

/**
 * @swagger
 * /api/menus/items/{id}:
 *   put:
 *     summary: Update a menu item
 *     tags: [Menu]
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
 * *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Menu item not found
 *       403:
 *         description: Unauthorized - User not authenticated
 */

/**
 * @swagger
 * /api/menus/items/{id}:
 *   delete:
 *     summary: Delete a menu item
 *     tags: [Menu]
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
