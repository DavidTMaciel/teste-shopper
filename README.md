# Teste Shopper

Este projeto é um serviço backend desenvolvido em Node.js e TypeScript para gerenciar leituras individuais de consumo de água e gás. O serviço recebe imagens de medidores, consulta um modelo de IA para extrair as leituras e permite a confirmação ou correção dessas leituras.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **Docker**: Utilizado para containerização do aplicativo.
- **Express**: Framework web para Node.js, utilizado para gerenciar rotas e middleware.
- **TypeORM**: ORM para trabalhar com banco de dados de forma intuitiva e simplificada.

## Pré-requisitos

- Node.js (versão 22.2.0 ou superior)
- Docker
- Docker Compose

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/DavidTMaciel/teste-shopper.git
2. Configure as variáveis de ambiente no arquivo .env.

3. Execute o projeto usando Docker:
   ```bash
    docker-compose up --build

## Rotas da API
## POST /upload
Descrição: Recebe uma imagem em base64, consulta o modelo de IA Gemini e retorna a medida lida.

Corpo da Requisição:
   ```json
  {
  "image": "base64",
  "customer_code": "string",
  "measure_datetime": "datetime",
  "measure_type": "WATER"
  }
````
## PATCH /confirm
Descrição: Responsável por confirmar ou corrigir o valor lido pelo LLM.

Corpo da Requisição:
 ```json
{
"measure_uuid": "string",
"confirmed_value": integer
}
````
## GET /<customer code>/list
Descrição: Responsável por listar as medidas realizadas por um determinado cliente, exemplo do uso abaixo.
```bash
http://localhost:3000/1447348794449/list?measure_type=gas

