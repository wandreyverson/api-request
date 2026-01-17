import 'dotenv/config'
import sql from 'mssql'

const baseConfig: sql.config = {
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  server: process.env.DB_SERVER || 'localhost',
  port: Number(process.env.DB_PORT) || 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
}

async function waitForSql() {
  while (true) {
    try {
      const pool = await sql.connect({ ...baseConfig, database: 'master' })
      await pool.close()
      break
    } catch {
      console.log('⏳ Aguardando SQL Server...')
      await new Promise(r => setTimeout(r, 3000))
    }
  }
}

async function init() {
  await waitForSql()

  // 1️⃣ Conecta no master
  const masterPool = await sql.connect({
    ...baseConfig,
    database: 'master'
  })

  // 2️⃣ Cria o banco se não existir
  await masterPool.query(`
    IF DB_ID('${process.env.DB_DATABASE}') IS NULL
      CREATE DATABASE ${process.env.DB_DATABASE}
  `)

  await masterPool.close()

  // 3️⃣ Conecta no banco criado
  const dbPool = await sql.connect({
    ...baseConfig,
    database: process.env.DB_DATABASE
  })

  // 4️⃣ Cria tabela Orders
  await dbPool.query(`
    IF OBJECT_ID('Orders', 'U') IS NULL
    CREATE TABLE Orders (
      id INT IDENTITY(1,1) PRIMARY KEY,
      client NVARCHAR(255) NOT NULL,
      total FLOAT NOT NULL,
      status NVARCHAR(50) NOT NULL DEFAULT 'PENDENTE',
      createdAt DATETIME NOT NULL DEFAULT GETDATE()
    )
  `)

  // 5️⃣ Cria tabela OrderItems
  await dbPool.query(`
    IF OBJECT_ID('OrderItems', 'U') IS NULL
    CREATE TABLE OrderItems (
      id INT IDENTITY(1,1) PRIMARY KEY,
      product NVARCHAR(255) NOT NULL,
      quantity INT NOT NULL,
      price FLOAT NOT NULL,
      orderId INT NOT NULL,
      CONSTRAINT FK_OrderItems_Orders
        FOREIGN KEY (orderId) REFERENCES Orders(id)
    )
  `)

  await dbPool.close()

  console.log('✅ Banco e tabelas inicializados com sucesso')
}

init().catch(err => {
  console.error('❌ Erro ao inicializar banco:', err)
  process.exit(1)
})
