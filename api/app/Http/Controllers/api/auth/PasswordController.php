<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Validation\Rules\Password as RulesPassword;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Validator;

class PasswordController extends Controller
{
    public function forgotPassword(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email'
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
        $user = User::where('email',$request->email)->first();
        if(!$user) {
            $response = [
                'status' => 'fail',
                'message' => 'We can\'t find this email in our database'
            ];

            return response($response, 200);
        }

        $status = Password::sendResetLink($request->only('email'));
        if($status == Password::RESET_LINK_SENT) {
                $response = [
                    'status' => 'success',
                    'message' => 'Reset link sent in email'
                ];
    
                return response($response, 200);
        }

        throw ValidationException::withMessages([
            'email' => [trans($status)]
        ]);
    }

    public function resetPassword(Request $request) {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed'

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

        $status = Password::reset(
            $request->only('email','password','password_confirmation','token'),
            function ($user) use($request) {
                $user->forceFill([
                    'password' => $request->password,
                    'remember_token' =>Str::random(60)
                ])->save();
                
                $user()->tokens()->delete(); 
                event(new PasswordReset($user));
            }
        );

        if($status == Password::PASSWORD_RESET) {
            $response = [
                'status' => 'success',
                'message' => 'You reset successfully'
            ];

            return response($response, 200);
        }

    }
    private function errorMessages()
    {
        return [
            'token.required' => 'Invalid token applied',
            'email.required' => 'Your Email Please',
            'email.email' => 'Valid Email Please',
            'password.required' => 'Password please',
            'password.min'   => 'Minimum :min characters password',
            'form.password.confirmed'   => 'Two passwords does not match',
            'form.agree.required' => 'You must agree the terms',
        ];
    }
}
