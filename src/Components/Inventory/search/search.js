import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './search.css'



class SearchItem extends React.Component {

	constructor() {
		super();
		this.state = {
			itemEntered: '',
			responseData: [],
			error: false
		}

	}

	// addItemElement = (result) => {



	// 	result.forEach((itemData) => {


	// 		var cutDate = new Date(itemData.expiry)
	// 		cutDate = cutDate.toString()
	// 		cutDate = cutDate.slice(3, 15)
	// 		if (cutDate[8] === '1') {
	// 			cutDate = null
	// 		}


	// 		var id = itemData.id
	// 		var item = itemData.name
	// 		var quantity = itemData.quantity
	// 		var profit = itemData.profit
	// 		var price = itemData.price
	// 		var expiry = cutDate

	// 		const textId = document.createTextNode(id);
	// 		const textItem = document.createTextNode(item);
	// 		const textQuantity = document.createTextNode(quantity)
	// 		const textProfit = document.createTextNode(profit)
	// 		const textPrice = document.createTextNode(price)
	// 		const textExpiry = document.createTextNode(expiry)

	// 		const colId = document.createElement('td');
	// 		const colItem = document.createElement('td');
	// 		const colQuantity = document.createElement('td')
	// 		const colPrice = document.createElement('td')
	// 		const colProfit = document.createElement('td')
	// 		const colExpiry = document.createElement('td')
	// 		const colBtns = document.createElement('td')

	// 		// BTN EDIT && DEL
	// 		var btnEdit = document.createElement('button')
	// 		var btnDel = document.createElement('button')
	// 		var btnSave = document.createElement('button')
	// 		var btnReset = document.createElement('button')
	// 		var btnBack = document.createElement('button')
	// 		btnEdit.innerText = 'Edit'
	// 		btnDel.innerText = 'X'
	// 		btnSave.innerText = 'Save'
	// 		btnReset.innerText = 'Reset'
	// 		btnBack.innerText = 'Back'
	// 		btnEdit.setAttribute('id', 'btnEdit')
	// 		btnDel.setAttribute('id', 'btnClose')
	// 		btnSave.setAttribute('id', 'btnEdit')
	// 		btnReset.setAttribute('id', 'btnClose')
	// 		btnBack.setAttribute('id', 'btnEdit')
	// 		btnEdit.setAttribute('type', 'button')
	// 		btnDel.setAttribute('type', 'button')
	// 		btnSave.setAttribute('type', 'button')
	// 		btnReset.setAttribute('type', 'button')
	// 		btnBack.setAttribute('type', 'button')






	// 		colId.appendChild(textId)
	// 		colItem.appendChild(textItem)
	// 		colQuantity.appendChild(textQuantity)
	// 		colPrice.appendChild(textPrice)
	// 		colProfit.appendChild(textProfit)
	// 		colExpiry.appendChild(textExpiry)
	// 		colBtns.appendChild(btnEdit)
	// 		colBtns.appendChild(btnDel)

	// 		const tRow = document.createElement('tr')

	// 		tRow.appendChild(colId)
	// 		tRow.appendChild(colItem)
	// 		tRow.appendChild(colQuantity)
	// 		tRow.appendChild(colPrice)
	// 		tRow.appendChild(colProfit)
	// 		tRow.appendChild(colExpiry)
	// 		tRow.appendChild(colBtns)



	// 		const tBody = document.getElementById('item-edit-body')

	// 		tBody.appendChild(tRow)

	// 		btnDel.onclick = (event) => {
	// 			event.preventDefault()
	// 			tRow.replaceChildren()
	// 		}

	// 		btnEdit.onclick = (event) => {
	// 			event.preventDefault()
	// 			colBtns.replaceChildren()
	// 			btnReset.style.marginRight = '3px'
	// 			colBtns.appendChild(btnSave)
	// 			colBtns.appendChild(btnReset)
	// 			colBtns.appendChild(btnBack)


	// 			var inpQuan = document.createElement('input')
	// 			var inpPrice = document.createElement('input')
	// 			var inpProfit = document.createElement('input')
	// 			var inpExpiry = document.createElement('input')
	// 			inpExpiry.setAttribute('type', 'date')

