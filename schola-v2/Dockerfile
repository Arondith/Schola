FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json ./
RUN composer install --no-dev --no-interaction --no-scripts --prefer-dist

FROM node:22-alpine AS assets
WORKDIR /app
COPY package.json vite.config.js ./
RUN npm install
COPY resources ./resources
RUN npm run build

FROM php:8.3-fpm-alpine
RUN docker-php-ext-install pdo_mysql pcntl opcache
WORKDIR /var/www/html
COPY . .
COPY --from=vendor /app/vendor ./vendor
COPY --from=assets /app/public/build ./public/build
RUN mkdir -p storage/framework/{cache,sessions,views} storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache
USER www-data
CMD ["php-fpm"]
