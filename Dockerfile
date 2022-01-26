FROM node:16.3.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ui ./
RUN yarn install
RUN yarn build

FROM nginx:1.21.5-alpine as final
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx_config/ /etc/nginx/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
