import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './search.css'



const SearchItem = () => {
	return(
		<ThemeProvider
			  breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
			  minBreakpoint="xxs"
		>
			<Form>
			<Container>
				<Row id="searchRow">
				  <Col md={8}>
				      <Form.Group className="mb-2">
				        <Form.Control id="searchInpt" type="text" placeholder="Search Item by Name" />
				      </Form.Group>
			      </Col>
			      <Col md={2}>
					  <Button id="searchBtn" variant="primary" type="submit">
					        Search
					  </Button>
				  </Col>
				</Row>
			</Container>
		    </Form>
		 </ThemeProvider>


		)
} 

export default SearchItem;