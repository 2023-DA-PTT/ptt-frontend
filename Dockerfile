#stage 1
FROM node:16 as node
WORKDIR /app
COPY ./package*.json /app
RUN npm install
COPY . .
RUN npm run build --prod

#stage 2
FROM nginx:alpine
COPY --from=node /app/build/ /usr/share/nginx/html
