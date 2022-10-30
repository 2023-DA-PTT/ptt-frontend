#stage 1
FROM node:16 as node
WORKDIR /app
COPY ./package*.json /app/
RUN npm install
COPY . .
RUN npm run build --prod

#stage 2
FROM nginx:stable-alpine@sha256:3995ec65c853edc9275f9056f3e4ee26b39bdabc993470d4fae890f18615c2a7
COPY --from=node /app/dist/ptt /usr/share/nginx/html
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf
