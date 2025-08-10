## Comandos Docker Compose

Para iniciar o projeto:
```bash
docker-compose up -d --build
```

Para parar e remover os containers:
```bash
docker-compose down
```

Para pausar (sem remover):
```bash
docker-compose stop
```

Para ver os logs do serviço da API:
```bash
docker-compose logs tradutor-api
```

Para reconstruir a imagem do projeto:
```bash
docker-compose build --no-cache
```

# Tradutor API

API RESTful para tradução de textos usando o modelo Gemini (Google Generative AI), com cache persistente via Redis, proteção contra abuso (rate limit) e pronta para rodar em Docker.

---

## Requisitos


### Dependências
- Node.js 18 ou superior
- Docker (opcional, recomendado)

### Instalação manual
```bash
npm install
```

### Instalação via Docker
```bash
docker-compose up
```

---

## Configuração do Ambiente


1. Crie um arquivo `.env` na raiz do projeto e adicione sua chave Gemini:
  ```
  GEMINI_API_KEY=your_gemini_api_key
  REDIS_HOST=redis
  REDIS_PORT=6379
  API_KEY=your_api_key_opcional
  ```
2. Para exemplo, veja `.env.example`.
3. Proteja este arquivo contra acesso não autorizado.

---

## Execução do Servidor


### Execução manual
```bash
node index.js
```

### Execução via Docker
```bash
docker-compose up
```

O servidor será iniciado na porta 3000.
Acesse a documentação Swagger em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## Endpoints Disponíveis

### 1. Tradução de Texto
- **Rota:** `POST /translate`
- **Descrição:** Recebe um texto e retorna a tradução para o idioma desejado.

#### Corpo da Requisição
```json
{
  "text": "Texto que deseja traduzir",
  "targetLang": "Idioma de destino (ex: portugues, espanhol)"
}
```

#### Exemplo de Requisição
```bash
curl -X 'POST' \
  'http://localhost:3000/translate' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "text": "nice to meet you",
  "targetLang": "portugues"
}'
```

#### Resposta de Sucesso
```json
{
  "translatedText": "Prazer em te conhecer."
}
```

#### Resposta de Erro
```json
{
  "error": "Texto e idioma de destino são necessários."
}
```

---

## Recursos


### Cache Persistente
- Traduções são armazenadas no Redis por 24h, reduzindo o número de requisições à API Gemini.


### Limitação de Requisições
- Implementado com `express-rate-limit`.
- 100 requisições por IP a cada 15 minutos.


### Integração com Google Generative AI
- Usa a API Gemini para gerar traduções naturais e de alta qualidade.

---

## Documentação Swagger
- Disponível em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- Inclui uma interface para testar e explorar os endpoints da API.

---


## Estrutura do Projeto
```
├── index.js           # Código principal da API
├── package.json       # Dependências e scripts
├── .env               # Configuração de ambiente (não versionado)
├── .env.example       # Exemplo de configuração
├── Dockerfile         # Imagem Docker da API
├── docker-compose.yml # Orquestração com Redis
└── node_modules/      # Dependências instaladas
```

---

## Possíveis Ajustes


## Possíveis Ajustes
1. **Autenticação**
  - Adicionar verificação de API key para uso privado.
2. **Testes automatizados**
  - Implementar testes unitários e de integração.
3. **Expansão da documentação Swagger**
  - Detalhar todos os endpoints e exemplos.
4. **Validação de entrada**
  - Limitar tamanho do texto e validar idiomas suportados.

---


## Licença
MIT
