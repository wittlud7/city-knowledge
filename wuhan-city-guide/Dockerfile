FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY index.html vite.config.mjs ./
COPY src ./src
COPY content ./content
COPY public ./public
RUN npm run build

FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=8816
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && mkdir data && chown node:node data
COPY server ./server
COPY content ./content
COPY public ./public
COPY --from=build /app/dist ./dist
USER node
EXPOSE 8816
VOLUME ["/app/data"]
CMD ["node", "server/index.mjs"]
