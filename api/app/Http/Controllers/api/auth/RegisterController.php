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
            'password' => 'required|min:8',
            'phone' => 'required'
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

        $user = User::create($request->all());
        $token = $user->createToken(env('APP_KEY'))->plainTextToken;

        $response = [
            'status' => 'success',
            'data' => [
                'user' => $user,
                'token' => $token
            ]
        ];
        return response($response, 200);
    }

    private function errorMessages()
    {
        return [
            'first_name.required' => 'Please enter your first name',
            'last_name.required' => 'Please enter your last name',
            'email.required' => 'Please enter your e-mail address',
            'email.email' => 'Invalid e-mail address',
            'email.unique' => 'This e-mail address is already in use',
            'password.required' => 'Please enter your password',
            'password.min'   => 'Password requires a minimum of :min characters',
            'form.password.confirmed'   => 'The entered passwords do not match',
            'form.agree.required' => 'You must agree to the terms and conditions to proceed',
        ];
    }
}
