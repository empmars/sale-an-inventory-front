import React from 'react';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import './totals.css'


const Totals = () => {

  var [totals, setTotals] = React.useState({
    daily: 0,
    weekly: 0,
    monthly: 0
  })

  var [dailyTot, setDt] = React.useState(0)
  var [weeklyTot, setWt] = React.useState(0)
  var [monthlyTot, setMt] = React.useState(0)
  var [dailyProf, setDp] = React.useState(0)
  var [weeklyProf, setWp] = React.useState(0)
  var [monthlyProf, setMp] = React.useState(0)


  // TOTAL LOGIC

  // var monthlyTotal = () => {



  //   fetch('http://localhost:3001/monthly-total', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       date: Date()
  //     })

  //   })
  //     .then(res => res.json())
  //     .then(result => {
  //       console.log(result)
  //       document.getElementById('monthlySum').innerText = ''
  //       document.getElementById('monthlySum').innerText = result

  //     })

  // }

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
          console.log('An error Occured.  ')
        } else if (result !== totals.daily) {
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
        console.log(result, 'ooooooooooooo')
        if (result === 'err') {
          console.log('An error Occured.  ')
        } else if (result !== totals.daily) {
          setDt(result)
        }


      })

  }

  // PROFIT LOGIC

  // var monthlyProfit = () => {

  //   fetch('http://localhost:3001/monthly-profit', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       date: Date()
  //     })

  //   })
  //     .then(res => res.json())
  //     .then(result => {
  //       console.log(result)
  //       document.getElementById('monthlyProfit').innerText = ''
  //       document.getElementById('monthlyProfit').innerText = result

  //     })

  // }

  // var weeklyProfit = () => {

  //   console.log('as')

  //   fetch('http://localhost:3001/weekly-profit', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       date: Date()
  //     })

  //   })
  //     .then(res => res.json())
  //     .then(result => {
  //       console.log(result)
  //       document.getElementById('weeklyProfit').innerText = ''
  //       document.getElementById('weeklyProfit').innerText = result

  //     })

  // }

  // var dailyProfit = () => {

  //   fetch('http://localhost:3001/daily-Profit', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       date: Date()
  //     })

  //   })
  //     .then(res => res.json())
  //     .then(result => {
  //       console.log(result)
  //       document.getElementById('dailyProfit').innerText = ''
  //       document.getElementById('dailyProfit').innerText = result

  //     })

  // }

  console.log(totals, 'ppppppppppp')
  React.useEffect(() => {
    dailyTotal()
    weeklyTotal()
    // monthlyTotal()
    // monthlyProfit()
    // weeklyProfit()
    // dailyProfit()


  }, [dailyTot , weeklyTot , monthlyTot , dailyProf , weeklyProf , monthlyProf])



  return (

    <>
      <Container>

        <br />
        <br />

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
                <Card.Title id="monthlySum"></Card.Title>
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

export default Totals
