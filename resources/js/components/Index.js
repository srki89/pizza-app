import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Cookies } from 'react-cookie';
import Order from './Order';


const APIroute_Offer = '+/api/pizzas';
const APIroute_Config = '/api/configuration';
const APIroute_AdditionalValutes = '/api/additional_valutes';

const cookies = new Cookies();

class Index extends Component {

    constructor(props){
        super(props);

        if(cookies.get('cart')){
            this.state = {

                pizzas: [],
                valute: cookies.get('cart').valute,
                additionalValutes: cookies.get('cart').additionalValutes,
                additionalValutesSumOfBill: cookies.get('cart').additionalValutesSumOfBill,
                valute: cookies.get('cart').valute,
                deliveryCost: cookies.get('cart').deliveryCost,
                sumOfBill: cookies.get('cart').sumOfBill,
                addedToCart: cookies.get('cart').addedToCart,
                showModal: false
            }
        }else{
            this.state = {
                pizzas: [],
                valute: "",
                additionalValutes: [],
                additionalValutesSumOfBill:  [],
                valute: "",
                deliveryCost: "",
                sumOfBill:  0,
                addedToCart: [],
                showModal: false
            }
        }




        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.incrementQty = this.incrementQty.bind(this);
        this.decrementQty = this.decrementQty.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleHideModal = this.handleHideModal.bind(this);
        this.cleanCart = this.cleanCart.bind(this);


    }

    componentDidMount(){


        fetch(APIroute_Offer)
          .then(response => response.json())
          .then(data => this.setState({
            pizzas: data
          })
        );



        fetch(APIroute_Config)
          .then(response => response.json())
          .then(data =>
            this.setState({
              valute: data.primary_valute,
              deliveryCost: data.delivery_cost
            })
          );

        fetch(APIroute_AdditionalValutes)
          .then(response => response.json())
          .then(data => this.setState({
            additionalValutes: data
          })
        );
    }


    addToCart(pizza){
        var pizzaExist = this.state.addedToCart.some(pizzaInCart => pizza.id === pizzaInCart.id);
        if(pizzaExist){
            alert(pizza.name + " already exist in your cart!");
        }else{
            var sum = 0;
            if(this.state.sumOfBill == 0){
                sum += this.state.deliveryCost;
            }
            sum = (parseFloat(sum) + parseFloat(this.state.sumOfBill) + parseFloat(pizza.price)).toFixed(2);
            var additionalValutes = this.additionalValutesSum(sum);
            var newAddedToCart = this.state.addedToCart.concat(pizza);
            this.setState({
              addedToCart: newAddedToCart,
              sumOfBill:sum,
              additionalValutesSumOfBill:additionalValutes,
            });
            cookies.set('cart', {'addedToCart': newAddedToCart, 'sumOfBill': sum, 'additionalValutesSumOfBill': additionalValutes});
        }

    }

    removeFromCart(pizza){
        var itemRemoved = this.state.addedToCart.find((element, key) => element.id === pizza.id);
        var index = this.state.addedToCart.indexOf(itemRemoved);
        this.state.addedToCart.splice(index, 1);
        var sum = (parseFloat(this.state.sumOfBill) - parseFloat(pizza.price * pizza.quantity)).toFixed(2);
        pizza.quantity = 1;
        var additionalValutes = this.additionalValutesSum(sum);
        if(this.state.addedToCart.length > 0){
          this.setState({
            sumOfBill: sum,
            additionalValutesSumOfBill:additionalValutes,
          });
        }else{
            cookies.remove('cart');
            this.setState({
               sumOfBill: 0,
               additionalValutesSumOfBill:[]
            });
        }
        cookies.set('cart', {'addedToCart': this.state.addedToCart, 'sumOfBill': sum, 'additionalValutesSumOfBill': additionalValutes});
    }

    incrementQty(pizza){
          var pizzasCart = this.state.addedToCart;
          var item = pizzasCart.find((element, key) => element.id === pizza.id);
          var index = pizzasCart.indexOf(item);
          pizzasCart[index].quantity += 1;
          var sum = (parseFloat(this.state.sumOfBill) + parseFloat(pizza.price)).toFixed(2);
          var additionalValutes = this.additionalValutesSum(sum);
          this.setState({
            addedToCart: pizzasCart,
            sumOfBill: sum,
            additionalValutesSumOfBill:additionalValutes,
          });
          cookies.set('cart', {'addedToCart': pizzasCart, 'sumOfBill': sum, 'additionalValutesSumOfBill': additionalValutes});
    }
    decrementQty(pizza){
        if(pizza.quantity > 1){
            var pizzas = this.state.addedToCart;
            var item = pizzas.find((element, key) => element.id === pizza.id);
            var index = pizzas.indexOf(item);
            pizzas[index].quantity -= 1;
            var sum = (parseFloat(this.state.sumOfBill) - parseFloat(pizza.price)).toFixed(2);
            var additionalValutes = this.additionalValutesSum(sum);
            this.setState({
              addedToCart: pizzas,
              sumOfBill: sum,
              additionalValutesSumOfBill:additionalValutes,
            });
            cookies.set('cart', {'addedToCart': pizzas, 'sumOfBill': sum, 'additionalValutesSumOfBill': additionalValutes});
        }else{
            alert("You can remove pizza from your cart");
        }
    }

