# B-Bay Api

## Requirements
- php 8+
- composer
- GD extension must be enabled in Php

<!-- 
Part of description that should be added

- Products for sell and the `rest`: buy, add, edit
- Geek webshop
- Based on website 
-->

## Scaffold project
- Clone project in your local machine
- create .env file and copy .env.example file contents to .env
- run php artisan key:generate to generate APP key
- set your database settings in .env file

### Database and Migration
- run php artisan migrate
    this will create all the necessary tables for you
Optionally you can run following commands to fake data in your database
- php artisan db:seed --class=DatabaseSeeder (create 20 fake users)
- php artisan db:seed --class=ProductSeeder (create 500 fake products)
- Create 7 categories in category tables with id (from 1 to 7)

## Run the server
- run php artisan serve
    This will run the localhost at 8000 port

### Api Routes
 Routes are located in routes folder. All the api routes are in routes/api.php excepr the cart and order submit routes.
 We have cart in our api but the cart is implemented with session and the api.php file doesn't support any session. To tackle we have added cart and order submitting route in routes/web.php file

