import { getConnection } from '../server/db';
import sql from 'mssql';
import { CreateOrdersDto, UpdateStatusDto } from './dto.order';

export class OrderService {

    async listOrders() {
        const pool = await getConnection();
        const ordersResult = await pool.request().query(`SELECT * FROM Orders`);
        const orders = ordersResult.recordset;

        for (const order of orders) {
            const itemsResult = await pool.request()
                .input('orderId', sql.Int, order.id)
                .query(`SELECT * FROM OrdersItem WHERE orderId = @orderId`);
            order.items = itemsResult.recordset;
        }

        return orders;
    }

    async createOrders(dto: CreateOrdersDto) {
        const { client, items } = dto;
        const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

        const pool = await getConnection();

        const result = await pool.request()
            .input('client', sql.NVarChar, client)
            .input('total', sql.Float, total)
            .query(`INSERT INTO Orders (client, total) OUTPUT INSERTED.id VALUES (@client, @total)`);

        const orderId = result.recordset[0].id;

        const table = new sql.Table('OrdersItem');
        table.columns.add('orderId', sql.Int, { nullable: true });
        table.columns.add('product', sql.NVarChar(255), { nullable: false });
        table.columns.add('quantity', sql.Int, { nullable: false });
        table.columns.add('price', sql.Float, { nullable: false });


        for (const item of items) {
            table.rows.add(orderId, item.product, item.quantity, item.price);
        }

        const request = pool.request();
        await request.bulk(table);
      
        return {
            id: orderId,
            client,
            total,
            status: 'PENDENTE',
            items
        };
    }


    async updateStatus(id: number, dto: UpdateStatusDto) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('status', sql.NVarChar, dto.status)
            .query(`UPDATE Orders SET status = @status WHERE id = @id; SELECT * FROM Orders WHERE id = @id`);

        return result.recordset[0];
    }
}