    additionalValutesSum(sumOfPrimaryValute){
        var additionalValutes = [];
        this.state.additionalValutes.map(valute => {
           var sumAdditionalValute = (sumOfPrimaryValute * valute.conversation).toFixed(2);
           var nameAdditionalValute = valute.name;
           additionalValutes = additionalValutes.concat({"sum": sumAdditionalValute, "name": nameAdditionalValute});
        });
        return additionalValutes;
    }

    handleShowModal(){
        this.setState({
            showModal:true
        });

    }
    handleHideModal(){
      this.setState({
          showModal: false,
      });
    }
    cleanCart(){
      cookies.remove('cart');
      this.state.pizzas.map(pizza =>
          pizza.quantity = 1
      );
      this.setState({
          addedToCart: [],
          sumOfBill: 0,
          showModal: false,
      });
    }



    render(){
      if(this.state.showModal){
          var modal = <Order sum={this.state.sumOfBill} pizzas={this.state.addedToCart} valute={this.state.valute} closeFunc={this.handleHideModal} cleanFunc={this.cleanCart} />;
      }else{
          var modal = null;
      }
      return (

        <div>
            {modal}
            <div className="row">
                <div className="container-wrap col-md-8 col-sm-12">
                  <div className="row no-gutters d-flex">
                    {this.state.pizzas.map(pizza =>
                        <div key={pizza.id} className="col-md-4 text-center p-3">
                            <div className="menu-wrap">
                              <a className="menu-img img mb-4"><img className="img-fluid img-thumbnail " src={pizza.img} /></a>
                              <div className="text">
                                <h3><a href="#">{pizza.name}</a></h3>
                                <p>{pizza.description}</p>
                                <p className="price"><span>{pizza.price}</span> <span>{this.state.valute}</span></p>
                                <p><button onClick={this.addToCart.bind(this, pizza)} className="btn btn-white btn-outline-white">Add to cart</button></p>
                              </div>
                            </div>
                          </div>
                      )}
                  </div>
                </div>
                <div className="col-md-3 col-sm-12 p-3 m-2">
                    <div className="position-sticky" style={{top: 0}}>
                          <h1>Your Cart</h1>
                          { this.state.addedToCart.length > 0
                              ? <div className="col-sm-12">
                                  {this.state.addedToCart.map(pizza =>
                                    <div key={pizza.id}>
                                      <div className="d-flex row text-primary">
                                        <p className="pr-2 mr-auto">
                                          <button  onClick={this.incrementQty.bind(this, pizza)} type="button" className="btn btn-white btn-outline-white py-0 px-1 mx-1">+</button>
                                          <button  onClick={this.decrementQty.bind(this, pizza)} type="button" className="btn btn-white btn-outline-white py-0 px-1 mx-1">-</button>
                                          <span>{pizza.quantity}</span> x <span className="bold">{pizza.name}</span>
                                        </p>
                                        <p className="text-right pr-2">{pizza.price}</p>
                                        <p><button onClick={this.removeFromCart.bind(this, pizza)} type="button" className="btn btn-white btn-sm btn-outline-white">remove</button></p>
                                      </div>
                                    </div>
                                  )}
                                  <p className="text-right border-top">Delivery:<span className="pl-2">{this.state.deliveryCost}</span><span className="pl-2">{this.state.valute}</span></p>
                                  <h4 className="text-right">Total:<span className="pl-2">{this.state.sumOfBill}</span><span className="pl-2">{this.state.valute}</span></h4>
                                  { this.state.additionalValutesSumOfBill.length > 0
                                      ? <div>
                                          {this.state.additionalValutesSumOfBill.map(valute =>
                                            <p key={valute.name} className="text-right small">Total:<span className="pl-2">{valute.sum}</span><span className="pl-2">{valute.name}</span></p>
                                          )}
                                        </div>
                                      : <p></p>
                                  }
                                  <button onClick={this.handleShowModal} type="button" className="btn btn-white btn-outline-white py-2 px-1 mx-1 w-100">Proceed to Checkout</button>
                                </div>
                              : <small>Your cart is empty :(</small>
                          }
                    </div>
                 </div>
               </div>
          </div>
        )
    }
}
export default Index;
