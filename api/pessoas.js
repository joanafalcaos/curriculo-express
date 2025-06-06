const db = require('../src/db');

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    // Listar todas as pessoas
    try {
      const resultado = await db.query('SELECT * FROM pessoas');
      res.status(200).json(resultado.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar pessoas' });
    }

  } else if (req.method === 'POST') {
    // Cadastrar nova pessoa
    const { nome, email, telefone } = req.body;
    try {
      const resultado = await db.query(
        'INSERT INTO pessoas (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *',
        [nome, email, telefone]
      );
      res.status(201).json(resultado.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao adicionar pessoa' });
    }

  } else if (req.method === 'PUT') {
    // Alterar dados de uma pessoa
    const { id, nome, email, telefone } = req.body;
    if (!id) {
      return res.status(400).json({ erro: 'ID é obrigatório para atualização' });
    }
    try {
      const resultado = await db.query(
        'UPDATE pessoas SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING *',
        [nome, email, telefone, id]
      );
      res.status(200).json(resultado.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao atualizar pessoa' });
    }

  } else if (req.method === 'DELETE') {
    // Excluir uma pessoa
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ erro: 'ID é obrigatório para exclusão' });
    }
    try {
      await db.query('DELETE FROM pessoas WHERE id = $1', [id]);
      res.status(204).end(); // Sem conteúdo, mas sucesso
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao excluir pessoa' });
    }

  } else {
    res.status(405).json({ erro: 'Método não permitido' });
  }
};
