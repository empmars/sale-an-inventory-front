import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './nav.css';

const Navigation = () => {
	return(
		<Navbar id="first" bg="light">
	        <Container>
	          <Nav variant="tabs" defaultActiveKey="/home">
		      <Nav.Item >
		        <Nav.Link href="/home" id="link">Inventory</Nav.Link>
		      </Nav.Item>
		      <Nav.Item >
		        <Nav.Link eventKey="link-1"  id="link">Sale</Nav.Link>
		      </Nav.Item>
		    </Nav>
	        </Container>
      	</Navbar>
		)
}

export default Navigation;