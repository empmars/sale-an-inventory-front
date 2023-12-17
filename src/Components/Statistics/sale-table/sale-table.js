import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'
import { isEmpty, isNull } from 'lodash'
import './sale-table.css'


class SaleTable extends Component {

  constructor() {
    super();
    this.state = {
      itemOne: false,
      itemTwo: false,
      sales: [],
      fromDate: '',
      toDate: '',
      filterTwoFrom: '',
      filterTwoTo: '',
      searchedItem: [],
      selectedItem: '',
      totalSale1: 0,
      totalProf1: 0,
      totalSale2: 0,
      totalProf2: 0,
      buttonDisabled: true

    }

  }

  // COMMON CODE BETWEEN BOTH FILTERS

  clickAccordionHead = () => {


    document.getElementById('from').value = '';
    document.getElementById('to').value = '';
    this.setState({ fromDate: '', toDate: '' })
    this.setState({
      itemOne: false,
      itemTwo: false,
      sales: [],
      fromDate: '',
      toDate: '',
      filterTwoFrom: '',
      filterTwoTo: '',
      searchedItem: [],
      selectedItem: '',
      totalSale1: 0,
      totalProf1: 0,
      totalSale2: 0,
      totalProf2: 0,

    })

  }

  // FIRST FILTER / ITEM ONE IN STATE CODE

  setDateState = (date, event) => {

    if (date === 'from') {

      this.setState({ fromDate: event.target.value })


    } else if (date === 'to') {


      this.setState({ toDate: event.target.value })
      console.log(this.state)

    }

  }


