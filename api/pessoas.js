// api/pessoas.js
const db = require('../src/db');


module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const resultado = await pool.query('SELECT * FROM pessoas');
      res.status(200).json(resultado.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar pessoas' });
    }
  } else if (req.method === 'POST') {
    const { nome, email, profissao } = req.body;
    try {
      const resultado = await pool.query(
        'INSERT INTO pessoas (nome, email, profissao) VALUES ($1, $2, $3) RETURNING *',
        [nome, email, profissao]
      );
      res.status(201).json(resultado.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao adicionar pessoa' });
    }
  } else {
    res.status(405).json({ erro: 'Método não permitido' });
  }
};
