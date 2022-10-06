import React from 'react';
import ReactDOM from 'react-dom';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './addSale.css'




const createDrop = () => {

  // Declare variables
  console.log('s')
  var input, filter, ul, li, btn, i, txtValue ;
  input = document.getElementById('saleInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("itemMatches");
  li = ul.getElementsByTagName('li');


  ul.style.display = 'block'
  var btnText = document.getElementsByClassName('forDrop')



	 fetch('http://localhost:3001/sale-item-search', {
	  method: 'POST',
	  headers: {'Content-Type': 'application/json'},
	  body: JSON.stringify({
	  		name: input.value
	  })
	})
	.then(res=>res.json())
	.then(result=>{
	
		var btnText = document.getElementsByClassName('forDrop')
		
		for(i=0; i<result.length;i++) {
			console.log(result[i])
			btnText[i].innerHTML = result[i].name
			btnText[i].style.display = 'block';

		}
	})



  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    btn = li[i].getElementsByTagName("button")[0];
    txtValue = btn.textContent || btn.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
      btnText[i].innerHTML = null;
    } else {
      li[i].style.display = "none";
    }
  }

  const itemSelection = (event) => {
  	console.log(event.target.value)
  }
}







const onLeaveSearch = () =>{
	document.getElementById("itemMatches").style.display = 'none'
}



class AddSale extends React.Component {


		constructor() {
			super();
			this.state = {
				itemClicked: '',
				itemQuantity: '',
				itemDiscount: ''

			}
		}



		itemSelection = (event) => {
		  	  var nameClicked = event.target.textContent;
		  	  document.getElementById("itemMatches").style.display = 'none';
		  	  const input = document.getElementById('saleInput');
		  	  input.value = nameClicked;
		  	  this.setState({itemClicked: input.value});
		  	  document.getElementById('errorSale').style.display = 'none'
 		}

 		enteredSaleDet = ( field , event ) => {
 			console.log(event.target.value)
 			   if(field === 'quantity') {
 			   		this.setState({itemQuantity: event.target.value})
 			   		 document.getElementById('errorSale').style.display = 'none'
 			   } else if (field === 'discount') {
 			   		this.setState({itemDiscount: event.target.value})
 			   		 document.getElementById('errorSale').style.display = 'none'
 			   }

 			   console.log(this.state)
 		}

 		submitSale = () => {
 					console.log(this.state)

	 				if(this.state.itemClicked === '') {
	 					document.getElementById('errorSale').style.display = 'block';
	 					document.getElementById('errorSale').innerHTML = 'Please Enter Item Name.'
	 				} else if (this.state.itemQuantity === '') {
	 					document.getElementById('errorSale').style.display = 'block';
	 					document.getElementById('errorSale').innerHTML = 'Please Enter Item Quantity.'
	 				} else {

	 					const { itemClicked , itemQuantity , itemDiscount } = this.state


	 					fetch('http://localhost:3001/sale-item-add', {
						  method: 'POST',
						  headers: {'Content-Type': 'application/json'},
						  body: JSON.stringify({
						  	name: itemClicked,
						  	quantity: itemQuantity,
						  	discount: itemDiscount
						  })
						})
	 					.then(res=>res.json())
	 					.then(result=>{

									const { id , name , price , discount , quantity }	 = result[0]			

									const textID = document.createTextNode(id)
									const textName = document.createTextNode(name);
									const textSum = document.createTextNode(price)
									const textDiscount = document.createTextNode(discount)
									const textQuantity = document.createTextNode(quantity)

									const colID = document.createElement('td')
									const colName = document.createElement('td');
									const colSum = document.createElement('td')
									const colDiscount = document.createElement('td')
									const colQuantity = document.createElement('td')

									const tRow = document.createElement('tr')

									colID.appendChild(textID)
									colName.appendChild(textName)
									colQuantity.appendChild(textQuantity)
									colDiscount.appendChild(textDiscount)
									colSum.appendChild(textSum)

									tRow.appendChild(colID)
									tRow.appendChild(colName)
									tRow.appendChild(colQuantity)
									tRow.appendChild(colDiscount)
									tRow.appendChild(colSum)

									const tBody = document.getElementById('saleTableBody')

									tBody.appendChild(tRow)

	 					})



	 				}
    }



		render() {

			return (

			<div>
				 `  <br/>
				 	<br/>
				 	<br/>
				 	<br/>
				 	<br/>
				    <ThemeProvider
					  breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
					  minBreakpoint="xxs"
				    >
							<Form>
								<Container>
										<Row>
										   <Form.Group className="mb-2">
										        <Form.Control onChange={()=>createDrop()} id="saleInput" type="text" placeholder="Enter Item Name" />
										    </Form.Group>

										   <ul id="itemMatches">
											  <li ><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li ><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											  <li ><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li ><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li ><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li ><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li ><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li ><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li ><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li ><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li ><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li ><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li ><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li ><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li ><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li ><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											</ul>
										</Row>

										<br/>

										<Row>
											<Col>
												<Form.Group md={5} className="mb-2">
											        <Form.Control onChange={(event)=>{ this.enteredSaleDet('quantity' , event)}} type="text" placeholder="Quantity" />
											    </Form.Group>
											</Col>

											<Col>
												<Form.Group md={5} className="mb-2">
											        <Form.Control onChange={(event)=>{ this.enteredSaleDet('discount' , event)}} type="text" placeholder="Extra Discount(Optional)" />
											    </Form.Group>
											</Col>

										</Row>

										<Row>

											<div id="submitSale">
												 <Button onClick={()=>{this.submitSale()}} variant="success">Add Sale</Button>{' '}
									    </div>
									    <br/>
									    <br/>
									    <Alert id='errorSale' key="danger" variant="danger"></Alert>

										</Row>

										<Row>
												<Table striped>
											      <thead>
											        <tr>
											          <th>#</th>
											          <th>Item Name</th>
											          <th>Quantity</th>
											          <th>Discount</th>
											          <th>Sum</th>
											        </tr>
											      </thead>
											      <tbody id = {'saleTableBody'} >

											       

											     


											      </tbody>
											    </Table>


										</Row>




								</Container>
						    </Form>
				    </ThemeProvider>



		    </div>

				)

		}

}

export default AddSale;