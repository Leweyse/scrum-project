<?php

namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Stat;

class FakeStatController extends Controller
{
    public function fake() {
        for($i=0;$i<100;$i++) {
            $product_id = rand(1,500);
            
            if($product = Product::find($product_id)) {
                $new_price = rand($product->price - 40,$product->price + 100);
                Stat::create([
                    'products_id' => $product_id,
                    'old_price' => $product->price,
                    'new_price' => $new_price
                ]);
            }
            
        }
    }
}
