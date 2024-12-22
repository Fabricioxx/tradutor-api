# API de Tradução

Esta é uma API simples para traduzir textos usando o modelo generativo Gemini (Google Generative AI). Ela oferece uma interface RESTful para enviar texto em um idioma e receber a tradução no idioma desejado. A API inclui cache para otimizar desempenho e utiliza limição de requisições para proteger contra abuso.

---

## Requisitos

### Dependências
- Node.js (versão 14 ou superior)
- npm (versão 6 ou superior)

### Pacotes
Instale as seguintes dependências antes de iniciar o projeto:

```bash
npm install express dotenv axios @google/generative-ai express-rate-limit swagger-ui-express
```

---

## Configuração do Ambiente

1. Crie um arquivo `.env` na raiz do projeto e adicione sua chave de API da Gemini:

```
GEMINI_API_KEY=your_gemini_api_key
```

2. Certifique-se de proteger este arquivo de distribuição ou acesso não autorizado.

---

## Execução do Servidor

1. Certifique-se de que todas as dependências estejam instaladas.
2. Execute o servidor com o comando:

```bash
node server.js
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

### Cache
- Traduções recentes são armazenadas em cache para otimizar desempenho.
- As consultas subsequentes para o mesmo texto e idioma retornam os resultados do cache.

### Limitação de Requisições
- Implementado usando `express-rate-limit`.
- **Configuração Padrão:**
  - 100 requisições permitidas por IP em uma janela de 15 minutos.
  - Retorna o seguinte erro após exceder o limite:
    ```json
    {
      "error": "Limite de requisições atingido. Tente novamente mais tarde."
    }
    ```

### Integração com Google Generative AI
- Usa a API do Gemini para gerar traduções de alta qualidade.

---

## Documentação Swagger
- Disponível em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- Inclui uma interface para testar e explorar os endpoints da API.

---

## Estrutura do Projeto

```
.
├── index.js       # Arquivo principal do servidor
├── package.json    # Dependências e scripts do projeto
├── .env            # Configuração da chave de API
└── node_modules/   # Dependências instaladas
```

---

## Possíveis Ajustes

1. **Aprimoramento do Cache**
   - Integre um banco de dados como Redis para armazenar traduções em cache de forma persistente.

2. **Suporte a Idiomas Adicionais**
   - Certifique-se de que o modelo Gemini está configurado para todos os idiomas de destino desejados.

3. **Autenticação**
   - Adicione autenticação por token para proteger os endpoints contra uso não autorizado.

4. **Limitação de Tamanho de Texto**
   - Valide o comprimento do texto de entrada para evitar cargas excessivas na API Gemini.

---

## Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.


