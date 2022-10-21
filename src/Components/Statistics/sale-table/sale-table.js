import  React , { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './sale-table.css'


class SaleTable extends Component  {

    constructor() {
        super();
        this.state = {
            saleToFilter: ''

        }

    }



    addItemElement = (result) => {



          result.forEach((itemData)=>{

            var cutDate = new Date(itemData.date)
            cutDate = cutDate.toString()
            cutDate = cutDate.slice(3 , 15)



                    var id = itemData.id
                    var item = itemData.items
                    var quantity = itemData.quantity
                    var profit = itemData.profit
                    var sum = itemData.sum
                    var discount = itemData.discount
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


    filterSaleDate = (date , event) => {

            console.log(document.getElementsByClassName('FilterHeading'))

              if(date === 'before') {

                    document.getElementById('same').value = '';
                    document.getElementById('after').value = '';


              } else if (date === 'same') {

                document.getElementById('before').value = '';
                document.getElementById('after').value = '';
                  console.log('s')

              } else if (date === 'after') {
                document.getElementById('same').value = '';
                document.getElementById('before').value = '';
                  console.log('a')

              }

              console.log(event.target.value)

            fetch('http://localhost:3001/filter-sale-date', {
              method: 'post',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({

                date: date,
                value: event.target.value

              })

            }).then(res=>res.json())
            .then(result=>{
                document.getElementById('sale-filtered').replaceChildren()
                this.addItemElement(result)

            })




    }

    clickFilterHead = () => {


      document.getElementById('same').value = '';
      document.getElementById('after').value = '';
      document.getElementById('before').value = '';
      document.getElementById('sale-filtered').replaceChildren()

    }

    setSaleFiltItem = (event) => {

      this.setState({saleToFilter: event.target.value})

    }

    submitSaleToFilter = () => {

      var { saleToFilter } = this.state;

      var before = document.getElementById('before-item')
      var same = document.getElementById('same-item')
      var after = document.getElementById('after-item')

        if(saleToFilter.length > 0) {
            before.disabled = false;
            same.disabled = false;
            after.disabled = false;
        }

    }

    enterDateFilterItem  = (date , event) => {

      var before = document.getElementById('before-item')
      var same = document.getElementById('same-item')
      var after = document.getElementById('after-item')

      if(date === 'before-item') {

            document.getElementById('same-item').value = '';
            document.getElementById('after-item').value = '';


      } else if (date === 'same-item') {

        document.getElementById('before-item').value = '';
        document.getElementById('after-item').value = '';
          console.log('s')

      } else if (date === 'after-item') {
        document.getElementById('same-item').value = '';
        document.getElementById('before-item').value = '';
          console.log('a')

      }

      console.log(event.target.value)

      var { saleToFilter } = this.state


    fetch('http://localhost:3001/filter-sale-item', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({

        date: date,
        value: event.target.value,
        item: saleToFilter

      })

    }).then(res=>res.json())
    .then(result=>{

        document.getElementById('sale-filtered').replaceChildren()
        this.addItemElement(result)

    })


    }





    render() {

        return(

            <>
              <Container>
                  <Row>


                  <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0"  className="FilterHeading" >
                          <Accordion.Header onClick={()=>this.clickFilterHead()}>Filter By: Date</Accordion.Header>
                          <Accordion.Body>
                          <div id="dateFilterCont">



                              <div>
                                <label htmlFor="before">Before</label>
                                <input onBlur={(event)=>{this.filterSaleDate( 'before' , event)}} type="date" className="dateSale" id="before" name="before"/>
                              </div>

                              <div>
                                <label htmlFor="same">On</label>
                                <input onBlur={(event)=>{this.filterSaleDate( 'same' , event)}} type="date" className="dateSale" id="same" name="same"/>
                              </div>

                              <div>
                                <label htmlFor="after">After</label>
                                <input onBlur={(event)=>{this.filterSaleDate( 'after' , event)}} type="date" className="dateSale" id="after" name="after"/>
                              </div>

                          </div>



                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1"  className="FilterHeading" >
                          <Accordion.Header className="FilterHeading" onClick={()=>this.clickFilterHead()}>Filter By: Item</Accordion.Header>
                          <Accordion.Body>



                              <Container id="sale-Item-Filter-Cont">

                                <br/>
                                  <Row id="sale-item-filter-input">
                                    <Col md="4">
                                      <Form.Group className="mb-2">
                                        <Form.Control  type="text" placeholder="Enter Item Name" onChange={(event)=>{this.setSaleFiltItem(event)}}/>
                                      </Form.Group>
                                    </Col>

                                    <Col md="1" >
                                      <Button variant="primary" type="button" onClick={()=>{this.submitSaleToFilter()}}>
                                                Search
                                        </Button>

                                    </Col>
                                  </Row>

                                  <br/>

                                  <Row id="sale-Item-Date">

                                    <Col md="3">
                                      <div>
                                        <label htmlFor="before-item">Before</label>
                                        <input
                                        onBlur={(event)=>{this.enterDateFilterItem( 'before-item' , event)}}
                                         disabled = "true" type="date" className="dateSale" id="before-item" name="before-item"/>
                                      </div>
                                    </Col>

                                    <Col md="3">
                                      <div>
                                        <label htmlFor="same-item">On</label>
                                        <input
                                        onBlur={(event)=>{this.enterDateFilterItem( 'same-item' , event)}}
                                         disabled = "true" type="date" className="dateSale" id="same-item" name="same-item"/>
                                      </div>
                                    </Col>

                                    <Col md="3">
                                      <div>
                                        <label htmlFor="after-item">After</label>
                                        <input
                                        onBlur={(event)=>{this.enterDateFilterItem( 'after-item' , event)}}
                                         disabled = "true" type="date" className="dateSale" id="after-item" name="after-item"/>
                                      </div>
                                    </Col>

                                  </Row>

                                  <br/>
                              </Container>

                          </Accordion.Body>
                        </Accordion.Item>
                  </Accordion>

                  </Row>

                  <br/>
                  <br/>

                  <Row>
                  <Table striped bordered hover>
                      <thead>
                        <tr>
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

              </Container>

            </>

        )

    }


}

export default SaleTable;
