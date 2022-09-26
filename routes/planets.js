const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const idLength = 8;

/**
 * @swagger
 * components:
 *   schemas:
 *     Planet:
 *       type: object
 *       required:
 *         - keplerName
 *         
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the planet
 *         keplerName:
 *           type: string
 *           description: The book title
 *       example:
 *         id: d5fE_asz
 *         keplerName: "Kepler-1410 b"

 */

/**
 * @swagger
 * tags:
 *   name: Planets
 *   description: The planets managing API
 */

/**
 * @swagger
 * /planets:
 *   get:
 *     summary: Returns the list of all the planets
 *     tags: [Planets]
 *     responses:
 *       200:
 *         description: The list of the planets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Planet'
 */

router.get("/", (req, res) => {
  const planets = req.app.db.get("planets");

  res.send(planets);
});

module.exports = router;
