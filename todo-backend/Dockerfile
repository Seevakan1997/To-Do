FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN cp .env.example .env

RUN composer install
RUN chown -R www-data:www-data /var/www

COPY startup.sh /startup.sh
RUN chmod +x /startup.sh

EXPOSE 8000

CMD ["/startup.sh"]
