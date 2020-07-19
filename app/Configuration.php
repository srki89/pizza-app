<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Configuration extends Model
{
    //
    protected $fillable = [
        'id',
        'delivery_cost',
        'primary_valute',
    ];

    protected $table = "configuration";

    /**
    * get configuration
    * Only one configuration in table!
    * @return Configuration object
    **/
    public static function getConf(){
        $conf = Configuration::first();
        return $conf;
    }
}
