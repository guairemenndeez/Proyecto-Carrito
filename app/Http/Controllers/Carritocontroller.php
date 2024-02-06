<?php

namespace App\Http\Controllers;

use App\Models\Carrito;
use App\Models\productos;
use App\Models\Usuario;
use Illuminate\Http\Request;

class Carritocontroller extends Controller
{
    //


    function index(){
        $lista=[];
        session_start();
        $usuario= Usuario::where('usuario',$_SESSION['usuario'])->first();
        $listaCarrito = Carrito::where('id_Usuario',$usuario->id)->get();
        $lista[0]=$listaCarrito;
        for($i=0;$i<count($listaCarrito);$i++){
            $producto = productos::where('id',$listaCarrito[$i]->CodPro)->get();

            $productos[]=$producto;

        }
        $lista[1]=$productos;

   return  $lista;
   }



    public function store(Request $request)
   {
       // Validación de formularios
       $request->validate([
           'id' => 'required',
           'numero' => 'required'
       ]);
       session_start();

        $usuario= Usuario::where('usuario',$_SESSION['usuario'])->first();

        $producto =productos::find($request->id);
        $UnidadesProducto = $producto->Stock - $request->numero;

        if($UnidadesProducto>0){
            $Carrito= Carrito::where('id_usuario',$usuario->id)->where('CodPro',$request->id)->first();
                if($Carrito!=null){
                    $Carrito->unidades += $request->numero;
                    $res = $Carrito->save();
                }else{
                    $Carrito = new Carrito();
                    $Carrito->id_Usuario = $usuario->id;
                    $Carrito->CodPro = $request->id;
                    $Carrito->unidades = $request->numero;
                    $res = $Carrito->save();
                }
                if (isset($_SESSION['carrito'][$Carrito->id])) {
                    $_SESSION['carrito'][$Carrito->id]['unidades'] += $request->numero;
                } else {
                    $_SESSION['carrito'][$Carrito->id] = $Carrito;
                }
                $producto->Stock = $UnidadesProducto;
                $producto->save();

                return $res;
       }


   }

   public function delete(Request $request)
   {
        session_start();
           $Carrito = Carrito::find($request->id);


           if(isset($_SESSION['carrito'][$Carrito->id]['unidades'])) {
            $_SESSION['carrito'][$Carrito->id]['unidades'] -= $request->unidades;
            
            $producto =productos::find($Carrito->CodPro);
                $UnidadesProducto = $producto->Stock + $request->unidades;
                $producto->Stock = $UnidadesProducto;
                $producto->save();
                $Carrito->unidades -= $request->unidades;
            if($_SESSION['carrito'][$Carrito->id]['unidades'] <= 0) {
                unset($_SESSION['carrito'][$Carrito->id]);
                $Carrito->drop();
            }
            $Carrito->save();
        }





 return true;
   }



}
