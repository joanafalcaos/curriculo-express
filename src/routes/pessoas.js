const express = require('express');
const router = express.Router();
const db = require('../db'); // Caminho corrigido

// GET todas as pessoas
router.get('/', async (req, res) => {
  try {
    const resultado = await db.query('SELECT * FROM pessoas');
    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar pessoas' });
  }
});

// POST nova pessoa
router.post('/', async (req, res) => {
  const { nome, email, profissao } = req.body;

  try {
    const resultado = await db.query(
      'INSERT INTO pessoas (nome, email, profissao) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, profissao]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao adicionar pessoa' });
  }
});

module.exports = router;
