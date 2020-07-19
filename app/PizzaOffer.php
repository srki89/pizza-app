<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PizzaOffer extends Model
{



    public const QTY = 1;




    //
    protected $fillable = [
        'id',
        'name',
        'description',
        'price',
    ];



    protected $table = "pizza_offer";

    /**
    * Get all piizzas from our offer
    * @return array PizzaOffer objects
    **/
    public static function getAll(){
        $items = PizzaOffer::get();
        foreach($items as $item){
            $item->quantity = self::QTY;
        }
        return $items;
    }
    /**
    * Get pizza over id
    * @param int $id
    * @return PizzaOffer object
    **/
    public static function getOverId($id){
        $items = PizzaOffer::find($id);
        return $items;
    }
}
