<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
//use Illuminate\Support\Collection;
use Illuminate\Http\Request;
use App\Models\Product;
use Validator;

class ProductController extends Controller
{

    public function all()
    {
        return Product::orderBy('id','desc')->get();
    }

    public function countPaginate($page, $take) {
        $products = Product::all();
        $products = $products->reverse();
        $skip = ($page - 1 ) * $take;
        return $products->skip($skip)->take($take);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'categories_id' => 'required|Numeric',
            'title' => 'required',
            'description' => 'required',
            'image' => 'nullable|mimes:jpg,png',
            'price' => 'required|numeric',
            'stock_unit' => 'required|numeric'
        ], $this->errorMessages());

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $product = Product::create($request->all());
        return response($product, 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::where('id', $id)->first();
        if(!$product) {
            return response([
                'status' => 'failed',
                'message' => 'This product doesn\'t exixt in database'
            ], 401);
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
            return response()->json(['error' => $validator->errors()], 401);
        }
        $update = Product::where('id', $id)->update($request->all());
        if(!$update) {
            return response()->json(['message' => 'unknown error'], 401);
        }
        return response(['message' => 'updated'], 201);
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
            return response([
                'status' => 'failed',
                'message' => 'This product doesn\'t exixt in database'
            ], 401);
        }
        return response($product, 201);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    private function errorMessages()
    {
        return [
            'first_name.required' => 'Your Name Please',
            'last_name.required' => 'Last Name Please',
            'email.required' => 'Your Email Please',
            'email.email' => 'Valid Email Please',
            'email.unique' => 'Email already registered',
            'password.required' => 'Password please',
            'password.min'   => 'Minimum :min characters password',
            'form.password.confirmed'   => 'Two passwords does not match',
            'form.agree.required' => 'You must agree the terms',
        ];
    }

}
