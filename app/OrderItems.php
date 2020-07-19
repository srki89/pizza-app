<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderItems extends Model
{
    //
    protected $fillable = [
        'id',
        'order_id',
        'pizza_name',
        'pizza_price',
        'quantity',
    ];

    public $timestamps = false;

    protected $table = "order_items";
}
