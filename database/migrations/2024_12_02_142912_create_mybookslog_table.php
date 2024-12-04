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
        Schema::create('mybookslog', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('mybooks_id')->constrained();
            $table->dateTime('date');
            $table->integer('pagecount');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mybookslog');
    }
};
