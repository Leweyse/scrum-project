<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\auth\RegisterController;
use App\Http\Controllers\api\auth\LoginController;
use App\Http\Controllers\api\ProductController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::get('/products', [ProductController::class, 'all']);
Route::get('/products/page/{page}/{take}', [ProductController::class, 'countPaginate']);
Route::get('/product/{id}', [ProductController::class, 'product']);

Route::group(['middleware' => ['auth:sanctum']], function() {
    Route::get('/check/sanctum/token', [LoginController::class, 'checkToken']);
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::post('/product/create', [ProductController::class, 'create']);
    Route::post('/product/update/{id}', [ProductController::class, 'update']);
    Route::post('/product/delete/{id}', [ProductController::class, 'delete']);
});




