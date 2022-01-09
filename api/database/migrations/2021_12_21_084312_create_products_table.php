<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('user_ip');
            $table->integer('users_id');
            $table->integer('categories_id');
            $table->string('sku');
            $table->string('title');
            $table->text('description');
            $table->string('image')->default('default.jpg');
            $table->integer('price');
            $table->string('type')->default('sell');
            $table->integer('stock_unit')->nullable();
            $table->integer('sold_unit')->default(0);
            $table->integer('min_bid')-nullable();
            $table->date('expires')->nullable(); // for bidding only
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
