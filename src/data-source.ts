import 'reflect-metadata'
import 'dotenv/config'
import { DataSource } from 'typeorm'
import { Orders } from './entity/orders/Orders'
import { OrdersItem } from './entity/orders/OrdersItem'
import { User } from './entity/user/User'

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_SERVER || 'localhost',
  port: Number(process.env.DB_PORT || 1433),
  username: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_DATABASE!,

  synchronize: false,
  logging: false,

  entities: [Orders, OrdersItem, User],
  migrations: ['src/migrations/*.ts'],

  options: {
    encrypt: false,
    trustServerCertificate: true
  }
})
