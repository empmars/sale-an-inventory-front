import React from 'react'
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { isEmpty } from 'lodash'
import './edit.css';


class EditItem extends React.Component {

	constructor() {
		super();
		this.state = {
			modalShow: false,
			editItemSearchField: '',
			editQuan: '',
			editPrice: '',
			editProfit: '',
			editExpiry: '',
			editSearchList: [],
			item_To_Edit_Is_Selected: false,
			error: 'error'
		}

	}



	onHide = () => { this.setState({ modalShow: false }) }

	addItem = (field, event) => {
		if (field === 'quantity') {
			this.setState({ editQuan: Number(event.target.value) })
		} else if (field === 'price') {
			this.setState({ editPrice: Number(event.target.value) })
		} else if (field === 'profit') {
			this.setState({ editProfit: Number(event.target.value) })
		} else if (field === 'expiry') {
			this.setState({ editExpiry: event.target.value })
		}

	}


	checkItem = async (event) => {
		this.setState({ item_To_Edit_Is_Selected: false })


		if (event.code === 'Enter') {
			event.preventDefault()
			if (isEmpty(event.target.value)) {

				this.setState({ editSearchList: [] })
			} else {
				var res = await fetch('https://sale-and-inventory-backend.vercel.app/check-item-edit', {
					method: 'post',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						name: event.target.value
					})
				})

				var res = await res.json()
				this.setState({ editSearchList: res })
			}



		}
	}

	itemSelectedForEdit = (e) => {
		document.getElementById('itemEnterToEditField').value = e.target.textContent
		this.setState({ item_To_Edit_Is_Selected: true })
		document.querySelectorAll('.emptyFieldClassInEdit').forEach((cur) => {

			cur.textContent = ''
			cur.value = ''


		})
		this.setState({
			editQuan: '',
			editPrice: '',
			editProfit: '',
			editExpiry: '',
		})
	}

	submitClick = async (event) => {
		event.preventDefault();
	
		var editName = document.getElementById('itemEnterToEditField').value
		console.log(this.state)
		if (!isEmpty(editName)) {

			var res = await fetch('https://sale-and-inventory-backend.vercel.app/edit-item', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: editName,
					quantity: this.state.editQuan,
					price: this.state.editPrice,
					profit: this.state.editProfit,
					expiry: this.state.editExpiry
				})
			})

			var res = await res.json()
			if (res === 'success') {
				document.getElementById('successMsg').style.display = 'block'
				setTimeout(() => {
					document.getElementById('successMsg').style.display = 'none'
				}, 3000)
			} else {
				document.getElementById('errorMsg').style.display = 'block'
				setTimeout(() => {
					document.getElementById('errorMsg').style.display = 'none'
				}, 3000)
			}
		}

	}

	render() {

		return (
			<>

				<div id="add-button-cont">
					<Button variant="primary" onClick={() => this.setState({ modalShow: true })}>
						Edit Item
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
							Edit Item
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>

						<Form>
							<Form.Group className="mb-3">

								<Form.Control id="itemEnterToEditField" onKeyDown={(event) => this.checkItem(event)} name="name" type="name" placeholder="Enter Product Name" />
								<ul className="ulStyle"
									style={{ display: isEmpty(this.state.editSearchList) || this.state.item_To_Edit_Is_Selected ? 'none' : 'block' }}>
									{
										this.state.editSearchList.map((cur, i) => {
											return (

												<li className="liStyle" onClick={(e) => this.itemSelectedForEdit(e)}>{cur.name}</li>
											)

										})
									}
								</ul>

							</Form.Group>

							<Form.Group className="mb-3" style={{ display: this.state.item_To_Edit_Is_Selected ? 'block' : 'none' }}>

								<Form.Control className="emptyFieldClassInEdit" onChange={(event) => this.addItem('quantity', event)} name="quantity" type="quantity" placeholder="Quantity" />

							</Form.Group>

							<Form.Group className="mb-3" style={{ display: this.state.item_To_Edit_Is_Selected ? 'block' : 'none' }}>

								<Form.Control className="emptyFieldClassInEdit" onChange={(event) => this.addItem('price', event)} name="price" type="price" placeholder="Price" />

							</Form.Group>

							<Form.Group className="mb-3" style={{ display: this.state.item_To_Edit_Is_Selected ? 'block' : 'none' }}>

								<Form.Control className="emptyFieldClassInEdit" onChange={(event) => this.addItem('profit', event)} name="profit" type="profitPerc" placeholder="Profit Percentage" />

							</Form.Group>

							<Form.Group className="mb-3" >

								<Form.Control className="emptyFieldClassInEdit" onChange={(event) => this.addItem('expiry', event)} name="expiry" type="date" placeholder="Expiry" style={{ display: this.state.item_To_Edit_Is_Selected ? 'block' : 'none' }} />
								<Form.Text id="errorMsg" style={{display: 'none'}}>An error occured. Please try again.</Form.Text>
								<Form.Text id="successMsg" style={{display: 'none'}}>Item Edited.</Form.Text>
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

export default EditItem;
