import { ConnectionPool } from "mssql";

const config = {
    user: "sa",
    password: "MinhaSenhaForte123!",
    server: "localhost",
    database: "master",
    options: { encrypt: false, trustServerCertificate: true },
};

async function createDB() {
    const pool = await new ConnectionPool(config).connect();

    await pool.request().query(`
    IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'goop')
      CREATE DATABASE goop
  `);

    console.log("Banco criado ou já existia!");
    await pool.close();
}

createDB().catch(console.error);
