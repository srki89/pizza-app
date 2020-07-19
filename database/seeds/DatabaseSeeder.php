<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UserSeeder::class);
        DB::table('configuration')->insert([
            'delivery_cost' => 3.99,
            'primary_valute' => 'EURO',
        ]);

        DB::table('additional_valutes')->insert([
            'name' => 'USD',
            'conversation' => 1.140000,
        ]);

        DB::table('pizza_offer')->insert([
            'name' => 'Siciliana',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non nulla ultrices, luctus arcu vitae, dignissim velit. Fusce maximus eleifend felis, at placerat metus hendrerit eget. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae',
            'price' => 8.99,
            'img' => '/pizza_images/siciliana.jpg',
        ]);
        DB::table('pizza_offer')->insert([
            'name' => 'Capricciosa',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non nulla ultrices, luctus arcu vitae, dignissim velit. Fusce maximus eleifend felis, at placerat metus hendrerit eget. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae',
            'price' => 9.99,
            'img' => '/pizza_images/siciliana.jpg',
        ]);
        DB::table('pizza_offer')->insert([
            'name' => 'Vegetariana',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non nulla ultrices, luctus arcu vitae, dignissim velit. Fusce maximus eleifend felis, at placerat metus hendrerit eget. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae',
            'price' => 10.99,
            'img' => '/pizza_images/siciliana.jpg',
        ]);
        DB::table('pizza_offer')->insert([
            'name' => 'Vulcano',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non nulla ultrices, luctus arcu vitae, dignissim velit. Fusce maximus eleifend felis, at placerat metus hendrerit eget. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae',
            'price' => 11.99,
            'img' => '/pizza_images/siciliana.jpg',
        ]);
        DB::table('pizza_offer')->insert([
            'name' => 'Quattro',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non nulla ultrices, luctus arcu vitae, dignissim velit. Fusce maximus eleifend felis, at placerat metus hendrerit eget. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae',
            'price' => 12.99,
            'img' => '/pizza_images/siciliana.jpg',
        ]);
        DB::table('pizza_offer')->insert([
            'name' => 'Diaola',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non nulla ultrices, luctus arcu vitae, dignissim velit. Fusce maximus eleifend felis, at placerat metus hendrerit eget. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae',
            'price' => 13.99,
            'img' => '/pizza_images/siciliana.jpg',
        ]);
        DB::table('pizza_offer')->insert([
            'name' => 'DonPizza',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non nulla ultrices, luctus arcu vitae, dignissim velit. Fusce maximus eleifend felis, at placerat metus hendrerit eget. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae',
            'price' => 14.99,
            'img' => '/pizza_images/siciliana.jpg',
        ]);
        DB::table('pizza_offer')->insert([
            'name' => 'YummyPizza',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non nulla ultrices, luctus arcu vitae, dignissim velit. Fusce maximus eleifend felis, at placerat metus hendrerit eget. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae',
            'price' => 15.99,
            'img' => '/pizza_images/siciliana.jpg',
        ]);
        DB::table('pizza_offer')->insert([
            'name' => 'Vegy',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non nulla ultrices, luctus arcu vitae, dignissim velit. Fusce maximus eleifend felis, at placerat metus hendrerit eget. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae',
            'price' => 16.99,
            'img' => '/pizza_images/siciliana.jpg',
        ]);
    }
}
