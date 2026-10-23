const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Teste opcional de conectividade ao iniciar
pool.getConnection()
  .then(connection => {
    console.log('Conexão com MySQL estabelecida com sucesso via dotenv!');
    connection.release();
  })
  .catch(err => {
    console.error('Falha ao conectar com o MySQL:', err.message);
  });

module.exports = pool;

