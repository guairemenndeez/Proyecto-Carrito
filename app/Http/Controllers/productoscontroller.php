<?php

namespace App\Http\Controllers;

use App\Models\productos;
use Illuminate\Http\Request;

class productoscontroller extends Controller
{
    //
    function index($id){
        $listaproductos = productos::where('CodCat', $id)->where('Stock','>',0)->get();


   return  $listaproductos;
   }
   public function store(Request $request)
   {
       // Validación de formularios
       $request->validate([
           'nombre' => 'required',
           'Descripcion' => 'required',
           'peso' => 'required',
           'Stock' => 'required',
           'cod_cat' => 'required',
       ]);

       $productos = new productos();
       $productos->nombre = $request->nombre;
       $productos->descripcion = $request->Descripcion;
       $productos->peso = $request->peso;
       $productos->Stock = $request->Stock;
       $productos->CodCat = $request->cod_cat;

       $res = $productos->save();

       return $res;
   }

   public function delete(Request $request)
    {
        $proyecto = productos::find($request->id);
        $proyecto->delete();
        return true;

    }

}
