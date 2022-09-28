import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './add.css';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
     <Form>
	      <Form.Group className="mb-3">
	        
	        <Form.Control type="name" placeholder="Enter Product Name" />
	        
	      </Form.Group>

	      <Form.Group className="mb-3">
	        
	        <Form.Control type="quantity" placeholder="Quantity" />

	      </Form.Group>

	      <Form.Group className="mb-3">
	        
	        <Form.Control type="price" placeholder="Price" />
	        
	      </Form.Group>

	      <Form.Group className="mb-3">
	        
	        <Form.Control type="profitPerc" placeholder="Profit Percentage" />
	        
	      </Form.Group>

	      <Form.Group className="mb-3">
	        
	        <Form.Control type="date" placeholder="Expiry" />
	        
	      </Form.Group>
	      <div id="submitButton">
		      <Button variant="primary" type="submit">
		        Submit
		      </Button>
	      </div>
    </Form>





      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

class AddItem extends React.Component {
	constructor() {
		super();
		this.state = {
			modalShow: false
		}
	}


	render() {
		return(
				<>
				      <br/>
				      <br/>
				      <br/>
				      <br/>
				      <div  id="add-button">
					      <Button variant="primary" onClick={() => this.setState({modalShow :true})}>
					        Add Item
					      </Button>
				      </div>


				      <MyVerticallyCenteredModal
				        show={this.state.modalShow}
				        onHide={() => this.setState({modalShow :false})}
				      />
		    	</>
    	)
	}

}

export default AddItem;