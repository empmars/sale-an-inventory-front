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
			  input = document.getElementById('saleInput1');
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
				itemDiscount: '',
				saleSum: ''

			}
		}



		itemSelection = (event) => {
		  	  var nameClicked = event.target.textContent;
		  	  document.getElementById("itemMatches").style.display = 'none';
		  	  const input = document.getElementById('saleInput1');
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

    createSum = () => {

					var sums = document.getElementById('saleTableBody')
					// sums.firstChild.cells[3].innerText

					var final = 0

						for( var  i = 0 ; i < sums.children.length ; i ++) {
							final = final +	Number(sums.children[i].cells[3].innerText)

						}

						document.getElementById('totalSale').style.display="flex"
						document.getElementById('totalSaleBody').innerText=final





		}

 		submitSaleIndiv = () => {

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
	 					.then(result	=>  {

									const { name , sum , discount , quantity , profit , singlePrice}	 =  result

									const textName = document.createTextNode(name);
									const textSum = document.createTextNode(sum)
									const textDiscount = document.createTextNode(discount)
									const textQuantity = document.createTextNode(quantity)

									textSum.className = 'sumv2'

									const btnEdit = document.createElement('button')
									btnEdit.innerText = 'Edit';
									btnEdit.setAttribute('type' , 'button')
									btnEdit.setAttribute('id' , 'btnEdit')

									const btnDel = document.createElement('button')
									btnDel.innerText = 'X';
									btnDel.setAttribute('id' , 'btnClose')
									btnDel.setAttribute('type' , 'button')
									btnDel.setAttribute('info' , sum)
									console.log(btnDel)

									const colName = document.createElement('td');
									const colSum = document.createElement('td')
									const colDiscount = document.createElement('td')
									const colQuantity = document.createElement('td')
									const colED = document.createElement('td')





									const tRow = document.createElement('tr')

									colName.appendChild(textName)
									colQuantity.appendChild(textQuantity)
									colDiscount.appendChild(textDiscount)
									colSum.appendChild(textSum)
									colED.appendChild(btnEdit)
									colED.appendChild(btnDel)




									tRow.appendChild(colName)
									tRow.appendChild(colQuantity)
									tRow.appendChild(colDiscount)
									tRow.appendChild(colSum)
									tRow.appendChild(colED)



									const tBody = document.getElementById('saleTableBody')

									tBody.appendChild(tRow)

									this.createSum()


				// ------------------------------------------------------

							btnDel.onclick = (event) => {
										tRow.remove();
 										this.createSum()

									}

							btnEdit.onclick = (result)=>onEdit(result)


				// EDIT LOGIC

									const onEdit = (result) => {

										var oldSum = Number(sum)

										colQuantity.firstChild.remove()
										colDiscount.firstChild.remove()

										const quanInp = document.createElement('input')
										const discInp = document.createElement('input')
										discInp.disabled = true;
										discInp.placeholder = 'Enter Item Quantity.';


										colQuantity.appendChild(quanInp)
										colDiscount.appendChild(discInp)

										var newSum = 0;
										var outerDisc = 0;
										var outerQuan = 0;

						// QUAN EDIT

													quanInp.onkeyup = (event) => {
															var valQuan = Number(event.target.value)
															if(event.key === 'Enter' && valQuan > 0 ) {

																	discInp.disabled = false;

																	discInp.placeholder = '';


																	colQuantity.firstChild.remove()

																	var newQuan = document.createTextNode(valQuan)

																	colQuantity.appendChild(newQuan)

																	outerQuan = Number(valQuan)

															} else if (event.key === 'Enter' && valQuan === 0) {
																	quanInp.placeholder = 'Invalid Quantity';
																	quanInp.value = '';
																	quanInp.style.color = 'red';
																	quanInp.style.borderColor = 'red'


															}
													}


	     			// DISC EDIT
													discInp.onkeyup = (event) => {

															if(event.key === 'Enter') {

																var valDisc = event.target.value ;

																colDiscount.firstChild.remove()




							                 valDisc = Number(valDisc)
							                 var discAmnt = Math.round((valDisc/100) * singlePrice);
							                 var totalDiscAmnt = discAmnt * quantity

																var newDisc = document.createTextNode(totalDiscAmnt)

																colDiscount.appendChild(newDisc)

																outerDisc = totalDiscAmnt

																if (outerDisc > 0 && outerQuan > 0 ) {

									    								var newSum= (outerQuan * singlePrice) - outerDisc
									    								colSum.firstChild.remove();
									    								var sumEl = document.createTextNode(newSum)
									    								colSum.appendChild(sumEl)


																				this.createSum()

																		} else if (outerDisc === 0) {

																		 newSum = outerQuan * singlePrice
									    								colSum.firstChild.remove();
									    								var sumEl = document.createTextNode(newSum)
									    								colSum.appendChild(sumEl)
																			this.createSum()

																}


														}




													}

										}

									this.createSum()

	 						document.getElementById('totalSale').style.display = 'flex';
	 				})
    	}
  	}

  	submitSaleFinal = () => {


  				var sums = document.getElementById('saleTableBody')
					// sums.firstChild.cells[3].innerText

					const saleTotal = document.getElementById('totalSaleBody').innerText

					var saleArray = []


						for( var  i = 0 ; i < sums.children.length ; i ++) {

								var sumbitItem = 	sums.children[i].cells[0].innerText
								var sumbitQuan = 	sums.children[i].cells[1].innerText
								var sumbitDisc = 	sums.children[i].cells[2].innerText
								var sumbitSum = 	sums.children[i].cells[3].innerText

								var arr = [[ sumbitItem , sumbitQuan , sumbitDisc , sumbitSum ]]

								var saleArray = saleArray.concat(arr)


						}

						if (saleArray.length === 0) {
							document.getElementById('saleAddedError').style.display = 'block';
							// setTimeout( ()=>{document.getElementById('saleAddedError').style.display = 'none';} , 2000)
						} else {
							console.log(saleArray)
								fetch('http://localhost:3001/final-sale-add', {
								  method: 'POST',
								  headers: {'Content-Type': 'application/json'},
								  body: JSON.stringify({
								  			arr  : saleArray,
								  			total: saleTotal
								  		})
								})
								.then(res=>res.json())
								.then(result=>{
									document.getElementById('saleAddedSucc').style.display = 'block'
									// setTimeout( ()=>{document.getElementById('saleAddedSucc').style.display = 'none'} , 2000)
									document.getElementById('saleTableBody').replaceChildren()
									document.getElementById('totalSale').replaceChildren()
								})

						}


  	}

		render() {

			return (

			<div>
				  <br/>
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
										        <Form.Control id="saleInput1" onChange={()=>createDrop()} type="text" placeholder="Enter Item Name" />
										    </Form.Group>

										   <ul id="itemMatches">
											 <li><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											 <li><button onClick={(event)=>{this.itemSelection(event)}} type="button" className="forDrop" href="#"></button></li>
											</ul>
										</Row>

										<br/>

										<Row>
											<Col>
												<Form.Group md={5} className="mb-2">
											        <Form.Control id="saleInput2" onChange={(event)=>{ this.enteredSaleDet('quantity' , event)}} type="text" placeholder="Quantity" />
											    </Form.Group>
											</Col>

											<Col>
												<Form.Group md={5} className="mb-2">
											        <Form.Control id="saleInput3" onChange={(event)=>{ this.enteredSaleDet('discount' , event)}} type="text" placeholder="Extra Discount(Optional)" />
											    </Form.Group>
											</Col>

										</Row>

										<Row>

											<div id="submitSale">
												 <Button onClick={()=>{this.submitSaleIndiv()}} variant="success">Add Sale</Button>{' '}
									    </div>
									    <br/>
									    <br/>
									    <Alert id='errorSale' key="danger" variant="danger"></Alert>

										</Row>

										<Row>
												<Table id="saleTable" striped size="lg" >
											      <thead>
											        <tr>
											          <th>Item Name</th>
											          <th>Quantity</th>
											          <th>Discount</th>
											          <th>Sum</th>
											          <th></th>
											        </tr>
											      </thead>
											      <tbody id ='saleTableBody' >

											     </tbody>
											 	</Table>
										</Row>

										<Row id="totalSale">
												<p>Total : <p id="totalSaleBody"></p></p>
												<Button  onClick={()=>{this.submitSaleFinal()}} id="finalSaleSubmit" variant="success">Confirm</Button>{' '}
										</Row>

										<br/>

										<Row>
										<Alert id="saleAddedError" key="danger" variant="danger">
													No Item.
										</Alert>
										<Alert id="saleAddedSucc" key="success" variant="success">
													Success.
										</Alert>
										</Row>




								</Container>
						    </Form>
				    </ThemeProvider>



		    </div>

				)

		}

}

export default AddSale;
