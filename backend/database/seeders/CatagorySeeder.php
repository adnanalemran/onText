<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CatagorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create(
            [
                'name' => 'Mobile',
                'slug' => 'i phone',
            ]
        );
        Category::create(
            [
                'name' => 'laptop',
                'slug' => 'mac book ',
            ]
        );
        Category::create(
            [
                'name' => 'pad',
                'slug' => 'i pad',
            ]
        );
    }
}