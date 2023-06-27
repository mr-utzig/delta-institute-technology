FROM node:19.4.0-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 8080
CMD [ "pnpm", "preview" ]