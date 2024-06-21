## Projeto Realtime Voting

## Descrição do Projeto

O projeto Realtime Voting é um sistema de votação em tempo real que permite aos usuários participar de votações ao vivo, visualizando os resultados instantaneamente. Este projeto foi desenvolvido para fornecer uma plataforma interativa e dinâmica onde os votos são computados e exibidos em tempo real, utilizando tecnologias modernas para garantir uma experiência fluida e responsiva. Com este projeto, aprendi a integrar funcionalidades de comunicação em tempo real usando `socket.io` tanto no cliente quanto no servidor, e a construir uma interface de usuário responsiva com `Next.js` e `Tailwind CSS`.

## Principais Funcionalidades

- **Sistema de Votação em Tempo Real:** Permite que os usuários votem em tempo real e vejam os resultados imediatamente.

- **Integração com WebSocket:** Utilização de `socket.io` para comunicação em tempo real entre cliente e servidor.

- **Interface de Usuário Responsiva:** Interface moderna e responsiva, construída com `Next.js` e `Tailwind CSS`.

- **Word Cloud:** Exibição de uma nuvem de palavras para visualização das opções de votação mais populares.

- **Gerenciamento de Estado com React Query:** Utilização do `@tanstack/react-query` para gerenciamento de estado eficiente no cliente.

- **Armazenamento de Dados em Redis:** Utilização do Redis para armazenamento rápido e eficiente dos dados de votação.

- **Ambiente Segregado para Cliente e Servidor:** Arquitetura clara separando a lógica de cliente e servidor para melhor manutenção e escalabilidade.

## Dependências

O projeto utiliza diversas dependências para garantir seu funcionamento suave:

### Cliente

- `@radix-ui/react-icons`: ^1.3.0
- `@radix-ui/react-label`: ^2.1.0
- `@radix-ui/react-slot`: ^1.1.0
- `@tanstack/react-query`: ^5.45.1
- `@upstash/redis`: ^1.31.5
- `@visx/scale`: ^3.5.0
- `@visx/text`: ^3.3.0
- `@visx/wordcloud`: ^3.3.0
- `class-variance-authority`: ^0.7.0
- `clsx`: ^2.1.1
- `lucide-react`: ^0.395.0
- `mini-svg-data-uri`: ^1.4.4
- `next`: 14.2.4
- `react`: ^18
- `react-dom`: ^18
- `socket.io-client`: ^4.7.5
- `tailwind-merge`: ^2.3.0
- `tailwindcss-animate`: ^1.0.7
- `@types/node`: ^20
- `@types/react`: ^18
- `@types/react-dom`: ^18
- `eslint`: ^8
- `eslint-config-next`: 14.2.4
- `postcss`: ^8
- `tailwindcss`: ^3.4.1
- `typescript`: ^5

### Servidor

- `cors`: ^2.8.5
- `dotenv`: ^16.4.5
- `express`: ^4.19.2
- `ioredis`: ^5.4.1
- `socket.io`: ^4.7.5
- `@types/express`: ^4.17.21
- `@types/node`: ^20.14.6
- `tsx`: ^4.15.6

## Como Executar o Projeto

### Configuração do Cliente

1. Clone este repositório em sua máquina local:

```bash
git clone https://github.com/seu-usuario/realtime-voting.git
cd realtime-voting/client
```

2. Certifique-se de ter o Node.js e o npm (ou yarn) instalados.

3. Instale as dependências do projeto utilizando o seguinte comando:

```bash
npm install
# ou
yarn install
```

4. Crie um arquivo `.env` na raiz do diretório do cliente com as seguintes chaves e seus respectivos valores:

```env
UPSTASH_REDIS_REST_URL=seu_valor_aqui
UPSTASH_REDIS_REST_TOKEN=seu_valor_aqui
```

Substitua `seu_valor_aqui` pelos valores apropriados.

5. Para iniciar o servidor de desenvolvimento do cliente, utilize o seguinte comando:

```bash
npm run dev
# ou
yarn dev
```

6. O frontend estará disponível em `http://localhost:3000`.

### Configuração do Servidor

1. Navegue até o diretório do servidor:

```bash
cd ../server
```

2. Instale as dependências do servidor:

```bash
npm install
# ou
yarn install
```

3. Crie um arquivo `.env` na raiz do diretório do servidor com as seguintes chaves e seus respectivos valores:

```env
REDIS_CONNECTION_STRING=seu_valor_aqui
PORT=seu_valor_aqui
```

Substitua `seu_valor_aqui` pelos valores apropriados.

4. Para iniciar o servidor, utilize o seguinte comando:

```bash
npm run dev
# ou
yarn dev
```

5. O backend estará disponível em `http://localhost:${PORT}`, onde `${PORT}` é o valor que você definiu no arquivo `.env` ou na porta 8080.

## Observações Finais

- Certifique-se de que tanto o servidor quanto o cliente estejam rodando para que a aplicação funcione corretamente.
- Use Redis para armazenar e gerenciar os dados de votação em tempo real.
- Verifique as dependências e scripts do projeto para garantir compatibilidade com seu ambiente de desenvolvimento.

Agora você está pronto para explorar o sistema de votação em tempo real e adaptar as funcionalidades conforme necessário!