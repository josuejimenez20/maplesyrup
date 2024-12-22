import mysql from "mysql";
const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'maplesyrup',
    user: 'root',
    password: 'johnwick2003',
});

const dbConnection = () => {
    conexion.connect(function (err) {
        if (err) {
            console.error('Error de conexion: ' + err.stack);
            return;
        }
        console.log('Conectado con el identificador ' + conexion.threadId);
    });
}

export {
    dbConnection,
    conexion
}

