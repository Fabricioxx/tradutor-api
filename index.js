const express = require('express');
const swaggerUi = require('swagger-ui-express');
const axios = require('axios');
const app = express();
const port = 3000;

// Swagger Documentation Setup
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API de Tradução',
    description: 'Uma API simples para traduzir textos.',
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
                  text: {
                    type: 'string',
                    description: 'Texto a ser traduzido',
                  },
                  targetLang: {
                    type: 'string',
                    description: 'Idioma de destino',
                  },
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
                    translatedText: {
                      type: 'string',
                      description: 'Texto traduzido',
                    },
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

// Middleware para lidar com JSON no corpo da requisição
app.use(express.json());

// Endpoint para tradução (exemplo com Google Translate API ou similar)
app.post('/translate', async (req, res) => {
  const { text, targetLang } = req.body;

  if (!text || !targetLang) {
    return res.status(400).json({ error: 'Texto e idioma de destino são necessários.' });
  }

  try {
    // Aqui, você usaria uma API de tradução, como a do Google, por exemplo:
    // Exemplo fictício, substitua pelo seu serviço de tradução
    const response = await axios.post('https://api.exemplo.com/translate', {
      text,
      targetLang,
    });

    const translatedText = response.data.translatedText; // Dependendo da API, pode ser diferente

    res.json({ translatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao traduzir o texto.' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


//http://localhost:3000/api-docs