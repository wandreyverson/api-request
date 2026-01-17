import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation } from 'typeorm';
import { OrdersItem } from './OrdersItem';

@Entity('Orders')
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  client: string;

  @Column('float')
  total: number;

  @Column({ default: 'PENDENTE' })
  status: string;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  createdAt: Date;

  @OneToMany(() => OrdersItem, (item) => item.order)
  ordersItem: Relation<OrdersItem[]>;
}
