import app from "./app";
import { AppDataSource } from "./data-source";

const PORT = 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Conectado");

    app.listen(PORT, () => {
      console.log(`rodando na porta ${PORT}`);
    });
  })
  .catch((err) => console.error("Erro ao conectar banco", err));
