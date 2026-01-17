import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Orders } from './Orders';

@Entity('OrdersItem')
export class OrdersItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product: string;

  @Column()
  quantity: number;

  @Column('float')
  price: number;

  @ManyToOne(() => Orders, (order) => order.ordersItem, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Orders;
}
