<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bid extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'products_id',
        'user_ip',
        'bid'
    ];


    protected static function boot()
    {
        parent::boot();

        static::creating(function($Product)
        {
            $Product->user_ip =  \Request::ip();
            $Product->users_id =  \Auth::id();
        });
    }
}