	// 			inpProfit.disabled = true;

	// 			colQuantity.replaceChildren()
	// 			colPrice.replaceChildren()
	// 			colProfit.replaceChildren()
	// 			colExpiry.replaceChildren()

	// 			colQuantity.appendChild(inpQuan)
	// 			colPrice.appendChild(inpPrice)
	// 			colProfit.appendChild(inpProfit)
	// 			colExpiry.appendChild(inpExpiry)

	// 			colQuantity.onkeydown = (event) => {

	// 				if (event.key === 'Enter' && event.target.value > 0) {

	// 					colQuantity.replaceChildren()
	// 					var newQText = event.target.value
	// 					var newQ = document.createTextNode(newQText)
	// 					colQuantity.appendChild(newQ)
	// 				}

	// 			}

	// 			colPrice.onkeydown = (event) => {

	// 				if (event.key === 'Enter' && event.target.value > 0) {

	// 					colPrice.replaceChildren()
	// 					var newPText = event.target.value
	// 					var newP = document.createTextNode(newPText)
	// 					colPrice.appendChild(newP)
	// 					inpProfit.disabled = false
	// 				}

	// 			}

	// 			colProfit.onkeydown = (event) => {

	// 				if (event.key === 'Enter' && event.target.value > 0) {

	// 					colProfit.replaceChildren()
	// 					var newPrText = (Number(event.target.value) / 100) * Number(inpPrice.value)

	// 					var newPr = document.createTextNode(newPrText)
	// 					colProfit.appendChild(newPr)
	// 				}

	// 			}

	// 			btnReset.onclick = () => {

	// 				console.log('asasasas')

	// 				inpQuan.value = ''
	// 				inpPrice.value = ''
	// 				inpProfit.value = ''
	// 				inpExpiry.value = ''

	// 				colQuantity.replaceChildren()
	// 				colPrice.replaceChildren()
	// 				colProfit.replaceChildren()
	// 				colExpiry.replaceChildren()

	// 				colQuantity.appendChild(inpQuan)
	// 				colPrice.appendChild(inpPrice)
	// 				colProfit.appendChild(inpProfit)
	// 				colExpiry.appendChild(inpExpiry)

	// 			}

	// 			btnBack.onclick = () => {

	// 				colQuantity.replaceChildren()
	// 				colPrice.replaceChildren()
	// 				colProfit.replaceChildren()
	// 				colExpiry.replaceChildren()

	// 				colQuantity.appendChild(textQuantity)
	// 				colPrice.appendChild(textPrice)
	// 				colProfit.appendChild(textProfit)
	// 				colExpiry.appendChild(textExpiry)

	// 				colBtns.replaceChildren()
	// 				colBtns.appendChild(btnEdit)
	// 				colBtns.appendChild(btnDel)

	// 			}

	// 			btnSave.onclick = () => {

	// 				var quantity = colQuantity.innerText
	// 				var price = colPrice.innerText
	// 				var profit = colProfit.innerText
	// 				var expiry = inpExpiry.value

	// 				fetch('http://localhost:3001/save-edited-item', {
	// 					method: 'post',
	// 					headers: { 'Content-Type': 'application/json' },
	// 					body: JSON.stringify({
	// 						quantity: quantity,
	// 						price: price,
	// 						profit: profit,
	// 						expiry: expiry
	// 					})

	// 				})
	// 					.then(res => res.json())
	// 					.then(result => {

	// 						document.getElementById('item-edit-body').replaceChildren();
	// 						if (result === 'Success') {
	// 							document.getElementById('successEdit').style.display = 'block';
	// 							setTimeout(() => { document.getElementById('successEdit').style.display = 'none'; }, 2000)

	// 						} else {
	// 							document.getElementById('errorEdit').style.display = 'block';
	// 							setTimeout(() => { document.getElementById('errorEdit').style.display = 'none'; }, 2000)

	// 						}

	// 					})


	// 			}


	// 		}






	// 	})

	// }

