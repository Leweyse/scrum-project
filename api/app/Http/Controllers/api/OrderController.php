<?php

namespace App\Http\Controllers\api;


use App\Http\Controllers\Controller;
use Illuminate\Support\Collection;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Bid;
use Validator;
use Auth;
use Cart;

class OrderController extends Controller
{
    public function order(Request $request) {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'address_line_1' => 'required',
            'postcode' => 'required',
            'city' => 'required',
            'country' => 'required'
        ], $this->errorMessages());

        if ($validator->fails()) {
            $response = [
                'status' => 'fail',
                'data' => [
                    'error' => $errors = $validator->errors()
                ]
            ];
            return response($response, 200);
        }

        
        $data = $request->all();
        $data['sub_total'] = intVal(Cart::subtotal()) * 100;
        $data['users_id'] = Cart::subtotal();
        $order = Order::create($data);
        $cart = $this->getCartContent();
  
        foreach($cart as $item) {
          $val['products_id'] = $item->id;
          $val['orders_id'] = $order->id;
          $val['quantity'] = $item->qty;
          $val['price'] = $item->price * 100;
          OrderItem::create($val);

          $product = Product::find($item->id);
          $product->stock_units = $product->stock_units - $item->qty;
          $product->sold_units = $product->sold_units + $item->qty;
        }
        Cart::destroy(); 

        $response = [
            'status' => 'success',
        ];
        return response($response, 200);
        
    }

    public function bid(request $request) {
        $is_bid = Bid::where('products_id',$request->products_id)->orderBy('bid','desc')->first();
        if($is_bid) {
            $min_bid = $is_bid->bid + 1;
        }
        else {
            $product = Product::find($request->products_id)->first();
            $min_bid = $product->price;
        }

        $validator = Validator::make($request->all(), [
            'bid' => 'required|numeric|min:'.$min_bid,
        ], $this->errorMessages());

        if ($validator->fails()) {
            $response = [
                'status' => 'fail',
                'data' => [
                    'error' => $errors = $validator->errors()
                ]
            ];
            return response($response, 200);
        }
        $bid = Bid::create([
            'products_id' => $request->products_id,
            'bid' => $request->bid
        ]);
        if($bid) {
            $response = [
                'status' => 'success'
            ];
            return response($response, 200);
        }
    }
    public function getCartContent() {
        return Cart::content();
      }
    private function errorMessages()
    {
        return [
            'full_name.required' => 'We need the receiver\'s name',
            'email.required' => 'You must provide the email address',
            'email.email' => 'Valid email please',
            'phone.required' => 'Please provide your phone number',
            'address_line_1' => 'Please provide tour address',
            'postcode' => 'Please provide yout postcode',
            'city' => 'Please provide your city',
            'country' => 'Please provide your city'
        ];
    }
}
