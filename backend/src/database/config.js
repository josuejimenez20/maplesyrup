import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config(); 

const conexion = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
});

const dbConnection = () => {
    conexion.connect((err) => {
        if (err) {
            console.error('Error de conexion: ' + err.stack);
            return;
        }
        console.log('Conectado con el identificador ' + conexion.threadId);
    });
}

export { dbConnection, conexion };
