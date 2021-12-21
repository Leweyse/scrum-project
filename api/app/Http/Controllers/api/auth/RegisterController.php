<?php

namespace App\Http\Controllers\api\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Validator;

class RegisterController extends Controller
{
    public function register(Request $request) {

        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:4',
            'phone' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        User::create($request->all());
        return response()->json(['success' => 'created'], 201);
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
