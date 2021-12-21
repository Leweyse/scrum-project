<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'categories_id',
        'sku',
        'title',
        'description',
        'image',
        'price',
        'stock_unit',
        'sold_unit'
    ];
}
