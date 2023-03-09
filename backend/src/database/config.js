let mysql = require('mysql');
let conexion = mysql.createConnection({
    host: 'localhost',
    database: 'maplesyrup',
    user: 'root',
    password: '',
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

module.exports = {
    dbConnection,
    conexion
}

