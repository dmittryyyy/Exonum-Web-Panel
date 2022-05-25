# build environment
FROM node:lts as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install npm@8.5.5 -g --silent
RUN npm install react-scripts@5.0.1 -g --silent
RUN node -v
RUN npm -v
COPY package.json ./
COPY package-lock.json ./
COPY . ./
RUN npm ci --silent
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]