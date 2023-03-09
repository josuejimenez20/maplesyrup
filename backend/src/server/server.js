const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.corsOptions = {
      origin: "http://127.0.0.1:5173",
      optionsSuccessStatus: 200,
    };

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
    this.app.use(require("../routes/index"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Escuchando puerto", this.port);
    });
  }
}

module.exports = Server;
