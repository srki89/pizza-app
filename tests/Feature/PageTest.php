<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PageTest extends TestCase
{
    /**
     * Test Home page
     *
     * @return void
     */
    public function testHomePage()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
    /**
     * Test About Us page
     *
     * @return void
     */
    public function testAboutUsPage()
    {
        $response = $this->get('/about');

        $response->assertStatus(200);
    }
    /**
     * Test Contact page
     *
     * @return void
     */
    public function testContactPage()
    {
        $response = $this->get('/contact');

        $response->assertStatus(200);
    }

}
