import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './search.css'



class SearchItem extends React.Component {

	constructor() {
		super();
		this.state = {
			itemEntered: '',
		}

	}

	itemEntered = (event) => {

		fetch('http://localhost:3001/table', {
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
								name: event.target.value
					})

		})
		.then(res=>res.json())
		.then(result=>{


			if(result.length) {

				console.log(result)
				this.setState({itemEntered: event.target.value})
				var input, filter;
				input = document.getElementById('searchInpt');
				filter = input.value.toUpperCase();

				var col = document.getElementById('searchRowCol')
				var ul = document.getElementById('matchesULedit')
				ul.style.display = 'block'
				ul.replaceChildren()


				for(var i=0; i<result.length; i++) {
								var li = document.createElement('li')
								var btn = document.createElement('button')
								li.setAttribute('class' , 'listFilteredEdit')

								li.appendChild(btn)
								ul.appendChild(li)
								col.appendChild(ul)
								btn.onclick = (event) => {
									event.preventDefault()
									console.log(btn)
									ul.style.display = 'none';
									input.value = event.target.innerText;
									this.setState({itemEntered: event.target.innerText})
								}

						}

				var getLI = document.getElementsByClassName('listFilteredEdit')

				for(var i=0; i<result.length;i++) {

							getLI[i].children[0].innerHTML = result[i].name

					}



					// REMOVE REPEATITION
					//
					// var li = document.getElementsByClassName('listFilteredEdit')
					// console.log(li)
					// for (let current in li) {
					// 		for (var i=0 ; i < li.length ; i++) {
					// 						var text1 = li[current].children[0].innerText;
					// 						var text2 = li[i].children[0].innerText
					// 							if(text1 ===  text2) {
					// 										li[current].style.display = 'none';
					// 									if (li.length === 0) {
					// 										li[current].style.display = ''
					// 									}
					//
					// 							}
					//
					// 					}
					// 		}
				}
		})

	}

	removeEnterRef = (event) => {
		if(event.key === 'Enter') {
			event.preventDefault()
		}
	}


	render() {

		const { itemEntered } = this.state;

			return(
				<ThemeProvider
					  breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
					  minBreakpoint="xxs"
				>
					<Form>
					<Container>
						<Row>
								<h2 id="editHead">Edit Items</h2>
						</Row>
						<br/>
						<hr/>
						<br/>
						<Row id="searchRow">
						  <Col id="searchRowCol" md={8}>
						      <Form.Group className="mb-2">
						        <Form.Control onKeyDown = {(event)=>{this.removeEnterRef(event)}}  onChange={(event)=>this.itemEntered(event)} id="searchInpt" type="text" placeholder="Search Item by Name" />
						      </Form.Group>
									<ul id="matchesULedit"></ul>
					      </Col>
					      <Col md={2}>
							  <Button
							  onClick={()=>this.props.fetchItems(this.state.itemEntered)}
							   variant="primary" type="button">
							        Search
							  </Button>
						  </Col>
						</Row>
					</Container>
				    </Form>
				 </ThemeProvider>


				)
			}
}

export default SearchItem;
