import React, { Component } from 'react';
import SearchItem from '../search/search';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './ItemSearch.css'
import Alert from 'react-bootstrap/Alert';


class ItemSearch extends Component {


	constructor() {
		super();
		this.state = {
			from: false,
			to: false,
			quanInput: '',
			priceInput: '',
			profitInput: '',
			custItemArr: [],
			error: 'none'

		}
	}

	allItemsTable = () => {


		fetch('https://sale-and-inventory-backend.vercel.app/fetch-all-items', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		})
			.then(res => res.json())
			.then(result => {


				if (result.includes('err')) {
					this.setState({ error: 'block' })
				} else {
					this.setState({ error: 'none' })
					this.setState({ custItemArr: result })
				}
			})
		document.getElementById('btnItself').style.display = 'none'
		document.getElementById('btnItselfHide').style.display = 'block'
	}


	allItemsTableHide = () => {
		console.log('ok')
		document.getElementById('btnItself').style.display = 'block'
		document.getElementById('btnItselfHide').style.display = 'none'
		this.setState({ custItemArr: [] })

	}


	addItemElement = (result) => {

		console.log(result)

		result.forEach((itemData) => {


			var cutDate = new Date(itemData.expiry)
			cutDate = cutDate.toString()
			cutDate = cutDate.slice(3, 15)

			if (cutDate[8] === '1') {
				cutDate = null
			}


			var id = itemData.id
			var name = itemData.name
			var quantity = itemData.quantity
			var price = itemData.price
			var profit = itemData.profit
			var expiry = cutDate

			const textId = document.createTextNode(id);
			const textName = document.createTextNode(name);
			const textQuantity = document.createTextNode(quantity)
			const textPrice = document.createTextNode(price)
			const textProfit = document.createTextNode(profit)
			const textExpiry = document.createTextNode(expiry)


			const colId = document.createElement('td');
			const colName = document.createElement('td');
			const colQuantity = document.createElement('td')
			const colPrice = document.createElement('td')
			const colProfit = document.createElement('td')
			const colExpiry = document.createElement('td')

			colId.appendChild(textId)
			colName.appendChild(textName)
			colQuantity.appendChild(textQuantity)
			colPrice.appendChild(textPrice)
			colProfit.appendChild(textProfit)
			colExpiry.appendChild(textExpiry)

			const tRow = document.createElement('tr')

			tRow.appendChild(colId)
			tRow.appendChild(colName)
			tRow.appendChild(colQuantity)
			tRow.appendChild(colPrice)
			tRow.appendChild(colProfit)
			tRow.appendChild(colExpiry)



			const tBody = document.getElementById('allItemsBody')
			// tBody.replaceChildren()

			tBody.appendChild(tRow)

			document.getElementById('btnItself').style.display = 'none'
			document.getElementById('btnItselfHide').style.display = 'block'




		})

	}


	// EXPIRY FILTER

	expiryRangeState = (point, event) => {

		document.getElementById('btnItself').style.display = 'block'
		document.getElementById('btnItselfHide').style.display = 'none'
		if (point === 'fromDateExpiry') {

			this.setState({ from: event.target.value })

		} else if (point === 'toDateExpiry') {

			this.setState({ to: event.target.value })

		}

		console.log(this.state)
	}

	filterItemExpiry = () => {

		var { from, to } = this.state;

		if (from.length > 0 && to.length > 0) {


			fetch('https://sale-and-inventory-backend.vercel.app/filter-items-expiry', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					from: from,
					to: to
				})
			})
				.then(res => res.json())
				.then((result) => {
					if (result.includes('err')) {
						this.setState({ error: 'block' })
					} else {
						this.setState({ error: 'none' })
						this.setState({ custItemArr: result })
					}
				})



		}

	}




	// QUANTITY FILTER

	setQuanState = (event) => {
		event.preventDefault()
		document.getElementById('btnItself').style.display = 'block'
		document.getElementById('btnItselfHide').style.display = 'none'
		this.setState({ quanInput: event.target.value })

	}


	filterQuan = () => {
		const { quanInput } = this.state;

		if (quanInput.length > 0) {

			fetch('https://sale-and-inventory-backend.vercel.app/fetch-filter-quan', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					quan: quanInput
				})

			})
				.then(res => res.json())
				.then(result => {
					if (result.includes('err') || result.length < 1) {
						this.setState({ error: 'block' })
					} else {

						this.setState({ custItemArr: result })
						this.setState({ error: 'none' })
					}


				})

		}

	}

	// PRICE FILTER

	setPriceState = (event) => {
		event.preventDefault()
		document.getElementById('btnItself').style.display = 'block'
		document.getElementById('btnItselfHide').style.display = 'none'
		this.setState({ priceInput: event.target.value })
		console.log(this.state)

	}

	filterPrice = () => {
		const { priceInput } = this.state;

		if (priceInput.length > 0) {


			fetch('https://sale-and-inventory-backend.vercel.app/fetch-filter-price', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					price: priceInput
				})

			})
				.then(res => res.json())
				.then(result => {
					if (result.includes('err')) {
						this.setState({ error: 'block' })
					} else {
						this.setState({ error: 'none' })
						this.setState({ custItemArr: result })
					}


				})

		}

	}

	// PROFIT FILTER

	setProfitState = (event) => {
		event.preventDefault()
		document.getElementById('btnItself').style.display = 'block'
		document.getElementById('btnItselfHide').style.display = 'none'
		this.setState({ profitInput: event.target.value })

	}

	filterProfit = () => {
		const { profitInput } = this.state;

		if (profitInput.length > 0) {


			fetch('https://sale-and-inventory-backend.vercel.app/fetch-filter-profit', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					profit: profitInput
				})

			})
				.then(res => res.json())
				.then(result => {
					if (result.includes('err')) {
						this.setState({ error: 'block' })
					} else {
						this.setState({ error: 'none' })
						this.setState({ custItemArr: result })
					}

				})

		}

	}


	Custom_Name_Set = (arr) => {
		document.getElementById('btnItself').style.display = 'block'
		document.getElementById('btnItselfHide').style.display = 'none'
		this.setState({ custItemArr: arr })

	}

	render() {
		var self = this

		return (



			<Container>


				<Row id="btnRow">
					<Button onClick={() => { this.allItemsTable() }} id="btnItself" variant="primary">See All Items</Button>{' '}
					<Button onClick={() => { this.allItemsTableHide() }} id="btnItselfHide" variant="primary">Hide Items</Button>{' '}
				</Row>

				<br />
				<SearchItem Custom_Name_Set={(arr) => { this.Custom_Name_Set(arr) }} />
				<br />

				<h3 >Filters:</h3>

				<Row>
					<Accordion>
						<Accordion.Item eventKey="0">
							<Accordion.Header>Filter By: Expiry</Accordion.Header>
							<Accordion.Body>
								<Row className="justify-content-md-center">
									<Col md="5">
										<label class="labelDate" for="fromDateSale">From</label>
										<input onBlur={(event) => { this.expiryRangeState('fromDateExpiry', event) }} type="date" className="dateSale" id="fromDateExpiry" name="fromDateExpiry" />
										<label class="labelDate" for="toDateSale">To</label>
										<input onBlur={(event) => { this.expiryRangeState('toDateExpiry', event) }} type="date" className="dateSale" id="toDateExpiry" name="toDateExpiry" />

									</Col>
								</Row>
								<br />
								<Row className="justify-content-md-center">
									<Col md="2">
										<Button variant="primary" type="button" onClick={() => { this.filterItemExpiry() }}>
											Search
										</Button>
									</Col>
								</Row>

							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="1">
							<Accordion.Header>Filter By: Quantity</Accordion.Header>
							<Accordion.Body>

								<Row id="quantFilterCont">
									<Col md="1">
										<p>Quantity: </p>
									</Col>

									<Col md="2">
										<Form.Group className="mb-2">
											<Form.Control onChange={(event) => { this.setQuanState(event) }} type="text" placeholder="Items Less Than...." />
										</Form.Group>
									</Col>

									<Col md="1" id="quanFilterBigger" >
										<Button onClick={() => { this.filterQuan() }} variant="primary" type="button">
											Search
										</Button>

									</Col>
								</Row>

							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="2">
							<Accordion.Header>Filter By: Price</Accordion.Header>
							<Accordion.Body>

								<Row id="priceFilterCont">
									<Col md="1">
										<p>Price: </p>
									</Col>

									<Col md="2">
										<Form.Group className="mb-2">
											<Form.Control onChange={(event) => { this.setPriceState(event) }} type="text" placeholder="Items with Price Less Than...." />
										</Form.Group>
									</Col>

									<Col md="1" id="priceFilterBigger" >
										<Button onClick={() => { this.filterPrice() }} variant="primary" type="button">
											Search
										</Button>

									</Col>
								</Row>


							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="3">
							<Accordion.Header>Filter By: Profit</Accordion.Header>
							<Accordion.Body>

								<Row id="profitFilterCont">
									<Col md="1">
										<p>Profit: </p>
									</Col>

									<Col md="2">
										<Form.Group className="mb-2">
											<Form.Control onChange={(event) => { this.setProfitState(event) }} type="text" placeholder="Items with Profit Less Than...." />
										</Form.Group>
									</Col>

									<Col md="1" id="profitFilterBigger" >
										<Button onClick={() => { this.filterProfit() }} variant="primary" type="button">
											Search
										</Button>

									</Col>
								</Row>

							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</Row>



				<br />

				<Alert key='danger' variant='danger' style={{ display: this.state.error }}>
					An error occured. Please make sure you entered a valid value.
				</Alert>
				<Row>
					<Table id="allItemsTable" striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Item</th>
								<th>Quantity</th>
								<th>Price</th>
								<th>Profit</th>
								<th>Expiry</th>
							</tr>
						</thead>
						<tbody id="allItemsBody">
							{
								this.state.custItemArr.map((cur, i) => {
									return (
										<tr>
											<td>{i + 1}</td>
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
				</Row>

			</Container>


		)
	}

}




export default ItemSearch;
