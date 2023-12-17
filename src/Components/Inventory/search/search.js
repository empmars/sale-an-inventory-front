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
import { isEmpty, isNull } from 'lodash'
import './search.css'



class SearchItem extends React.Component {

	constructor() {
		super();
		this.state = {
			itemEntered: '',
			searchedItem: [],
			selectedItem: '',
			responseData: [],
			error: false
		}

	}


	itemEntered = (event) => {
		event.preventDefault()

		fetch('http://localhost:3001/list-search-edit', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: this.state.selectedItem
			})

		})
			.then(res => res.json())
			.then(result => {
				
				if (result !== 'err') {

					this.props.Custom_Name_Set(result)
					this.setState({ error: false })





				} else {
					this.setState({ error: true })
				}
			})

	}

	updateName = (event) => {
		event.preventDefault()
		this.setState({ itemEntered: event.target.value , selectedItem: '' , searchedItem: []})
	}

	createDrop = (e) => {

		if (e.code === 'Enter') {

			e.preventDefault()

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
						this.setState({ selectedItem: ''})
						this.setState({ searchedItem: result })

					}
				})

		}


	}

	set_item_add_to_Sale = (e) => {
		document.getElementById('searchInpt').value = e.target.textContent
		this.setState({ selectedItem: e.target.textContent })
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
									<Form.Control onChange={(event) => { this.updateName(event) }} onKeyDown={(e) => this.createDrop(e)} id="searchInpt" type="text" placeholder="Search Item by Name" />
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

							</Col>
							<Col md={2}>
								<Button
									onClick={(event) => this.itemEntered(event)}
									variant="primary" type="button"
									disabled={isEmpty(this.state.searchedItem) ? true : false}
									>
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
