<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
//use Illuminate\Support\Collection;
use Illuminate\Http\Request;
use App\Models\Product;
use Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
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
