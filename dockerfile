# Usar uma imagem base do Node.js
FROM node:18

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos de dependências
COPY package.json package-lock.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código do frontend
COPY . .

# Compilar o projeto React (se necessário)
RUN npm run build

# Expor a porta que o frontend usa
EXPOSE 3000

# Comando para rodar o servidor de desenvolvimento
CMD ["npm", "start"]