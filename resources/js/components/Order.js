import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const APIroute_saveOrder = '/api/order';

const StatusOK = 1;
const StatusValidateError = 2;
const StatusError = 0;

class Order extends Component {


  constructor(props){
      super(props);

      this.state = {
          name: "",
          email: "",
          phoneNumber: "",
          address: "",
          error: false,
          status: "open",

      }

      this.finishOrder = this.finishOrder.bind(this);
      this.nameChange = this.nameChange.bind(this);
      this.emailChange = this.emailChange.bind(this);
      this.phoneChange = this.phoneChange.bind(this);
      this.addressChange = this.addressChange.bind(this);

  }

  nameChange(event){
      var val = event.target.value;
      var error = false;
      if(val.length < 1 || val.length > 100){
          error = true;
      }
      this.setState({
          name: val,
          error: error,
      });
  }
  emailChange(event){
      var val = event.target.value;
      var error = false;
      var patern = /\S+@\S+/;
      if(val.length < 1 || val.length > 100 || !patern.test(val)){
          error = true;
      }
      this.setState({
          email: val,
          error: error,
      });
  }
  phoneChange(event){
      var val = event.target.value;
      var error = false;
      if(val.length < 1 || val.length > 100){
          error = true;
      }
      this.setState({
          phoneNumber: val,
          error: error,
      });
  }
  addressChange(event){
      var val = event.target.value;
      var error = false;
      if(val.length < 1 || val.length > 100){
          error = true;
      }
      this.setState({
          address: val,
          error: error,
      });
  }
  finishOrder(){
      // save order
      if(!this.state.error && this.state.name.length > 0 && this.state.email.length > 0 && this.state.phoneNumber.length > 0 && this.state.address.length > 0){
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
             pizzas: this.props.pizzas,
             fullName: this.state.name,
             email: this.state.email,
             phone: this.state.phoneNumber,
             address: this.state.address,
          })
        };
        fetch(APIroute_saveOrder, requestOptions)
          .then(response => response.json())
          .then(data =>
              this.setState({
                  status: data,
              })
          );
      }else{
          this.setState({
              error: true,
          });
      }
  }



  render(){
      if(this.state.status === StatusOK){
        //this.props.cleanFunc();
        return (
          <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{display: "block", paddingRight: "15px" }}>
            <Modal.Dialog role="document">
              <Modal.Header>
                <Modal.Title className="text-info">Your order was received</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <p className="text-info">Payment was not inplemented</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.props.closeFunc.bind(this)} variant="secondary">Close</Button>
                <Button onClick={this.props.cleanFunc.bind(this)} variant="primary">Clean Your Cart</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        )
      }else if(this.state.status === StatusError){
        return (
          <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{display: "block", paddingRight: "15px" }}>
            <Modal.Dialog role="document">
              <Modal.Header>
                <Modal.Title className="text-info">Opsss..Your order was not confirmed!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <p className="text-info">Phone Number: +49123123123.</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.props.closeFunc.bind(this)} variant="primary">Close</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        )
      }else{
        return (
          <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{display: "block", paddingRight: "15px" }}>
            <Modal.Dialog role="document">
              <Modal.Header>
                <Modal.Title className="text-info">Delivery address and contact</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <p className="text-info">Total:<span className="px-2">{this.props.sum}</span><span className="px-2">{this.props.valute}</span></p>
                  <input className="border-top-0 border-right-0 p-1 mb-2 text-info w-100" type="text" name="fullName" placeholder="name" value={this.state.name} onChange={this.nameChange}/>
                  <input className="border-top-0 border-right-0 p-1 mb-2 text-info w-100" type="text" name="email" placeholder="email" value={this.state.email} onChange={this.emailChange}/>
                  <input className="border-top-0 border-right-0 p-1 mb-2 text-info w-100" type="text" name="phoneNum" placeholder="phone number" value={this.state.phoneNumber} onChange={this.phoneChange}/>
                  <input className="border-top-0 border-right-0 p-1 mb-2 text-info w-100" type="text" name="street" placeholder="street" value={this.state.address} onChange={this.addressChange}/>
                  <p>All fields are mandatory</p>
                  {(this.state.error || this.state.status === StatusValidateError) ?
                      <p className="text-danger">Check your fields please!</p>
                    : null
                  }
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.props.closeFunc.bind(this)} variant="primary">Cancel</Button>
                <Button onClick={this.finishOrder} variant="primary" type="button">Pay Order</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        )
      }
  }
}
export default Order;
