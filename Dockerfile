FROM node:12.7-alpine AS start
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=start /usr/src/app/dist/note-hub /usr/share/nginx/html
EXPOSE 80
