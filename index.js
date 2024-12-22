require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const app = express();
const port = 3000;

// Substitua com sua chave de API da Gemini
const geminiAPIKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(geminiAPIKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

let cache = {};  // Cache para armazenar traduções

// Middleware para lidar com JSON no corpo da requisição
app.use(express.json());

// Função para gerar conteúdo usando a API Gemini
async function translateText(text, targetLang) {
  const prompt = `Translate the following text to ${targetLang} in a natural and conversational way and without any additional explanation:: ${text}`;
  try {
    const result = await model.generateContent(prompt);
    // Remover quebras de linha no resultado
    const translatedText = result.response.text().replace(/\n/g, '').trim();
    return translatedText;
  } catch (error) {
    console.error("Erro ao traduzir:", error);
    throw new Error('Erro ao traduzir o texto');
  }
}



// Endpoint para tradução
app.post('/translate', async (req, res) => {
  const { text, targetLang } = req.body;

  if (!text || !targetLang) {
    return res.status(400).json({ error: 'Texto e idioma de destino são necessários.' });
  }

  // Verificar se a tradução já está no cache
  if (cache[text] && cache[text][targetLang]) {
    console.log("Retornando tradução do cache");
    return res.json({ translatedText: cache[text][targetLang] });
  }

  try {
    // Solicitar tradução da API Gemini
    const translatedText = await translateText(text, targetLang);

    // Armazenar a tradução no cache
    if (!cache[text]) {
      cache[text] = {};
    }
    cache[text][targetLang] = translatedText;

    res.json({ translatedText });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao traduzir o texto.' });
  }
});

// Swagger UI Setup
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API de Tradução',
    description: 'Uma API simples para traduzir textos usando a Gemini API.',
    version: '1.0.0',
  },
  paths: {
    '/translate': {
      post: {
        summary: 'Tradução de Texto',
        description: 'Traduza o texto enviado para o idioma desejado.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  text: { type: 'string' },
                  targetLang: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Texto traduzido com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    translatedText: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});