FROM composer:2 AS vendor
WORKDIR /app
COPY . .
RUN mkdir -p bootstrap/cache storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs \
    && composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

FROM node:22-alpine AS assets
WORKDIR /app
COPY package.json vite.config.js ./
RUN npm install
COPY resources ./resources
RUN npm run build

FROM php:8.3-fpm-alpine
RUN apk add --no-cache nginx supervisor \
    && docker-php-ext-install pdo_mysql pcntl opcache

WORKDIR /var/www/html
COPY . .
COPY --from=vendor /app/vendor ./vendor
COPY --from=assets /app/public/build ./public/build
COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/supervisord.conf /etc/supervisord.conf

RUN mkdir -p storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs bootstrap/cache /run/nginx \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 8000
CMD ["supervisord", "-c", "/etc/supervisord.conf"]
