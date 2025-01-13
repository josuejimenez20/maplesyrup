import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { dbConnection } from "../database/config.js";
import router from "../routes/index.js"

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.corsOptions = {
      origin: "*",
      optionsSuccessStatus: 200,
    };
    this.basePath = "/api/";

    // Conectar a base de datos
    this.conectarDB();

    // Middlawares
    this.middlewares();

    this.routes();
  }

  async conectarDB() {
    try {
      dbConnection();
      console.log("Data base online");
    } catch (error) {
      throw new Error(error);
    }
  }

  middlewares() {
    // CORS
    this.app.use(cors(this.corsOptions));

    // Lectura y parseo del body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("public"));

    // FileUpload Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
    );
  }

  routes() {
    this.app.use(this.basePath, router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Escuchando puerto", this.port);
    });
  }
}

export default Server;
