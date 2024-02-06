<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('productos_carrito', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_Usuario');
            $table->unsignedBigInteger('CodPro');
            $table->integer('unidades');
            $table->foreign('CodPro')->references('id')->on('productos');
            $table->foreign('id_Usuario')->references('id')->on('usuarios');
            

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos_carrito');
    }
};
