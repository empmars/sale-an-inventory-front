import React , { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import './table.css'

const Itemtable = ({ item }) =>{

console.log(item)
		
	useEffect( function enterDetail() {
		document.getElementById('Itemtable').style.display = 'none';
		document.getElementById('itemNotExst').style.display = 'none';
				if (item === '') {
					console.log('')
				} 
				else if(item === 'Item does not exist.') {
					document.getElementById('itemNotExst').style.display = 'block';
					
				} 
				else {
					document.getElementById('Itemtable').style.display = 'table';
					
				}

		
		

	})

	const deleteItem = (item) => {
			document.getElementById('Itemtable').style.display = 'none';
			document.getElementById('deleteConfirm').style.display = 'flex';
		}

	const noDel = (item) => {
		document.getElementById('Itemtable').style.display = 'table';
		document.getElementById('deleteConfirm').style.display = 'none';
	}
	
	const yesDel = (item) => {
		console.log(item)
		fetch('https://sale-and-inventory-backend.vercel.app/del-item', {
			  method: 'PUT',
			  headers: {'Content-Type': 'application/json'},
			  body: JSON.stringify({
			  	name: item.name
			  })
		})
		.then(res=>res.json())
		.then(result=>{
			if(result === 'success') {
				document.getElementById('deleteConfirm').style.display = 'none';
				document.getElementById('deleted').style.display = 'block';

			}
		})

	}

	return(
		<>

				<Alert id='itemNotExst' key="danger" variant="danger">
		          Item does not exist.
		        </Alert>

				<Table responsive striped bordered hover id="Itemtable" >
				      <thead>
				        <tr>
				          <th>id</th>
				          <th>Name</th>
				          <th>Quantity</th>
				          <th>Price</th>
				          <th>Profit</th>
				          <th>Expiry</th>
				        </tr>
				      </thead>
				      <tbody>
				        <tr>
				          <td> {item.id} </td>
				          <td> {item.name} </td>
				          <td> {item.quantity} </td>
				          <td> {item.price} </td>
				          <td> {item.profit} </td>
				          <td > {item.expiry} </td>
				          <td><Button variant="danger" onClick={()=>{deleteItem()}} >Delete</Button>{' '}</td>
				        </tr>
				      </tbody>
				</Table>

				<div id="deleteConfirm">
				<Button onClick={()=>{yesDel(item)}}   variant="danger">Yes</Button>{' '}
				<Button onClick={()=>{noDel()}} variant="secondary">No</Button>{' '}
				</div>
				<Alert id='deleted' key="danger" variant="danger">
		          Item Deleted.
		        </Alert>
		</>
		)
}

export default Itemtable;