<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdditionalValutes extends Model
{
    //
    protected $fillable = [
        'id',
        'name',
        'conversation',
    ];

    protected $table = "additional_valutes";

    /**
    * get configuration
    * Only one configuration in table!
    * @return AdditionalValutes object
    **/
    public static function getValutes(){
        $aditionalValutes = AdditionalValutes::get();
        return $aditionalValutes;
    }
}
