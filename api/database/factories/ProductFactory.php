<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    private $length = [3,4,5,6,7,8,9];
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'users_id' => $this->faker->numberBetween($min = 1, $max = 20),
            'user_ip' => '217.0.0.1',
            'categories_id' => $this->faker->numberBetween($min = 1, $max = 7),
            'sku' => Str::upper(Str::random(8)),
            'title' => $this->faker->sentence($nbWords = Arr::random($this->length), $variableNbWords = true),
            'description' => $this->faker->paragraph($nbSentences = Arr::random($this->length), $variableNbSentences = true) ,
            'image' => 'default.jpg',
            'price' => $this->faker->numberBetween($min = 1000, $max = 10000),
            'stock_unit' => $this->faker->numberBetween($min = 10, $max = 500),
            'sold_unit' => 0
        ];
    }
}
