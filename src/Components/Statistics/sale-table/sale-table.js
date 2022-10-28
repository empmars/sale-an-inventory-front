import  React , { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'
import './sale-table.css'


class SaleTable extends Component  {

    constructor() {
        super();
        this.state = {
            fromDate: '',
            toDate: '',
            fromDateSale: '',
            toDateSale: '',
            saleToFilter: ''

        }

    }



    addItemElementDate = (result) => {

          result.forEach((itemData)=>{

                for (let prop in itemData) {
                    if(itemData[prop] === null) {
                      itemData[prop] = '-'
                      console.log('hit')
                    }

                }





            var cutDate = new Date(itemData.date)
            cutDate = cutDate.toString()
            cutDate = cutDate.slice(3 , 15)



                    var id = itemData.id
                    var item = itemData.items
                    var quantity = itemData.quantity
                    var profit = itemData.profit
                    var sum = itemData.sum
                    var discount = itemData.discount
                    var total = itemData.total
                    var date = cutDate

                    const textId = document.createTextNode(id);
                    const textItem= document.createTextNode(item);
                    const textQuantity = document.createTextNode(quantity)
                    const textProfit = document.createTextNode(profit)
                    const textSum = document.createTextNode(sum)
                    const textDisc = document.createTextNode(discount)
                    const textTot = document.createTextNode(total)
                    const textDate = document.createTextNode(date)

                    const colId = document.createElement('td');
                    const colItem = document.createElement('td');
                    const colQuantity= document.createElement('td')
                    const colProfit = document.createElement('td')
                    const colSum = document.createElement('td')
                    const colDisc = document.createElement('td')
                    const colTot = document.createElement('td')
                    const colDate = document.createElement('td')

                    colId.appendChild(textId)
                    colItem.appendChild(textItem)
                    colQuantity.appendChild(textQuantity)
                    colProfit.appendChild(textProfit)
                    colSum.appendChild(textSum)
                    colDisc.appendChild(textDisc)
                    colTot.appendChild(textTot)
                    colDate.appendChild(textDate)

                    const tRow = document.createElement('tr')

                    tRow.appendChild(colId)
                    tRow.appendChild(colItem)
                    tRow.appendChild(colQuantity)
                    tRow.appendChild(colSum)
                    tRow.appendChild(colProfit)
                    tRow.appendChild(colDisc)
                    tRow.appendChild(colTot)
                    tRow.appendChild(colDate)



                      const tBody = document.getElementById('sale-filtered')

                    tBody.appendChild(tRow)





                })

      }

    addItemElementItem = (result) => {

      document.getElementById('salesItemTabHead').style.display = 'table-row'
      document.getElementById('salesDateTabHead').style.display = 'none';

            result.forEach((itemData)=>{
                  //
                  // for (let prop in itemData) {
                  //     if(itemData[prop] === null) {
                  //       itemData[prop] = '-'
                  //       console.log('hit')
                  //     }
                  //
                  // }





              var cutDate = new Date(itemData.date)
              cutDate = cutDate.toString()
              cutDate = cutDate.slice(3 , 15)



                      var id = itemData.id
                      var item = itemData.items
                      var quantity = itemData.quantity
                      var profit = itemData.profit
                      var sum = itemData.sum
                      var discount = itemData.discount
                      // var total
                      var date = cutDate

                      const textId = document.createTextNode(id);
                      const textItem= document.createTextNode(item);
                      const textQuantity = document.createTextNode(quantity)
                      const textProfit = document.createTextNode(profit)
                      const textSum = document.createTextNode(sum)
                      const textDisc = document.createTextNode(discount)
                      const textDate = document.createTextNode(date)

                      const colId = document.createElement('td');
                      const colItem = document.createElement('td');
                      const colQuantity= document.createElement('td')
                      const colProfit = document.createElement('td')
                      const colSum = document.createElement('td')
                      const colDisc = document.createElement('td')
                      const colDate = document.createElement('td')

                      colId.appendChild(textId)
                      colItem.appendChild(textItem)
                      colQuantity.appendChild(textQuantity)
                      colProfit.appendChild(textProfit)
                      colSum.appendChild(textSum)
                      colDisc.appendChild(textDisc)
                      colDate.appendChild(textDate)

                      const tRow = document.createElement('tr')

                      tRow.appendChild(colId)
                      tRow.appendChild(colItem)
                      tRow.appendChild(colQuantity)
                      tRow.appendChild(colSum)
                      tRow.appendChild(colProfit)
                      tRow.appendChild(colDisc)
                      tRow.appendChild(colDate)



                        const tBody = document.getElementById('sale-filtered')

                      tBody.appendChild(tRow)





                  })

        }

    createDrop = () => {

      			  var input, filter;
      			  input = document.getElementById('itemSaleFilter');
      			  filter = input.value.toUpperCase();



      				 fetch('http://localhost:3001/sale-item-search', {
      				  method: 'POST',
      				  headers: {'Content-Type': 'application/json'},
      				  body: JSON.stringify({
      				  		name: input.value
      				  })
      				})
      				.then(res=>res.json())
      				.then(result=>{

      					var col = document.getElementById('inputSaleCol')
                var ul = document.getElementById('matchesUL')



        			for(var i=0; i<result.length; i++) {

                      ul.style.display = 'block'
                      var li = document.createElement('li')
                      var btn = document.createElement('button')
                      li.setAttribute('class' , 'listFiltered')

                      li.appendChild(btn)
                      ul.appendChild(li)
                      col.appendChild(ul)
                      li.style.display = 'none'
                      btn.onclick = (event) => {
                        console.log(btn)
                        ul.style.display = 'none';
                        input.value = event.target.innerText;
                        this.setState({saleToFilter: event.target.innerText})
                      }

        					}

              var getLI = document.getElementsByTagName('li')

              for(var i=0; i<result.length;i++) {

                    getLI[i].children[0].innerHTML = result[i].name
                    getLI[i].style.display = 'block';

                  }

              if(input.value.length === 0) {
                var ul = document.getElementById('matchesUL')
                ul.style.display = 'none'
              }




      				})

      // REMOVE REPEATITION

            var li = document.getElementsByClassName('listFiltered')
            for (let current in li) {

              // if(li[current].children === undefined ) {
              //   console.log()
              // } else {
                for (var i=0 ; i < li.length ; i++) {
                  var text1 = li[current].children[0].innerText;
                  var text2 = li[i].children[0].innerText
                    if(text1 ===  text2) {
                          li[current].style.display = 'none';
                        if (li.length === 0) {
                          li[current].style.display = ''
                        }

                    }

                }


          }

          }


    setDateState = (date , event) => {

        if(date === 'from') {

              this.setState({fromDate: event.target.value})


        } else if (date === 'to') {


            this.setState({toDate: event.target.value})
            console.log(this.state)

        }

    }


    filterSaleDate = () => {


            var { fromDate , toDate } = this.state;
          console.log(this.state)

          if(fromDate.length > 0 && toDate.length > 0) {



                fetch('http://localhost:3001/filter-sale-date', {
                  method: 'post',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({

                    dates: this.state

                  })

                }).then(res=>res.json())
                .then(result=>{

                  document.getElementById('salesItemTabHead').style.display = 'none';
                  document.getElementById('salesDateTabHead').style.display = '';
                  document.getElementById('sale-filtered').replaceChildren()
                  if(result.length === 0) {
                      document.getElementById('noFoundError').style.display = 'block'
                      setTimeout( ()=>{document.getElementById('noFoundError').style.display = 'none'} , 2000)
                  } else {

                      this.addItemElementDate(result)

                  }

                })

          }


    }

    clickFilterHead = () => {


      document.getElementById('from').value = '';
      document.getElementById('to').value = '';
      // document.getElementById('before').value = '';
      document.getElementById('sale-filtered').replaceChildren()

    }



    submitSaleToFilter = () => {

      var { saleToFilter } = this.state;
      console.log(document.getElementById('itemSaleFilter'))

      var fromDateSale = document.getElementById('fromDateSale')
      var toDateSale = document.getElementById('toDateSale')

        if(saleToFilter.length > 0) {
            fromDateSale.disabled = false;
            toDateSale.disabled = false;
        }

    }

    setSaleFilterDate = (date , event) => {

      if(date === 'fromDateSale') {

            this.setState({fromDateSale: event.target.value})


      } else if (date === 'toDateSale') {


          this.setState({toDateSale: event.target.value})
          console.log(this.state)

      }

    }

    enterDateFilterItem  = () => {



      var { saleToFilter , fromDateSale , toDateSale } = this.state

      console.log(saleToFilter , fromDateSale , toDateSale)




    fetch('http://localhost:3001/filter-sale-item', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({

        from: fromDateSale,
        to: toDateSale,
        item: saleToFilter

      })

    }).then(res=>res.json())
    .then(result=>{
      document.getElementById('salesDateTabHead').style.display = 'none';
      document.getElementById('salesItemTabHead').style.display = '';
      document.getElementById('sale-filtered').replaceChildren()

        if(result.length === 0) {
            document.getElementById('noFoundError').style.display = 'block'
            setTimeout( ()=>{document.getElementById('noFoundError').style.display = 'none'} , 2000)
        } else {

            this.addItemElementItem(result)

        }
    })


  }

    render() {

        return(

            <>

            <Container>

                  <Accordion>
                        <Accordion.Item eventKey="0"  className="FilterHeading" >
                          <Accordion.Header onClick={()=>this.clickFilterHead()}>Filter By: Date</Accordion.Header>
                          <Accordion.Body>
                          <div id="dateFilterCont">
                              <div>
                                <label class="labelDate" for="from">From</label>
                                <input onBlur={(event)=>{this.setDateState( 'from' , event)}} type="date" className="dateSale" id="from" name="from" />
                                <label class="labelDate" for="to">To</label>
                                <input onBlur={(event)=>{this.setDateState( 'to' , event)}} type="date" className="dateSale" id="to" name="to" />
                              </div>
                          </div>

                          <br/>

                          <div id="btnDateFilter">
                          <Button variant="primary" type="button" onClick={()=>{ this.filterSaleDate() }}>
                                    Search
                            </Button>
                          </div>


                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1"  className="FilterHeading" >
                          <Accordion.Header className="FilterHeading" onClick={()=>this.clickFilterHead()}>Filter By: Item</Accordion.Header>
                          <Accordion.Body>



                              <Container id="sale-Item-Filter-Cont">

                                <br/>
                                  <Row id="sale-item-filter-input">

                                      <Col id="inputSaleCol" md="4">
                                        <Form.Group className="mb-2">
                                          <Form.Control id="itemSaleFilter" type="text" placeholder="Enter Item Name" onChange={(event)=>{this.createDrop()}}/>
                                        </Form.Group>
                                        <ul id="matchesUL"></ul>
                                      </Col>

                                      <Col md="1" >
                                        <Button variant="primary" type="button" onClick={()=>{this.submitSaleToFilter()}}>
                                                  Search
                                          </Button>

                                      </Col>


                                  </Row>

                                  <br/>

                                  <Row className="justify-content-md-center">

                                      <Col md="5">
                                      <label class="labelDate" for="fromDateSale">From</label>
                                      <input disabled = 'true' onBlur={(event)=>{this.setSaleFilterDate( 'fromDateSale' , event)}} type="date" className="dateSale" id="fromDateSale" name="fromDateSale" />
                                      <label class="labelDate" for="toDateSale">To</label>
                                      <input disabled = 'true' onBlur={(event)=>{this.setSaleFilterDate( 'toDateSale' , event)}} type="date" className="dateSale" id="toDateSale" name="toDateSale" />

                                      </Col>

                                  </Row>

                                  <br/>
                                  <Row  className="justify-content-md-center">
                                    <Col md="5">
                                          <Button onClick={()=>{this.enterDateFilterItem()}} id="btnSaleFilter" variant="success" type="button">
                                                    Confirm
                                          </Button>
                                    </Col>
                                  </Row>
                                  <br/>
                              </Container>

                          </Accordion.Body>
                        </Accordion.Item>
                  </Accordion>
            </Container>


                  <br/>
                  <br/>

              <Container>

                  <Row>
                  <Table striped bordered hover>
                      <thead>
                        <tr id="salesDateTabHead">
                          <th>#</th>
                          <th>Item</th>
                          <th>Quantity</th>
                          <th>Sum</th>
                          <th>Profit</th>
                          <th>Discount</th>
                          <th>Total</th>
                          <th>Date</th>
                        </tr>
                        <tr id="salesItemTabHead">
                          <th>#</th>
                          <th>Item</th>
                          <th>Quantity</th>
                          <th>Sum</th>
                          <th>Profit</th>
                          <th>Discount</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody id="sale-filtered">

                      </tbody>
                    </Table>

                  </Row>

                  <Row>
                  <Alert id="noFoundError" key='secondary' variant='secondary'>
                      No Results Found.
                    </Alert>
                  </Row>

              </Container>

            </>

        )

    }


}


// <Col md="4">
//   <Form.Group className="mb-2">
//     <Form.Control  type="text" placeholder="Enter Item Name" onChange={(event)=>{this.setSaleFiltItem(event)}}/>
//   </Form.Group>
// </Col>
//
// <Col md="1" >
//   <Button variant="primary" type="button" onClick={()=>{this.submitSaleToFilter()}}>
//             Search
//     </Button>
//
// </Col>
// </Row>
//
// <br/>
//
// <Row id="sale-Item-Date">
//
// <Col md="6">
//   <div>
//     <label htmlFor="before-item"  class="label-item">From</label>
//     <input
//     onBlur={(event)=>{this.enterDateFilterItem( 'before-item' , event)}}
//      disabled = "true" type="date" className="dateSale" id="before-item" name="before-item"/>
//      <label htmlFor="to-item" class="label-item">To</label>
//      <input
//      onBlur={(event)=>{this.enterDateFilterItem( 'before-item' , event)}}
//       disabled = "true" type="date" className="dateSale" id="to-item" name="to-item"/>
//   </div>
// </Col>

export default SaleTable;
