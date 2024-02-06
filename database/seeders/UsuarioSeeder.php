<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('usuarios')->insert([
            'usuario' => 'guaire@correo.com',
            'contraseña' => 'contra1',
            ]);
            $usuario = new Usuario();
            $usuario->usuario = "guaire2@gmail.es";
            $usuario->contraseña = "contra2";
            $usuario->save();



    }
}
