import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Row } from 'react-bootstrap';
import './nav.css';
import AddItem from '../add/add.js';
import EditItem from '../edit/edit.js';

const Navigation = ({ changeDir }) => {
	return (
		<Navbar id="first" bg="light">
			<Container>
				<Nav variant="tabs" defaultActiveKey="#" className="justify-content-between" id="navigationID" style={{ width: '100%'}}>

					<Nav.Item style={{display: 'flex'}}>
						<Nav.Item >
							<Nav.Link style ={{padding: '15px 50px'}} onClick={() => changeDir('inventory')} href="#" id="link">Inventory</Nav.Link>
						</Nav.Item>
						<Nav.Item >
							<Nav.Link style ={{padding: '15px 50px'}} onClick={() => changeDir('sale')} eventKey="link-1" id="link">Sale</Nav.Link>
						</Nav.Item>
						<Nav.Item >
							<Nav.Link style ={{padding: '15px 50px'}} onClick={() => changeDir('statistics')} eventKey="link-2" id="link">Statistics</Nav.Link>
						</Nav.Item>
					</Nav.Item>

					<Nav.Item style={{display: 'flex' , gap: '6px' , marginBottom: '4px' , justifyContent: 'center'}}>
						<AddItem />
						<EditItem />
					</Nav.Item>
				</Nav>
			</Container>
		</Navbar>
	)
}

export default Navigation;
