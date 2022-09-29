import React from 'react'
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './add.css';

 
const AddItem =() => {



		const [modalShow, setModalShow] = React.useState(false);
		const [ItemData, setItemData] = React.useState({});
		

		const addItem = (event) =>{
		  const name = event.target.name;
	    const value = event.target.value;
	    setItemData(values => ({...values, [name]: value}));
			  
	    console.log(ItemData)
	  
 		}


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
			        
			        <Form.Control onChange={addItem} name="name" type="name" placeholder="Enter Product Name" />
			        
			      </Form.Group>

			      <Form.Group className="mb-3">
			        
			        <Form.Control onChange={addItem} name="quantity" type="quantity" placeholder="Quantity" />

			      </Form.Group>

			      <Form.Group className="mb-3">
			        
			        <Form.Control onChange={addItem} name="price" type="price" placeholder="Price" />
			        
			      </Form.Group>

			      <Form.Group className="mb-3">
			        
			        <Form.Control onChange={addItem} name="profit" type="profitPerc" placeholder="Profit Percentage" />
			        
			      </Form.Group>

			      <Form.Group className="mb-3">
			        
			        <Form.Control onChange={addItem} name="expiry" type="date" placeholder="Expiry" />
			        
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
	
		return(
				<>
				      <br/>
				      <br/>
				      <br/>
				      <br/>
				      <div  id="add-button">
					      <Button variant="primary" onClick={() => setModalShow(true)}>
					        Add Item
					      </Button>
				      </div>


				      <MyVerticallyCenteredModal
				        show={modalShow}
				        onHide={() => setModalShow(false)}
				      />
		    	</>
    	)
	

}

export default AddItem;