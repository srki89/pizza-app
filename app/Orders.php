<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    //
    public const STATUS_ERROR            = 0;
    public const STATUS_OK               = 1;
    public const STATUS_VALIDATION_ERROR = 2;


    protected $fillable = [
        'id',
        'bill_sum',
        'customer_name',
        'customer_email',
        'customer_phone',
        'customer_address',
        'paid',
        'created_at',
    ];

    public $timestamps = false;

    protected $table = "orders";
}
