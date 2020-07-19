<?php
namespace App\Http\Controllers;

use App\PizzaOffer;
use App\Configuration;
use App\AdditionalValutes;
use App\Orders;
use App\OrderItems;
use Illuminate\Http\Request;
use Log;
use Validator;
use DB;

class PizzaController extends Controller {




    /**
    * get all pizzas
    * response convert to JSON
    * @return JSON
    **/
    public function offer() {
        Log::info('Function to return all pizzas from database');
        $pizzas = PizzaOffer::getAll();
        return $pizzas->toJson();
    }

    /**
    * get configuration
    * response convert to JSON
    * @return JSON
    **/
    public function config() {
        Log::info('Function to return simple configuration');
        $conf = Configuration::getConf();
        return $conf->toJson();
    }
    /**
    * get additional valutes
    * response convert to JSON
    * @return JSON
    **/
    public function additionalValutes() {
        Log::info('Function to return additional valutes');
        $valutes = AdditionalValutes::getValutes();
        return $valutes->toJson();
    }
    /**
    * save new order
    * @param Request JSON
    * @return boolean
    **/
    public function saveOrder(Request $request){
        Log::info('Function to save new order');
        $validator = Validator::make($request->all(), [
          'fullName' => 'required|max:100',
          'email' => 'required|email|max:100',
          'phone' => 'required|max:100',
          'address' => 'required|max:100',
          'pizzas' => 'required|array',
        ]);
        if ($validator->fails()){
            Log::warning('Server validation false! Data: '.$request->sum."; ".$request->fullName."; ".$request->email."; ".$request->phone."; ".$request->address);
            return Orders::STATUS_VALIDATION_ERROR;
        }
        $conf = Configuration::getConf();
        $order_items = $request->pizzas;
        $sum = $conf->delivery_cost;
        $itemsToSave = [];
        foreach($order_items as $order_item){
            $pizza = PizzaOffer::getOverId($order_item["id"]);
            if($pizza instanceof PizzaOffer){
                $sum += ($pizza->price * $order_item["quantity"]);
                $newItem = new OrderItems;
                $newItem->pizza_name = $pizza->name;
                $newItem->pizza_price = $pizza->price;
                $newItem->quantity = $order_item["quantity"];
                $itemsToSave[] = $newItem;
            }
        }
        $newOrder = new Orders;
        $newOrder->bill_sum = $sum;
        $newOrder->customer_name = $request->fullName;
        $newOrder->customer_email = $request->email;
        $newOrder->customer_phone = $request->phone;
        $newOrder->customer_address = $request->address;
        $newOrder->paid = 0;

        if(!empty($itemsToSave)){
            try{
                DB::beginTransaction();
                $newOrder->save();
                foreach($itemsToSave as $itemToSave){
                    $itemToSave->order_id = $newOrder->id;
                    $itemToSave->save();
                }
                Log::info('New order was saved to DB: Order id: ' . $newOrder->id);
                DB::commit();
                return Orders::STATUS_OK;
            }catch(\Exception $e){
                DB::rollback();
                Log::error('New order was not saved to DB. Reason: ' . $e->getMessage());
                return Orders::STATUS_ERROR;
            }
        }else{
            Log::error('New order was not saved to DB. Array of order items is empty!');
            return Orders::STATUS_ERROR;
        }
    }
}
