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
            return response()->json(['error' => $validator->errors()], 401);
        }

        $user = User::where('email', $request['email'])->first();

        if(!$user) {
            return response([
                'status' => 'failed',
                'message' => 'The email is not registered yet'
            ], 401);
        }
        if (!Hash::check($request['password'], $user->password)) {
            return response([
                'status' => 'failed',
                'message' => 'The credentials does not match'
            ], 401);
        }

        $token = $user->createToken(env('APP_KEY'))->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function logout() {
        auth()->user()->tokens()->delete();
        $response = [
            'message' => 'logged out'
        ];

        return response($response, 201);
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
