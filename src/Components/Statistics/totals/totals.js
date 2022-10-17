import React , { Component } from 'react';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import './totals.css'


class Totals extends Component {

  // TOTAL LOGIC

  monthlyTotal = () => {



    fetch('http://localhost:3001/monthly-total', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        date: Date()
      })

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

    fetch('http://localhost:3001/weekly-total', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        date: Date()
      })

    })
    .then(res=>res.json())
    .then(result=>{
      console.log(result)
      document.getElementById('weeklySum').innerText = ''
        document.getElementById('weeklySum').innerText = result

    })

  }

  dailyTotal = () => {

    console.log('as')

    fetch('http://localhost:3001/daily-total', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        date: Date()
      })

    })
    .then(res=>res.json())
    .then(result=>{
      console.log(result)
      document.getElementById('dailySum').innerText = ''
        document.getElementById('dailySum').innerText = result

    })

  }

  // PROFIT LOGIC

  monthlyProfit = () => {

    fetch('http://localhost:3001/monthly-profit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        date: Date()
      })

    })
    .then(res=>res.json())
    .then(result=>{
      console.log(result)
      document.getElementById('monthlyProfit').innerText = ''
        document.getElementById('monthlyProfit').innerText = result

    })

  }

  weeklyProfit = () => {

    console.log('as')

    fetch('http://localhost:3001/weekly-profit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        date: Date()
      })

    })
    .then(res=>res.json())
    .then(result=>{
      console.log(result)
      document.getElementById('weeklyProfit').innerText = ''
        document.getElementById('weeklyProfit').innerText = result

    })

  }

  dailyProfit = () => {

    fetch('http://localhost:3001/daily-Profit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        date: Date()
      })

    })
    .then(res=>res.json())
    .then(result=>{
      console.log(result)
      document.getElementById('dailyProfit').innerText = ''
        document.getElementById('dailyProfit').innerText = result

    })

  }


  componentDidMount() {

    console.log('a')

    this.monthlyTotal()
    this.weeklyTotal()
    this.dailyTotal()

    this.monthlyProfit()
    this.weeklyProfit()
    this.dailyProfit()




}
  render() {

        return(

          <>
            <Container>

                      <br/>
                      <br/>

                <Row>
                    <h2 id="saleHeading">Sale Summary</h2>

                </Row>

                <br/>
                <hr/>
                <br/>

                <Row id="saleTotals">
                  <Col md="2">
                      <Card>
                        <Card.Header>This Month</Card.Header>
                        <Card.Body>
                          <Card.Title id="monthlySum"></Card.Title>
                        </Card.Body>
                      </Card>
                  </Col>
                  <Col md="2">
                      <Card>
                        <Card.Header>This Week</Card.Header>
                        <Card.Body>
                          <Card.Title id="weeklySum"></Card.Title>
                        </Card.Body>
                      </Card>
                  </Col>
                  <Col md="2">
                      <Card>
                        <Card.Header>Today</Card.Header>
                        <Card.Body>
                          <Card.Title id="dailySum"></Card.Title>
                        </Card.Body>
                      </Card>
                  </Col>
                </Row>

                <br/>
                <br/>

                <Row>
                    <h2 id="saleHeading">Profit Summary</h2>
                </Row>

                <br/>
                <hr/>
                <br/>

                <Row id="profitTotals">
                  <Col md="2">
                      <Card>
                        <Card.Header>This Month</Card.Header>
                        <Card.Body>
                          <Card.Title id="monthlyProfit"></Card.Title>
                        </Card.Body>
                      </Card>
                  </Col>
                  <Col md="2">
                      <Card>
                        <Card.Header>This Week</Card.Header>
                        <Card.Body>
                          <Card.Title id="weeklyProfit"></Card.Title>
                        </Card.Body>
                      </Card>
                  </Col>
                  <Col md="2">
                      <Card>
                        <Card.Header>Today</Card.Header>
                        <Card.Body>
                          <Card.Title id="dailyProfit"></Card.Title>
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
