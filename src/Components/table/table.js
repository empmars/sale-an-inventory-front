import React , { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Table from 'react-bootstrap/Table';
import './table.css'

const Itemtable = ({ item }) =>{

	useEffect( function enterData() {

		if(item === '') {
			console.log('')
		} else {
			console.log(item)
			document.getElementById('Itemtable').style.display = 'table'

		}

	} 

	, [])

	return(
				<Table responsive striped id="Itemtable" >
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
				        </tr>
				      </tbody>
				</Table>

		)
}

export default Itemtable;