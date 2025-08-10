
require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const rateLimit = require('express-rate-limit'); // Importando o express-rate-limit

const redis = require('redis');
const app = express();
const port = 3000;

// Configuração do Redis
const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;
const redisClient = redis.createClient({
  socket: {
    host: redisHost,
    port: redisPort
  }
});
redisClient.connect().catch(console.error);

// Substitua com sua chave de API da Gemini
const geminiAPIKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(geminiAPIKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

let cache = {}; // Cache para armazenar traduções

// Middleware para lidar com JSON no corpo da requisição
app.use(express.json());

// Configuração do rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Janela de 15 minutos
  max: 100, // Limite de 100 requisições por IP
  message: { error: 'Limite de requisições atingido. Tente novamente mais tarde.' }, // Mensagem ao exceder o limite
  standardHeaders: true, // Retorna informações no cabeçalho `RateLimit-*`
  legacyHeaders: false, // Desativa os cabeçalhos `X-RateLimit-*`
});

// Aplicando o middleware de rate limit a todas as rotas
app.use(limiter);

// Função para gerar conteúdo usando a API Gemini
async function translateText(text, targetLang) {
  const prompt = `Translate the following text to ${targetLang} in a natural and conversational way and without any additional explanation:: ${text}`;
  try {
    const result = await model.generateContent(prompt);
    // Remover quebras de linha no resultado
    const translatedText = result.response.text().replace(/\n/g, '').trim();
    return translatedText;
  } catch (error) {
    console.error('Erro ao traduzir:', error);
    throw new Error('Erro ao traduzir o texto');
  }
}

// Endpoint para tradução
app.post('/translate', async (req, res) => {
  const { text, targetLang } = req.body;

  if (!text || !targetLang) {
    return res.status(400).json({ error: 'Texto e idioma de destino são necessários.' });
  }

  // Verificar se a tradução já está no Redis
  const cacheKey = `translation:${text}:${targetLang}`;
  try {
    const cachedTranslation = await redisClient.get(cacheKey);
    if (cachedTranslation) {
      console.log('Retornando tradução do Redis');
      return res.json({ translatedText: cachedTranslation });
    }

    // Solicitar tradução da API Gemini
    const translatedText = await translateText(text, targetLang);

    // Armazenar a tradução no Redis (expira em 24h)
    await redisClient.set(cacheKey, translatedText, { EX: 86400 });

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