  filterSaleDate = async () => {

    var { fromDate, toDate } = this.state;

    var req = await fetch('http://localhost:3001/filter-sale-date', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({

        fromDate: fromDate,
        toDate: toDate

      })

    })
    var req2 = await req.json()
    if (req2 !== 'err') {

      this.setState({
        sales: req2[0],
        totalSale1: req2[1],
        totalProf1: req2[2],
        itemOne: true,
        itemTwo: false
      })
    }

  }

  // SECOND FILTER / ITEM TWO IN STATE CODE

  createDrop = (e) => {

    if (e.code === 'Enter') {

      fetch('http://localhost:3001/check-item-statistics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: e.target.value
        })
      })
        .then(res => res.json())
        .then(result => {
          console.log(result)

          if (!isEmpty(result)) {
            this.setState({ selectedItem: '' })
            this.setState({ searchedItem: result })

          } else {
            this.setState({ buttonDisabled: true })

          }
        })

    }


  }


  set_item_add_to_Sale = (e) => {
    document.getElementById('saleInput1').value = e.target.textContent
    this.setState({ selectedItem: e.target.textContent })
  }

  setDatesInFilterTwo = (date, event) => {

    if (date === 'fromDateSale') {

      this.setState({ filterTwoFrom: event.target.value })


    } else if (date === 'toDateSale') {


      this.setState({ filterTwoTo: event.target.value })


    }

  }

  submitFilterTwo = async () => {

    var req = await fetch('http://localhost:3001/filter-two-final', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({

        from: this.state.filterTwoFrom,
        to: this.state.filterTwoTo,
        item: this.state.selectedItem

      })

    })

    var req2 = await req.json()
    if (req2 !== 'err') {
      this.setState({
        sales: req2[0],
        totalSale2: req2[1],
        totalProf2: req2[2],
        itemOne: false,
        itemTwo: true

      })
      console.log('sssssssssssssssssssss')
    }




  }

  render() {



    return (

      <>

        <Container>

          <Accordion>
            <Accordion.Item eventKey="0" className="FilterHeading" >
              <Accordion.Header onClick={() => this.clickAccordionHead()}>Filter By: Date</Accordion.Header>
              <Accordion.Body>
                <div id="dateFilterCont">
                  <div>
                    <label class="labelDate" for="from">From</label>
                    <input onBlur={(event) => { this.setDateState('from', event) }} type="date" className="dateSale" id="from" name="from" />
                    <label class="labelDate" for="to">To</label>
                    <input onBlur={(event) => { this.setDateState('to', event) }} type="date" className="dateSale" id="to" name="to" />
                  </div>
                </div>

                <br />

                <div id="btnDateFilter">
                  <Button variant="primary" type="button" disabled={!isEmpty(this.state.fromDate) && !isEmpty(this.state.toDate) ? false : true} onClick={() => { this.filterSaleDate() }}>
                    Search
                  </Button>
                </div>


              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" className="FilterHeading" >
              <Accordion.Header className="FilterHeading" onClick={() => this.clickAccordionHead()}>Filter By: Item</Accordion.Header>
              <Accordion.Body>



                <Container id="sale-Item-Filter-Cont">

                  <br />
                  <Row id="sale-item-filter-input">

                    <Form.Group style={{ padding: '0', marginBottom: '0' }}>
                      <Form.Control id="saleInput1" onKeyDown={(e) => this.createDrop(e)} onChange={() => { this.setState({ selectedItem: '', searchedItem: [] }) }} type="text" placeholder="Enter Item Name" />
                    </Form.Group>
                    <ul className="ulStyle mb-2" style={{ display: this.state.searchedItem.length === 0 || !isEmpty(this.state.selectedItem) ? 'none' : 'block' }}>
                      {
                        this.state.searchedItem.map((cur, i) => {
                          return (
                            <li className="liStyle" onClick={(e) => {this.set_item_add_to_Sale(e)}}>{cur}</li>

                          )
                        })
                      }
                    </ul>

                  </Row>

                  <br />

                  <Row className="justify-content-md-center">

                    <Col md="5" style={{ width: 'fit-content' }}>
                      <label class="labelDate" for="fromDateSale">From</label>
                      <input onBlur={(event) => { this.setDatesInFilterTwo('fromDateSale', event) }} type="date" className="dateSale" id="fromDateSale" name="fromDateSale" />
                      <label class="labelDate" for="toDateSale">To</label>
                      <input onBlur={(event) => { this.setDatesInFilterTwo('toDateSale', event) }} type="date" className="dateSale" id="toDateSale" name="toDateSale" />

                    </Col>

                  </Row>

                  <br />
                  <Row className="justify-content-md-center">
                    <Col md="5" style={{ width: 'fit-content' }}>
                      <Button onClick={() => { this.submitFilterTwo() }} id="btnSaleFilter" variant="success" type="button" disabled={!isEmpty(this.state.filterTwoFrom) && !isEmpty(this.state.filterTwoTo) && !isEmpty(this.state.selectedItem) ? false : true}
                        style={{ padding: '10px 30px' }}
                      >
                        Confirm
                      </Button>
                    </Col>
                  </Row>
                  <br />
                </Container>

              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>


        <br />
        <br />

        <Container>

          <Row>
            <Table bordered hover>
              <thead>
                <tr id="salesDateTabHead" style={{ display: !this.state.itemTwo ? 'table-row' : 'none' }}>
                  <th>#</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Profit</th>
                  <th>Discount</th>
                  <th>Total Price</th>
                  <th>Total Profit</th>
                  <th>Date</th>
                </tr>
                <tr id="salesItemTabHead" style={{ display: !this.state.itemTwo ? 'none' : 'table-row' }}>
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
                {
                  this.state.sales.map((cur, i) => {
                    if (this.state.itemOne) {

                      return (
                        <tr>
                          <td>{cur.id}</td>
                          <td>{cur.name}</td>
                          <td>{cur.quantity}</td>
                          <td>{isNull(cur.total_sale) ? cur.price : ''}</td>
                          <td>{cur.profit}</td>
                          <td>{cur.discount}</td>
                          <td style={{ padding: !isNull(cur.total_sale) ? '20px' : '10px', backgroundColor: !isNull(cur.total_sale) ? '#c7c7c7' : 'white' }}>{cur.total_sale}</td>
                          <td style={{ padding: !isNull(cur.total_profit) ? '20px' : '10px', backgroundColor: !isNull(cur.total_profit) ? '#c7c7c7' : 'white' }}>{cur.total_profit}</td>
                          <td style={{ padding: !isNull(cur.total_profit) ? '20px' : '10px' }}>{cur.date}</td>
                        </tr>
                      )
                    } else if (this.state.itemTwo) {
                      return (
                        <tr>
                          <td>{cur.id}</td>
                          <td>{cur.name}</td>
                          <td>{cur.quantity}</td>
                          <td>{cur.price}</td>
                          <td>{cur.profit}</td>
                          <td>{cur.discount}</td>
                          <td>{cur.date}</td>
                        </tr>
                      )
                    }

                  })
                }
              </tbody>
            </Table>

          </Row>

          <Row>
            <Col md='5'>
              <Row className='justify-content-md-center'>
                <h4 style={{ width: 'fit-content' }}>
                  Total Sale:{this.state.itemTwo ? this.state.totalSale2 : this.state.totalSale1}
                </h4>
              </Row>
            </Col>

            <Col md='5'>
              <Row className='justify-content-md-center'>
                <h4 style={{ width: 'fit-content' }}>
                  Total Profit:{this.state.itemTwo ? this.state.totalProf2 : this.state.totalProf1}
                </h4>
              </Row>
            </Col>
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
