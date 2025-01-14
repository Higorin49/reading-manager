<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use DateTime;

class BoardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('boards')->insert([
            'is_seacret' => true,
            'book_id' => 1,
        ]);
        DB::table('boards')->insert([
            'is_seacret' => false,
            'book_id' => 1,
        ]);
    }
}
