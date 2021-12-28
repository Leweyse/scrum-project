<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'user_ip',
        'sub_total',
        'postcode',
        'city',
        'address_line_1',
        'address_line_2',
        'country',
        'status',
        'shipped_date'
    ];
}