	itemEntered = (event) => {
		event.preventDefault()

		fetch('http://localhost:3001/list-search-edit', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: this.state.itemEntered
			})

		})
			.then(res => res.json())
			.then(result => {
				console.log(result)
				if (result.length) {

					this.props.Custom_Name_Set(result)
					this.setState({error: false})










					// var input, filter;
					// input = document.getElementById('searchInpt');
					// filter = input.value.toUpperCase();

					// var col = document.getElementById('searchRowCol')
					// var ul = document.getElementById('matchesULedit')
					// ul.style.display = 'block'
					// ul.replaceChildren()


					// for(var i=0; i<result.length; i++) {
					// 				var li = document.createElement('li')
					// 				var btn = document.createElement('button')
					// 				li.setAttribute('class' , 'listFilteredEdit')

					// 				li.appendChild(btn)
					// 				ul.appendChild(li)
					// 				col.appendChild(ul)
					// 				btn.onclick = (event) => {
					// 					event.preventDefault()
					// 					ul.style.display = 'none';
					// 					input.value = event.target.innerText;
					// 					this.setState({itemEntered: event.target.innerText})
					// 				}

					// 		}

					// var getLI = document.getElementsByClassName('listFilteredEdit')

					// for(var i=0; i<result.length;i++) {

					// 			getLI[i].children[0].innerHTML = result[i].name

					// 	}



					// REMOVE REPEATITION
					//
					// var li = document.getElementsByClassName('listFilteredEdit')
					// console.log(li)
					// for (let current in li) {
					// 		for (var i=0 ; i < li.length ; i++) {
					// 						var text1 = li[current].children[0].innerText;
					// 						var text2 = li[i].children[0].innerText
					// 							if(text1 ===  text2) {
					// 										li[current].style.display = 'none';
					// 									if (li.length === 0) {
					// 										li[current].style.display = ''
					// 									}
					//
					// 							}
					//
					// 					}
					// 		}
				} else {
					this.setState({ error: true })
				}
			})

	}

	updateName = (event) => {
		event.preventDefault()
		this.setState({ itemEntered: event.target.value })
	}

	render() {

		console.log(this.state)
		return (
			<ThemeProvider
				breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
				minBreakpoint="xxs"
			>
				<Form>
					<Container>

						<br />
						<br />
						<Row id="searchRow">
							<Col id="searchRowCol" md={8}>
								<Form.Group className="mb-2">
									<Form.Control onChange={(event) => { this.updateName(event) }} id="searchInpt" type="text" placeholder="Search Item by Name" />
								</Form.Group>
								<ul id="matchesULedit"></ul>
							</Col>
							<Col md={2}>
								<Button
									onClick={(event) => this.itemEntered(event)}
									variant="primary" type="button">
									Search
								</Button>
							</Col>
						</Row>
						<br />
						<Row style={{ justifyContent: 'center', display: this.state.error ? 'flex' : 'none' }}>
							<Col>
								<Alert key='danger' variant='danger'>
									No Item Found.
								</Alert>
							</Col>
						</Row>
						{/* <Row id="editTableCont">
							<Table id="editTable" striped bordered hover>
								<thead>
									<tr>
										<th>#</th>
										<th>Item</th>
										<th>Quantity</th>
										<th>Price</th>
										<th>Profit</th>
										<th>Expiry</th>
										<th></th>
									</tr>
								</thead>
								<tbody id="item-edit-body">
									{
									this.state.responseData.map((cur, i) => {
										return(
											<tr>
												<td>{i+1}</td>
												<td>{cur.name}</td>
												<td>{cur.quantity}</td>
												<td>{cur.price}</td>
												<td>{cur.profit}</td>
												<td>{cur.expiry}</td>
											</tr>

										)
									})
									}

								</tbody>
							</Table>
							<Alert id="successEdit" key='success' variant='success'>
								Success.
							</Alert>
							<Alert id="errorEdit" key='danger' variant='danger'>
								An error Occured, Try Again.
							</Alert>
						</Row> */}
					</Container>
				</Form>
			</ThemeProvider>


		)
	}
}

export default SearchItem;
