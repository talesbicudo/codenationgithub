# Projeto GitHub

## Configuração
- A aplicação utiliza uma oAuth app para autenticação do usuário, necessária para acessar a api do Github
- [Tutorial](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/)
- As seguintes variáveis tem de ser adicionadas no arquivo .env, com id e secret da oAuth app criada:
```
REACT_APP_CLIENT_ID=YOUR_CLIENT_ID
OAUTH_CLIENT_ID=YOUR_CLIENT_ID
OAUTH_CLIENT_SECRET=YOUR_CLIENT_SECRET
```
- Antes de dar yarn start é necessário iniciar o gatekeeper com yarn run server

