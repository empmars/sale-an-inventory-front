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
import { isEmpty } from 'lodash'
import './addSale.css'







class AddSale extends React.Component {


	constructor() {
		super();


		this.state = {
			itemClicked: '',
			itemQuantity: '',
			itemDiscount: '',
			saleSum: '',
			searchedItem: [],
			selectedItem: '',
			saleToBeAddedDetails: [],
			totalSum: 0,
			totalProfit: 0,
			profitArr: [],
			buttonDisabled: true,
			err: false
		}
	}

	createDrop = (e) => {

		if (e.code === 'Enter') {

			fetch('http://localhost:3001/check-item-edit', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: e.target.value
				})
			})
				.then(res => res.json())
				.then(result => {
					console.log(result)

					if (!isEmpty(result)) {
						this.setState({ selectedItem: '' })
						this.setState({ searchedItem: result })
						this.setState({ buttonDisabled: false })
					} else {
						this.setState({ buttonDisabled: true })

					}
			})

		}

	
	}


	set_item_add_to_Sale = (e) => {
		document.getElementById('saleInput1').value = e.target.textContent
		this.setState({ selectedItem: e.target.textContent })
	}

	enteredSaleDet = (field, event) => {
		console.log(event.target.value)
		if (field === 'quantity') {
			this.setState({ itemQuantity: event.target.value })
		} else if (field === 'discount') {
			this.setState({ itemDiscount: event.target.value })
		}

		console.log(this.state)
	}



	submitSaleIndiv = () => {


		fetch('http://localhost:3001/sale-item-add', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: this.state.selectedItem,
				reqQuan: this.state.itemQuantity,
				reqDisc: this.state.itemDiscount
			})
		})
			.then(res => res.json())
			.then(result => {

				if (result !== 'err') {
					var newArr = [...this.state.saleToBeAddedDetails, result[0]]
					var profitArr = this.state.profitArr
					profitArr.push(result[1])
					var newSum = this.state.totalSum + result[0].FinalPrice
					var newProf = this.state.totalProfit + result[1]
					
					this.setState({ saleToBeAddedDetails: newArr , totalSum: newSum , totalProfit: newProf })
					
				} else {
					this.setState({ err: true })
					setTimeout(() => {
						this.setState({ err: false })
					}, 3000)
				}

	

			})
	}

	submitSaleFinal = async () => {

		// HERE BOTH TOTAL SALE AND TOTAL PROFIT ARE GIVEN SEPRATE STATES
		// ALSO SEPERATE PROFIT ARR IS CREATED FOR EACH ITEM

		var res = await fetch('http://localhost:3001/final-sale-add', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				data: this.state.saleToBeAddedDetails,
				profitArr: this.state.profitArr,
				total: this.state.totalSum,
				totalProf: this.state.totalProfit
			})
		})
		var result = await res.json()
		
		if (result === 'err' || isEmpty(result)) {
			this.setState({ err: true })
			setTimeout(() => {
				this.setState({ err: false })
			}, 3000)
		} else {

			this.setState({ totalSum: 0 , totalProfit: 0 , saleToBeAddedDetails: [] , profitArr: []})
			document.getElementById('saleAddedSucc').style.display = 'block'
			setTimeout(() => {
				document.getElementById('saleAddedSucc').style.display = 'none'
			}, 2000)
		}

		


	}
	removeSale = (e, cur) => {
		e.preventDefault()
		var arr = this.state.saleToBeAddedDetails
		var profArr = this.state.profitArr
		console.log(cur)
		var i = arr.indexOf(cur)
		var newProf = this.state.totalProfit - profArr[i]
		arr.splice(i, 1)
		profArr.splice(i, 1)
		console.log(profArr , 'iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii', i)
		var newSum = this.state.totalSum - cur.FinalPrice
		this.setState({ totalSum: newSum  , totalProfit: newProf})
		this.setState({ saleToBeAddedDetails: arr })
		this.setState({ profitArr: profArr })
	}

	render() {
		console.log(this.state)
		return (

			<div>
				<br />
				<br />
				<br />
				<br />
				<br />
				<ThemeProvider
					breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
					minBreakpoint="xxs"
				>
					<Form>
						<Container>
							<Row>
								<Form.Group className="mb-2" style={{ padding: '0', marginBottom: '0' }}>
									<Form.Control id="saleInput1" onKeyDown={(e) => this.createDrop(e)} onChange={() => { this.setState({ buttonDisabled: true }) }} type="text" placeholder="Enter Item Name" />
								</Form.Group>

								<ul className="ulStyle mb-2" style={{ display: this.state.searchedItem.length === 0 || !isEmpty(this.state.selectedItem) ? 'none' : 'block' }}>
									{
										this.state.searchedItem.map((cur, i) => {
											return (
												<li className="liStyle" onClick={(e) => { this.set_item_add_to_Sale(e) }}>{cur.name}</li>

											)
										})
									}
								</ul>
							</Row>

							<br />

							<Row>
								<Col style={{ padding: '0px 4px 0px 0px' }}>
									<Form.Group md={5} className="mb-2">
										<Form.Control id="saleInput2" onChange={(event) => { this.enteredSaleDet('quantity', event) }} type="text" placeholder="Quantity" />
									</Form.Group>
								</Col>

								<Col style={{ padding: '0px 0px 0px 4px' }}>
									<Form.Group md={5} className="mb-2">
										<Form.Control id="saleInput3" onChange={(event) => { this.enteredSaleDet('discount', event) }} type="text" placeholder="Extra Discount(Optional)" />
									</Form.Group>
								</Col>

							</Row>

							<Row>

								<div id="submitSale">
									<Button disabled={this.state.buttonDisabled} onClick={() => { this.submitSaleIndiv() }} variant="success">Add Sale</Button>{' '}
								</div>
								<br />
								<br />
								<Alert id='errorSale' key="danger" variant="danger"></Alert>

							</Row>

							<Row>
								<Table id="saleTable" striped size="lg" >
									<thead>
										<tr>
											<th>#</th>
											<th>Item Name</th>
											<th>Quantity</th>
											<th>Discount</th>
											<th>Sum</th>
											<th></th>
										</tr>
									</thead>
									<tbody id='saleTableBody' >
										{
											this.state.saleToBeAddedDetails.map((cur, i) => {
												console.log(cur.discount)
												return (
													<tr>
														<td>{i + 1}</td>
														<td>{cur.name}</td>
														<td>{cur.reqQuan}</td>
														<td>{cur.discount}</td>
														<td>{cur.FinalPrice}</td>
														<td><Button variant="danger" onClick={(e) => this.removeSale(e, cur)}>X</Button></td>
													</tr>
												)
											})
										}

									</tbody>
								</Table>
							</Row>

							<Row id="totalSale" style={{ display: this.state.saleToBeAddedDetails.length > 0 ? 'flex' : 'none' }}>
								<p>Total : <p id="totalSaleBody">{this.state.totalSum}</p></p>
								<Button onClick={() => { this.submitSaleFinal() }} id="finalSaleSubmit" variant="success">Confirm</Button>{' '}
							</Row>

							<br />

							<Row>
								<Alert id="saleAddedError1" key="danger" variant="danger" style={{ display: this.state.err ? 'block' : 'none' }}>
									An error occured. Please Try Again.
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
