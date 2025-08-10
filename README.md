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

<div align="center">
  <h1>Tradutor API</h1>
  <p>API RESTful para tradução de textos usando o modelo Gemini (Google Generative AI), com cache persistente via Redis, proteção contra abuso (rate limit) e pronta para rodar em Docker.</p>
  <p>
  <a href="https://github.com/Fabricioxx/tradutor-api"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="MIT License"></a>
  <a href="http://localhost:3000/api-docs"><img src="https://img.shields.io/badge/docs-Swagger-blue.svg" alt="Swagger Docs"></a>
  <a href="https://github.com/Fabricioxx/tradutor-api/actions"><img src="https://img.shields.io/github/actions/workflow/status/Fabricioxx/tradutor-api/main.yml?branch=main" alt="Build Status"></a>
  <a href="https://github.com/Fabricioxx/tradutor-api/issues"><img src="https://img.shields.io/github/issues/Fabricioxx/tradutor-api.svg" alt="Issues"></a>
  <a href="https://github.com/Fabricioxx/tradutor-api/pulls"><img src="https://img.shields.io/github/issues-pr/Fabricioxx/tradutor-api.svg" alt="Pull Requests"></a>
---

## Como contribuir

1. Faça um fork do repositório.
2. Crie uma branch para sua feature ou correção:
  ```bash
  git checkout -b minha-feature
  ```
3. Faça suas alterações e commit:
  ```bash
  git commit -m "feat: minha nova feature"
  ```
4. Envie para seu fork:
  ```bash
  git push origin minha-feature
  ```
5. Abra um Pull Request no repositório original.

Sugestões, melhorias e correções são bem-vindas!
  </p>
</div>

---

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Requisitos](#requisitos)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Execução](#execução)
- [Comandos Docker Compose](#comandos-docker-compose)
- [Endpoints Disponíveis](#endpoints-disponíveis)
- [Recursos](#recursos)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Possíveis Ajustes](#possíveis-ajustes)
- [Licença](#licença)

---

## Sobre o Projeto

API para tradução de textos via Gemini, com cache persistente em Redis, documentação Swagger e pronta para uso em Docker.
docker-compose logs tradutor-api

### Dependências
- Node.js 18 ou superior
- Docker (opcional, recomendado)
Para reconstruir a imagem do projeto:
```bash
docker-compose build --no-cache
```

### Instalação manual
```bash
npm install
```

### Instalação via Docker
```bash
docker-compose up -d --build
```

# Tradutor API

API RESTful para tradução de textos usando o modelo Gemini (Google Generative AI), com cache persistente via Redis, proteção contra abuso (rate limit) e pronta para rodar em Docker.

---

## Requisitos


1. Crie um arquivo `.env` na raiz do projeto e adicione sua chave Gemini:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   REDIS_HOST=redis
   REDIS_PORT=6379
   API_KEY=your_api_key_opcional
   ```
2. Para exemplo, veja `.env.example`.
3. Proteja este arquivo contra acesso não autorizado.

### Dependências
- Node.js 18 ou superior
- Docker (opcional, recomendado)

## Execução

### Manual
```bash
node index.js
```

### Docker Compose
```bash
docker-compose up -d --build
```

O servidor será iniciado na porta 3000.
Acesse a documentação Swagger em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Instalação manual
```bash
npm install
```


## Comandos Docker Compose

| Comando | Descrição |
| ------- | --------- |
| `docker-compose up -d --build` | Inicia o projeto em segundo plano |
| `docker-compose down` | Para e remove os containers |
| `docker-compose stop` | Pausa os containers sem remover |
| `docker-compose logs tradutor-api` | Exibe os logs da API |
| `docker-compose build --no-cache` | Reconstrói a imagem do projeto |
### Instalação via Docker

### 1. Tradução de Texto
- **Rota:** `POST /translate`
- **Descrição:** Recebe um texto e retorna a tradução para o idioma desejado.
```

---

## Configuração do Ambiente



#### Corpo da Requisição
```json
{
  "text": "Texto que deseja traduzir",
  "targetLang": "Idioma de destino (ex: portugues, espanhol)"
}
```
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

## Execução do Servidor


### Execução manual
```bash

#### Resposta de Sucesso
```json
{
  "translatedText": "Prazer em te conhecer."
}
```
node index.js
```

### Execução via Docker
```bash
docker-compose up

#### Resposta de Erro
```json
{
  "error": "Texto e idioma de destino são necessários."
}
```
```

### Cache Persistente
- Traduções são armazenadas no Redis por 24h, reduzindo o número de requisições à API Gemini.
O servidor será iniciado na porta 3000.

### Limitação de Requisições
- Implementado com `express-rate-limit`.
- 100 requisições por IP a cada 15 minutos.
---

### Integração com Google Generative AI
- Usa a API Gemini para gerar traduções naturais e de alta qualidade.
## Endpoints Disponíveis

### 1. Tradução de Texto
- **Rota:** `POST /translate`
- **Descrição:** Recebe um texto e retorna a tradução para o idioma desejado.

#### Corpo da Requisição
```json
{
  "text": "Texto que deseja traduzir",

## Estrutura do Projeto
```
├── index.js           # Código principal da API
├── package.json       # Dependências e scripts
├── .env               # Configuração de ambiente (não versionado)
├── .env.example       # Exemplo de configuração
├── Dockerfile         # Imagem Docker da API
├── docker-compose.yml # Orquestração com Redis
├── LICENSE            # Licença MIT
└── node_modules/      # Dependências instaladas
```
  "targetLang": "Idioma de destino (ex: portugues, espanhol)"
}

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
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
