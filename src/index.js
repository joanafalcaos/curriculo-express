const express = require('express');
const app = express();
const pessoasRouter = require('./routes/pessoas');

app.use(express.json());
app.use('/pessoas', pessoasRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
