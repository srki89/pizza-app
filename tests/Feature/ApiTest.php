<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiTest extends TestCase
{
    /**
     * Test API route for pizza offer
     * 9 pizzas in offer
     * @return void
     */
    public function testGetPizzaOffer()
    {
        $response = $this->getJson('/api/pizzas');
        $response->assertJsonCount(9);
    }
    /**
     * Test API route for configuration
     *  3 parameter in config
     * @return void
     */
    public function testGetConfiguration()
    {
        $response = $this->getJson('/api/configuration');
        $response->assertJsonCount(3);
    }
    /**
     * Test API route for additional valutes
     * 1 additional valute USD
     * @return void
     */
    public function testGetAdditionalValutes()
    {
        $response = $this->getJson('/api/additional_valutes');
        $response->assertJsonCount(1);
    }
    /**
     * Test API route for saving order
     *
     * @return void
     */
    public function testPostSaveOrder()
    {
        $response = $this->postJson('/api/order', [
          'fullName' => "Test Order!",
          'email' => "test@email.test",
          'phone' => "000000",
          'address' => "Test Order!",
          'pizzas' => [
              [
                 "id" => 1,
                 "quantity" => 1
              ],
              [
                 "id" => 2,
                 "quantity" => 2
              ]
          ]
        ]);
        $response->assertStatus(200);
    }

}
