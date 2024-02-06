<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{

    function comprobar_Usuario(Request $request){

        // $request->validate([
        //     'usuario'=>'required',
        //     'clave'=>'required'
        // ]);
        //$usuario = Usuario::where('usuario', $request->usuario)->first();
        $usuario = Usuario::where('usuario', $request->usuario)->where("contraseña",$request->password)->first();
        if($usuario){
            session_start();
            $_SESSION['usuario'] = $usuario->usuario;
            $_SESSION['carrito'] = [];

            return response()->json(true);
        } else {
            return response()->json(false);
        }

    }



public function logout(){
    session_start();
    unset($_SESSION);
    session_destroy();

    setcookie("XSRF-TOKEN", " ", time() - 1000);
    setcookie("laravel_session", " ", time() - 1000);
    setcookie(session_name(), " ", time() - 1000);
    return true;


}




}
