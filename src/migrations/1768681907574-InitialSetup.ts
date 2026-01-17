import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSetup1768681907574 implements MigrationInterface {
    name = 'InitialSetup1768681907574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "OrdersItem" ("id" int NOT NULL IDENTITY(1,1), "product" nvarchar(255) NOT NULL, "quantity" int NOT NULL, "price" float NOT NULL, "orderId" int, CONSTRAINT "PK_da539b386cc2dd325f70a58e339" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Orders" ("id" int NOT NULL IDENTITY(1,1), "client" nvarchar(255) NOT NULL, "total" float NOT NULL, "status" nvarchar(255) NOT NULL CONSTRAINT "DF_4c500ba43c912361299f3da7bd3" DEFAULT 'PENDENTE', "createdAt" datetime NOT NULL CONSTRAINT "DF_990357f0772f9ce65f0ae063f17" DEFAULT GETDATE(), CONSTRAINT "PK_ce8e3c4d56e47ff9c8189c26213" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "OrdersItem" ADD CONSTRAINT "FK_18f354b65b7fc1943a3e395bea1" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "OrdersItem" DROP CONSTRAINT "FK_18f354b65b7fc1943a3e395bea1"`);
        await queryRunner.query(`DROP TABLE "Orders"`);
        await queryRunner.query(`DROP TABLE "OrdersItem"`);
    }

}
