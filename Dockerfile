FROM node:12.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

FROM nginx:1.21.5-alpine as final
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx_config/ /etc/nginx/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
