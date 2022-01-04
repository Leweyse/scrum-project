<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Collection;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Stat;
use App\Models\User;
use Validator;
use Auth;

class ProductController extends Controller
{

    public function all()
    {
        $products = Product::orderBy('id','desc')->get();
        $data = [];
        foreach($products as $product) {
            $user = User::findOrFail($product->users_id);
            $product['user'] = $user->first_name . ' ' . $user->last_name;
            $data[] = $product;
        }
        $response = [
            'status' => 'success',
            'data' => [
                'products' => $data
            ]
        ];
        return response($response, 200);
    }

    public function countPaginate($page, $take) {
        $products = Product::all();
        $products = $products->reverse();
        $skip = ($page - 1 ) * $take;
        $filtered_products =  $products->skip($skip)->take($take);

        $data = [];

        foreach ($filtered_products as $key => $product) {
            $user = User::findOrFail($product->users_id);
            $product['user'] = $user->first_name . ' ' . $user->last_name;

            $data[] = $product;
        }

        $response = [
            'status' => 'success',
            'data' => [
                'products' => $data,
                'totalLength' => count($products)
            ]
        ];
        return response($response, 200);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'categories_id' => 'required|Numeric',
            'title' => 'required',
            'description' => 'required',
            'image' => 'nullable|mimes:jpeg,jpg,png',
            'price' => 'required|numeric',
            'stock_unit' => 'required|numeric'
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
        $product = Product::create($request->all());
        $response = [
            'status' => 'success',
            'data' => [
                'product' => $product
            ]
        ];
        return response($response, 200);
    }

    public function update(Request $request, $id)
    {
        $product = Product::where('id', $id)->first();
        if(!$product) {
            return response([
                'status' => 'fail',
                'message' => 'This listing is not in our database'
            ], 200);
        }
        if(Auth::id() != $product->users_id) {
            $response = [
                'status' => 'fail',
                'message' => 'You don\'t have permission for that'
            ];
            return response($response, 200);
        }
        $validator = Validator::make($request->all(), [
            'categories_id' => 'required|Numeric',
            'title' => 'required',
            'description' => 'required',
            'image' => 'nullable|mimes:jpg,png',
            'price' => 'required|numeric',
            'stock_unit' => 'required|numeric'
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
        $update = Product::where('id', $id)->update($request->all());
        if(!$update) {
            $response = [
                'status' => 'fail',
                'data' => [
                    'message' => 'Unknown error'
                ]
            ];
            return response($response, 201);
        }
        if($product->price != $request->price) {
            Stat::create([
                'products_id' => $id,
                'old_price' => $product->price,
                'new_price' => $request->price,
            ]);
        }
        $response = [
            'status' => 'success'
        ];
        return response($response, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function product($id)
    {
        $product = Product::where('id', $id)->first();
        if(!$product) {
            $response = [
                'status' => 'fail',
                'data' => [
                    'message' => 'This listing is not in our database'
                ]
            ];
            return response($response, 200);
        }
        $user = User::findOrFail($product->users_id);
        $product['user'] = $user->first_name . ' ' . $user->last_name;
        $stats = Stat::where('products_id',$id)->get();
        $product['stats'] = $stats;
        $response = [
            'status' => 'success',
            'data' => [
                'product' => $product
            ]
        ];
        return response($response, 200);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $product = Product::where('id', $id)->first();
        if(!$product) {
            $response = [
                'status' => 'fail',
                'data' => [
                    'message' => 'This listing is not in our database'
                ]
            ];
            return response($response, 200);
        }
        if(Auth::id() != $product->users_id) {
            $response = [
                'status' => 'fail',
                'data' => [
                    'message' => 'You don\'t have permission for that'
                ]
            ];
            return response($response, 200);
        }
        Product::destroy($id);
        $response = [
            'status' => 'success'
        ];
        return response($response, 200);
    }

    public function productByUser(Request $request, $user_id) {
        $products = Product::where('users_id',$user_id)->get();
        $response = [
            'status' => 'success',
            'data' => [
                'products' => $products
            ]
        ];
        return response($response, 200);
    }
    private function errorMessages()
    {
        return [
            'categories_id.required' => 'You must choose a category',
            'categories_id.numeric' => 'Must be a number',
            'title.required' => 'name or title of the product',
            'description.required' => 'Please give some description',
            'image.mimes' => 'Only jpg or png images are accepted',
            'price.required' => 'What is the price for the product',
            'stock_unit.required' => 'How many units are available',
            'stock_unit.numeric' => 'must be a number'
        ];
    }

}
