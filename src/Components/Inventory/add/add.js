import React from 'react'
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import './add.css';


class AddItem extends React.Component   {

 	constructor() {
 		super();
 		this.state = {
 			modalShow: false,
 			name: '',
 			quantity: '',
 			price: '',
 			profit: '',
 			expiry: '',
 			error: 'error'
 		}

 	}



      onHide =() => { this.setState({modalShow: false}) }

      addItem = (field, event) => {
      	if(field === 'name') {
      		this.setState({name: event.target.value})
      	} else if (field === 'quantity') {
      		this.setState({quantity: Number(event.target.value)})
      	} else if (field === 'price') {
      		this.setState({price: Number(event.target.value)})
      	} else if (field === 'profit') {
      		this.setState({profit: Number(event.target.value) })
      	} else if (field === 'expiry') {
      		this.setState({expiry: event.target.value})
      	}

      }

      submitClick = (event) => {
		console.log('asasssssssss')
      	event.preventDefault();

      	const { name , quantity , price , profit , expiry } = this.state

        if(name.length === 0) {
          document.getElementById('errorMsg2').style.display = 'block'
          document.getElementById('successMsg').style.display = 'none'
          document.getElementById('errorMsg1').style.display = 'none'
        } else {

      			fetch('https://sale-and-inventory-backend.vercel.app/add-item', {
					  method: 'POST',
					  headers: {'Content-Type': 'application/json' , 'Access-Control-Allow-Origin': 'https://sale-and-inventory-backend.vercel.app/add-item'},
					  body: JSON.stringify({
					  	name: name,
			 			quantity: quantity,
			 			price: price,
			 			profit: profit,
			 			expiry: expiry,
			 			})
					})
      			.then(res=>res.json())
      			.then(res=>{
      				console.log(res)
      				if(res.includes('already exists')) {
      					document.getElementById('errorMsg1').style.display = 'block'

      					document.getElementById('errorMsg2').style.display = 'none'
      					document.getElementById('successMsg').style.display = 'none'
      				}
      				else if ( res === 'success') {
      					document.getElementById('successMsg').style.display = 'block'
      					document.getElementById('errorMsg1').style.display = 'none'
      					document.getElementById('errorMsg2').style.display = 'none'
      				} else {
      					document.getElementById('errorMsg2').style.display = 'block'
      					document.getElementById('errorMsg1').style.display = 'none'
      					document.getElementById('errorMsg2').style.display = 'none'
      				}
      			})
          }
      }


      render() {
		console.log(this.state)
				return(
						<>
						      <br/>
						      <br/>
						      <br/>
						      <br/>
						      <div  id="add-button-cont">
							      <Button variant="primary" onClick={() => this.setState({modalShow: true})}>
							        Add Item
							      </Button>
						      </div>


						        <Modal

							      show={this.state.modalShow}
							      size="lg"
							      aria-labelledby="contained-modal-title-vcenter"
							      centered
							      backdrop="static"
							    >
							      <Modal.Header>
							        <Modal.Title id="contained-modal-title-vcenter">
							          Add Item
							        </Modal.Title>
							      </Modal.Header>
							      <Modal.Body>

							     <Form>
								      <Form.Group className="mb-3">

								        <Form.Control onChange={(event)=>this.addItem('name', event)} name="name" type="name" placeholder="Enter Product Name" />

								      </Form.Group>

								      <Form.Group className="mb-3">

								        <Form.Control onChange={(event)=>this.addItem('quantity', event)} name="quantity" type="quantity" placeholder="Quantity" />

								      </Form.Group>

								      <Form.Group className="mb-3">

								        <Form.Control onChange={(event)=>this.addItem('price', event)}  name="price" type="price" placeholder="Price" />

								      </Form.Group>

								      <Form.Group className="mb-3">

								        <Form.Control onChange={(event)=>this.addItem('profit', event)}  name="profit" type="profitPerc" placeholder="Profit Percentage" />

								      </Form.Group>

								      <Form.Group className="mb-3">

								        <Form.Control onChange={(event)=>this.addItem('expiry', event)}  name="expiry" type="date" placeholder="Expiry" />
								        <Form.Text id="errorMsg1">Item already exists.</Form.Text>
								        <Form.Text id="errorMsg2">Item name is necessary.</Form.Text>
								          <Form.Text id="successMsg">Item Added.</Form.Text>
								      </Form.Group>
								      <div id="submitButton">
									      <Button onClick={this.submitClick} variant="primary" type="submit">
									        Submit
									      </Button>
								      </div>
							    </Form>


							      </Modal.Body>
							      <Modal.Footer>
							        <Button onClick={this.onHide}>Close</Button>
							      </Modal.Footer>
							    </Modal>
				    	</>
		    	)
		}

}

export default AddItem;
