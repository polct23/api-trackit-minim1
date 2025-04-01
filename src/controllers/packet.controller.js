"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postPacket = postPacket;
exports.getAllPackets = getAllPackets;
exports.getPacketById = getPacketById;
exports.updatePacketById = updatePacketById;
exports.deletePacketById = deletePacketById;
exports.addCategoryToPacket = addCategoryToPacket;
exports.deleteCategoryFromPacket = deleteCategoryFromPacket;
exports.searchPacketsByCategory = searchPacketsByCategory;
const packet_service_1 = require("../services/packet.service");
const packetService = new packet_service_1.PacketService();
/**
 * @swagger
 * /api/packets:
 *   post:
 *     summary: Create a new packet
 *     tags: [Packets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Packet'
 *     responses:
 *       201:
 *         description: The packet was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Packet'
 *       400:
 *         description: Error creating packet
 */
function postPacket(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const packet = req.body;
            const newPacket = yield packetService.postPacket(packet);
            res.status(201).json(newPacket);
        }
        catch (error) {
            res.status(400).json({ message: "Error creating packet", error });
        }
    });
}
/**
 * @swagger
 * /api/packets:
 *   get:
 *     summary: Get all packets
 *     tags: [Packets]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of all packets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Packet'
 *       400:
 *         description: Error getting packets
 */
function getAllPackets(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const packetsPaginated = yield packetService.getAllPackets(page, limit);
            res.status(200).json(packetsPaginated);
        }
        catch (error) {
            res.status(400).json({ message: "Error getting packets", error });
        }
    });
}
/**
 * @swagger
 * /api/packets/{id}:
 *   get:
 *     summary: Get a packet by ID
 *     tags: [Packets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The packet ID
 *     responses:
 *       200:
 *         description: The packet description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Packet'
 *       400:
 *         description: Error getting packet
 */
function getPacketById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const packet = yield packetService.getPacketById(id);
            res.status(200).json(packet);
        }
        catch (error) {
            res.status(400).json({ message: "Error getting packet", error });
        }
    });
}
/**
 * @swagger
 * /api/packets/{id}:
 *   put:
 *     summary: Update a packet by ID
 *     tags: [Packets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The packet ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Packet'
 *     responses:
 *       200:
 *         description: The updated packet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Packet'
 *       400:
 *         description: Error updating packet
 */
function updatePacketById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const packet = req.body;
            const updatedPacket = yield packetService.updatePacketById(id, packet);
            res.status(200).json(updatedPacket);
        }
        catch (error) {
            res.status(400).json({ message: "Error updating packet", error });
        }
    });
}
/**
 * @swagger
 * /api/packets/{id}:
 *   delete:
 *     summary: Delete a packet by ID
 *     tags: [Packets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The packet ID
 *     responses:
 *       200:
 *         description: The deleted packet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Packet'
 *       400:
 *         description: Error deleting packet
 */
function deletePacketById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const deletedPacket = yield packetService.deletePacketById(id);
            res.status(200).json(deletedPacket);
        }
        catch (error) {
            res.status(400).json({ message: "Error deleting packet", error });
        }
    });
}
/**
 * @swagger
 * /api/packets/{id}/categories/{categoryId}:
 *   post:
 *     summary: Add a category to a packet
 *     tags: [Packets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The packet ID
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: The updated packet with the added category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Packet'
 *       400:
 *         description: Error adding category to packet
 */
function addCategoryToPacket(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const packetId = req.params.id;
            const categoryId = req.params.categoryId;
            const updatedPacket = yield packetService.addCategoryToPacket(packetId, categoryId);
            res.status(200).json(updatedPacket);
        }
        catch (error) {
            res.status(400).json({ message: "Error adding category to packet", error });
        }
    });
}
/**
 * @swagger
 * /api/packets/{id}/categories/{categoryId}:
 *   delete:
 *     summary: Remove a category from a packet
 *     tags: [Packets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The packet ID
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: The updated packet with the removed category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Packet'
 *       400:
 *         description: Error removing category from packet
 */
function deleteCategoryFromPacket(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const packetId = req.params.id;
            const categoryId = req.params.categoryId;
            const updatedPacket = yield packetService.deleteCategoryFromPacket(packetId, categoryId);
            res.status(200).json(updatedPacket);
        }
        catch (error) {
            res.status(400).json({ message: "Error removing category from packet", error });
        }
    });
}
/**
 * @swagger
 * /api/packets/search/category/{categoryId}:
 *   get:
 *     summary: Search packets by category
 *     tags: [Packets]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of packets matching the category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Packet'
 *       400:
 *         description: Error searching packets by category
 */
function searchPacketsByCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categoryId = req.params.categoryId;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const packets = yield packetService.searchPacketsByCategory(categoryId, page, limit);
            res.status(200).json(packets);
        }
        catch (error) {
            res.status(400).json({ message: "Error searching packets by category", error });
        }
    });
}
