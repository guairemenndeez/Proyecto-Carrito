<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class productosSeeder extends Seeder //php artisan make:seeder productosSeeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('productos')->insert([
            'Nombre'=>"Arroz",
            'Descripcion'=>"Arroz de Valencia",
            'peso'=> 1,
            'Stock'=>20,
            'CodCat'=>1
        ]);


    }
}


