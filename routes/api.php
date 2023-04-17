<?php

use App\Http\Controllers\api\v1\LoginController;
use App\Http\Controllers\api\v1\LogoutController;
use App\Http\Controllers\api\v1\RegisterController;
use App\Http\Controllers\api\v1\User\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('/user')->group( function() {
    Route::post('/login', [LoginController::class, 'login']);
    Route::post('/register', [RegisterController::class, 'register']);
    Route::middleware('auth:api')->get('/all', [UserController::class, 'index']);
    Route::middleware('auth:api')->post('/logout', [LogoutController::class, 'logout']);
});
