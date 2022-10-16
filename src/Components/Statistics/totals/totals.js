import React , { Component } from 'react';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import './totals.css'


class Totals extends Component {


  monthlyTotal = () => {



    fetch('http://localhost:3001/monthly-total', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},

    })
    .then(res=>res.json())
    .then(result=>{
      console.log(result)
      document.getElementById('monthlySum').innerText = ''
        document.getElementById('monthlySum').innerText = result

    })

  }

  weeklyTotal = () => {

    console.log('as')

    fetch('http://localhost:3001/monthly-total', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    })
    .then(res=>res.json())
    .then(result=>{


    })

  }


  render() {

        return(

          <>
            <Container>

                      <br/>
                      <br/>

                <Row>
                    <h2 id="saleHeading">Sale</h2>

                </Row>

                <br/>
                <hr/>
                <br/>

                <Row id="saleTotals">
                  <Col md="2">
                      <Card>
                        <Card.Header>This Month</Card.Header>
                        <Card.Body>
                          <Card.Title id="monthlySum">{this.monthlyTotal()}</Card.Title>
                        </Card.Body>
                      </Card>
                  </Col>
                  <Col md="2">
                      <Card>
                        <Card.Header  id="WeeklySum">This Week{this.weeklyTotal()}</Card.Header>
                        <Card.Body>
                          <Card.Title>thissss</Card.Title>
                        </Card.Body>
                      </Card>
                  </Col>
                  <Col md="2">
                      <Card>
                        <Card.Header>Today</Card.Header>
                        <Card.Body>
                          <Card.Title>thissss</Card.Title>
                        </Card.Body>
                      </Card>
                  </Col>
                </Row>

            </Container>

          </>

        )

  }

}

export default Totals
