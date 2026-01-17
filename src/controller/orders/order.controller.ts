import { Request, Response } from 'express';
import { CreateOrdersDto, UpdateStatusDto } from '../../service/orders/dto.order';
import { OrderService } from '../../service/orders/order.service';

const orderService = new OrderService();

export async function createOrders(req: Request, res: Response) {
    try {
        const dto: CreateOrdersDto = req.body;
        const order = await orderService.createOrders(dto);
        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar pedido' });
    }
}

export async function updateStatus(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const dto: UpdateStatusDto = req.body;
        const order = await orderService.updateStatus(id, dto);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar status' });
    }
}

export async function listOrders(req: Request, res: Response) {
    try {
        const orders = await orderService.listOrders();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao listar pedidos' });
    }
}
