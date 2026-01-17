import { Router } from 'express';
import { createOrders, listOrders, updateStatus } from '../controller/order.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Gerenciamento de pedidos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateOrder:
 *       type: object
 *       required:
 *         - client
 *         - items
 *       properties:
 *         client:
 *           type: string
 *           example: João Silva
 *         items:
 *           type: array
 *           minItems: 1
 *           items:
 *             type: object
 *             required:
 *               - product
 *               - quantity
 *               - price
 *             properties:
 *               product:
 *                 type: string
 *                 example: Notebook
 *               quantity:
 *                 type: integer
 *                 example: 2
 *               price:
 *                 type: number
 *                 example: 3500
 *
 *     UpdateStatus:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           example: PAGO
 *
 *     OrderItem:
 *       type: object
 *       properties:
 *         product:
 *           type: string
 *         quantity:
 *           type: integer
 *         price:
 *           type: number
 *
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         client:
 *           type: string
 *           example: João Silva
 *         total:
 *           type: number
 *           example: 7000
 *         status:
 *           type: string
 *           example: PENDENTE
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrder'
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Erro interno
 */
router.post('/', createOrders);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Lista todos os pedidos com itens
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Erro interno
 */
router.get('/', listOrders);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   patch:
 *     summary: Atualiza o status de um pedido
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStatus'
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Erro interno
 */
router.patch('/:id/status', updateStatus);

export default router;
