<?php

namespace App\Http\Controllers\api\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;
use Validator;
use Hash;

class LoginController extends Controller
{
    public function login(Request $request) {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
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

        $user = User::where('email', $request['email'])->first();

        if(!$user || !Hash::check($request['password'], $user->password)) {
            $response = [
                'status' => 'fail',
                'data' => [
                    'message' => 'The credentials does not match'
                ]
            ];
            return response($response, 200);
        }
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

    public function logout() {
        auth()->user()->tokens()->delete();
        $response = [
            'status' => 'success'
        ];
        return response($response, 200);
    }

    public function checkToken() {
        return response('Valid token');
    }

    private function errorMessages()
    {
        return [
            'email.required' => 'Your Email Please',
            'email.email' => 'Valid Email Please',
            'password.required' => 'Password please'
        ];
    }
}
