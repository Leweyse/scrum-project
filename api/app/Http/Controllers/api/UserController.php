<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Auth;
use Validator;

class UserController extends Controller
{
    public function user() {
        $user = Auth::user();
        $response = [
            'status' => 'success',
            'data' => [
                'user' => $user
            ]
        ];
        return response($response, 200);
    }

    public function getUser(Request $request, $id) {

        $user = User::find($id);
        if(!$user) {
            $response = [
                'status' => 'fail',
                'message' => 'This user doesn\'t exixt in database'
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 'success',
            'data' => [
                'user' => $user
            ]
        ];
        return response($response, 200);
    }

    public function update(Request $request) {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:users,email,'.Auth::id(),
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

        $update = User::where('id', Auth::id())->update($request->all());

        if(!$update) {
            $response = [
                'status' => 'fail',
                'data' => [
                    'message' => 'Unknown error'
                ]
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 'success',
            'data' => Auth::user()
        ];
        return response($response, 200);
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
