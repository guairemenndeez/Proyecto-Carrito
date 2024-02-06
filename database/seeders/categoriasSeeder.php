<?php

namespace Database\Seeders;

use App\Models\categorias;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class categoriasSeeder extends Seeder // php artisan make:seeder categoriasSeeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //tabla categoria

        DB::table('categorias')->insert([
            'Nombre' => 'Comida modificada',
            'Descripcion' =>"Platos e ingredientes",
            ]);

        $categoria = new categorias;
        $categoria->nombre = "Bebidas sin";
        $categoria->Descripcion = "Bebidas sin alcohol";
        
        
        $categoria = new categorias;
        $categoria->nombre = "Bebidas con";
        $categoria->Descripcion = "Bebidas con alcohol";
        $categoria->save();
    }
}
