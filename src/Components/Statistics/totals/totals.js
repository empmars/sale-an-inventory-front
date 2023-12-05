import React from 'react';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import './totals.css'


const Totals = () => {


  var [dailyTot, setDt] = React.useState(0)
  var [weeklyTot, setWt] = React.useState(0)
  var [monthlyTot, setMt] = React.useState(0)
  var [dailyProf, setDp] = React.useState(0)
  var [weeklyProf, setWp] = React.useState(0)
  var [monthlyProf, setMp] = React.useState(0)
  var [err, setErr] = React.useState(false)


  // TOTAL LOGIC

  var monthlyTotal = () => {



    fetch('http://localhost:3001/monthly-total', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: Date()
      })

    })
      .then(res => res.json())
      .then(result => {

        if (result === 'err') {

          setErr(true)
          setTimeout(() => { setErr(false) }, 2000)
        } else if (result == null) {
          setMt(0.00)
        } 
        else if (result !== monthlyTot) {
          setMt(result)
        }
      })

  }

  var weeklyTotal = () => {

    console.log('as')

    fetch('http://localhost:3001/weekly-total', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: Date()
      })

    })
      .then(res => res.json())
      .then(result => {
        if (result === 'err') {
          setErr(true)
          setTimeout(() => { setErr(false) }, 2000)
        } else if (result == null) {
          setWt(0.00)
        }  
        else if (result !== weeklyTot) {
          setWt(result)
        }


      })

  }

  var dailyTotal = () => {



    fetch('http://localhost:3001/daily-total', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: Date()
      })

    })
      .then(res => res.json())
      .then(result => {
        if (result === 'err') {
          setErr(true)
          setTimeout(() => { setErr(false) }, 2000)

        } else if (result == null) {
          setDt(0.00)
        } 
        else if (result !== dailyTot) {
          setDt(result)
        }


      })

  }

  // PROFIT LOGIC

  var monthlyProfit = () => {

    fetch('http://localhost:3001/monthly-profit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: Date()
      })

    })
      .then(res => res.json())
      .then(result => {
        if (result === 'err') {

          setErr(true)
          setTimeout(() => { setErr(false) }, 2000)
        } else if (result == null) {
          setMp(0.00)
        } 
        else if (result !== monthlyProf) {
          setMp(result)
        }

      })

  }

  var weeklyProfit = () => {


    fetch('http://localhost:3001/weekly-profit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: Date()
      })

    })
      .then(res => res.json())
      .then(result => {

        if (result === 'err') {

          setErr(true)
          setTimeout(() => { setErr(false) }, 2000)
        } else if (result == null) {
          setWp(0.00)
        } else if (result !== weeklyProf) {
          setWp(result)
        }
      })

  }

  var dailyProfit = () => {

    fetch('http://localhost:3001/daily-Profit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: Date()
      })

    })
      .then(res => res.json())
      .then(result => {
        if (result === 'err') {
          setErr(true)
          setTimeout(() => { setErr(false) }, 2000)
        } else if (result == null) {
          setDp(0.00)
        } else if (result !== dailyProf) {
          setDp(result)
        }
      })

  }


  React.useEffect(() => {
    dailyTotal()
    weeklyTotal()
    monthlyTotal()
    monthlyProfit()
    weeklyProfit()
    dailyProfit()


  }, [])



  return (

    <>
      <Container>

        <br />
        <br />
        <Row>
          <Alert id="saleAddedError1" key="danger" variant="danger" style={{ display: err ? 'block' : 'none' }}>
            An error occured. Please Reload Page.
          </Alert>
        </Row>
        <Row>
          <h2 id="saleHeading">Sale Summary</h2>

        </Row>

        <br />
        <hr />
        <br />

        <Row id="saleTotals">
          <Col md="2">
            <Card>
              <Card.Header>This Month</Card.Header>
              <Card.Body>
                <Card.Title id="monthlySum">{monthlyTot}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md="2">
            <Card>
              <Card.Header>This Week</Card.Header>
              <Card.Body>
                <Card.Title id="weeklySum">{weeklyTot}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md="2">
            <Card>
              <Card.Header>Today</Card.Header>
              <Card.Body>
                <Card.Title id="dailySum">{dailyTot}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <br />
        <br />

        <Row>
          <h2 id="saleHeading">Profit Summary</h2>
        </Row>

        <br />
        <hr />
        <br />

        <Row id="profitTotals">
          <Col md="2">
            <Card>
              <Card.Header>This Month</Card.Header>
              <Card.Body>
                <Card.Title id="monthlyProfit">{monthlyProf}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md="2">
            <Card>
              <Card.Header>This Week</Card.Header>
              <Card.Body>
                <Card.Title id="weeklyProfit">{weeklyProf}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md="2">
            <Card>
              <Card.Header>Today</Card.Header>
              <Card.Body>
                <Card.Title id="dailyProfit">{dailyProf}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>


      </Container>

    </>

  )



}

export default Totals
