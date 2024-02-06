<?php

namespace App\Http\Controllers;

use App\Models\categorias;
use Illuminate\Http\Request;
use App\Http\Controllers\UsuarioController;

class categoriascontroller extends Controller 
    //php artisan make:controller categoriascontroller
{
    function index(){
         $listacategorias = categorias::all();
         

    return  $listacategorias;
    }

    function edit($id){
        $listacategoria =categorias::find($id);

   return  $listacategoria;
   }
   
   public function store(Request $request)
   {
       // Validación de formularios
       $request->validate([
           'nombre' => 'required',
           'descripcion' => 'required'
       ]);

       $categorias = new categorias();
       $categorias->nombre = $request->nombre;
       $categorias->descripcion = $request->descripcion;
       $res = $categorias->save();

       return $res;
   }

   public function update(Request $request){
    $usuarioController = new UsuarioController();
    if($usuarioController->comprobar_sesion()== true){
    $categorias = categorias::find($request->id);
    $categorias->Nombre = $request->nombre;
    $categorias->Descripcion = $request->descripcion;
    $res = $categorias->save();

    return $res;
    }
   }

   public function delete(Request $request)
    {
        $usuarioController = new UsuarioController();
        if($usuarioController->comprobar_sesion()== true){
            $proyecto = categorias::find($request->id);
        $proyecto->delete();
        return true;
        }
        
    }



}
