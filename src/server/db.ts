import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    server: process.env.DB_SERVER!,
    database: process.env.DB_DATABASE!,
    port: Number(process.env.DB_PORT) || 1433,
    options: { encrypt: false, trustServerCertificate: true },
};


export async function getConnection(): Promise<sql.ConnectionPool> {
    const pool = new sql.ConnectionPool(config);
    await pool.connect();
    console.log('connect', config.database);
    return pool;
}
