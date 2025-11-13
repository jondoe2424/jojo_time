const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();

// Serve a página principal
app.use(express.static('public'));

// Endpoint que entrega só o JSON da enquete (sem CORS)
app.get('/api/poll', async (req, res) => {
  try {
    const resposta = await fetch('https://www.uol.com.br/splash/noticias/2025/11/13/peoes-pedem-votos-oitava-roca-a-fazenda-17.htm');
    const html = await resposta.text();

    const match = html.match(/"poll-\d+":(\{.*?"result":\[.*?]\})/s);
    if (!match) return res.json({error: "Enquete não encontrada"});

    const poll = JSON.parse(match[1]);
    res.json(poll);
  } catch (e) {
    res.json({error: e.message});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Rodando na porta ' + PORT));
