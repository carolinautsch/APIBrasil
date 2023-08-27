
# API de Clima - Brasil API

Este é um projeto de exemplo de uma API Restful que consome dados da Brasil API para obter informações climáticas de cidades e aeroportos. Os dados são persistidos em um banco de dados SQL Server e logs de erro são registrados em caso de problemas.

## Requisitos

- Node.js
- npm 
- SQL Server
- 
## Instalação

1. Clone este repositório para o seu ambiente de desenvolvimento:

git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
Instale as dependências do projeto:

npm install
Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto e configure as seguintes variáveis:

DATABASE_NAME=nome_do_banco_de_dados
DATABASE_USER=nome_de_usuario
DATABASE_PASSWORD=senha
DATABASE_HOST=host

Substitua os valores acima pelas informações reais do seu banco de dados.

Uso
Inicie o servidor da API:

node app.js
O servidor irá rodar na porta 3000 por padrão.

Acesse as rotas da API:
/weather/city/:cityName - Obtenha o clima de uma cidade.
/weather/airport/:airportCode - Obtenha o clima de um aeroporto.
Certifique-se de substituir :cityName e :airportCode pelos valores reais da cidade ou aeroporto desejados.

Licença
Este projeto está licenciado sob a MIT License.
