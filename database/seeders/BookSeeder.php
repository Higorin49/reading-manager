<?php

namespace Database\Seeders;


use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use DateTime;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('books')->insert([
            'title' => '伊豆の踊子',
            'author' => '川端康成',
            'totalpage' => 300,
            'check' => true,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
     ]);
    }
}
