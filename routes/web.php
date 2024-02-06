<?php

use App\Http\Controllers\Carritocontroller;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\categoriascontroller;
use App\Http\Controllers\productoscontroller;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('index');
});


// Usuario
Route::post('login',[UsuarioController::class,'comprobar_Usuario']);
Route::get('logout',[UsuarioController::class,'logout']);
// Categorias.
Route::get('categorias',[categoriascontroller::class,'index']);
Route::get('categoria/{cod_cat}',[categoriascontroller::class,'edit']);
Route::post('categoria/update',[categoriascontroller::class,'update']);
Route::post('categoria/store',[categoriascontroller::class,'store']);
Route::post('categoria/delete',[categoriascontroller::class,'delete']);

// Productos.
Route::get('productos/{cod_cat}',[productoscontroller::class,'index']);
Route::post('productos/store',[productoscontroller::class,'store']);
Route::post('producto/delete',[productoscontroller::class,'delete']);

//Carrito
Route::get('carrito',[Carritocontroller::class,'index']);
Route::post('carrito/store',[Carritocontroller::class,'store']);
Route::post('carrito/delete',[Carritocontroller::class,'delete']);
