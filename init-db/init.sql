-- Cria o banco se não existir
IF DB_ID('goop') IS NULL
BEGIN
    CREATE DATABASE goop;
END
GO

USE goop;
GO

-- Tabela Orders
IF OBJECT_ID('Orders', 'U') IS NULL
BEGIN
    CREATE TABLE Orders (
        id INT IDENTITY(1,1) PRIMARY KEY,
        client NVARCHAR(255) NOT NULL,
        total FLOAT NOT NULL,
        status NVARCHAR(50) NOT NULL DEFAULT 'PENDENTE',
        createdAt DATETIME NOT NULL DEFAULT GETDATE()
    );
END
GO

-- Tabela OrderItems
IF OBJECT_ID('OrderItems', 'U') IS NULL
BEGIN
    CREATE TABLE OrderItems (
        id INT IDENTITY(1,1) PRIMARY KEY,
        product NVARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        price FLOAT NOT NULL,
        orderId INT NOT NULL,
        CONSTRAINT FK_OrderItems_Orders
            FOREIGN KEY (orderId) REFERENCES Orders(id)
    );
END
GO
