import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Components/Nav/nav.js';
import AddItem from './Components/add/add.js';
import SearchItem from './Components/search/search.js';
import Itemtable from './Components/table/table.js';
import 'bootstrap/dist/css/bootstrap.min.css';

fetch('http://localhost:3001/', {
  method: 'get',
  headers: {'Content-Type': 'application/json'}
  
})


class App extends React.Component  {

        constructor() {
            super();
            this.state = {
                itemRecieved: ''
            }
        }

        fetchItems = (name , event) => {

                fetch('http://localhost:3001/table', {
                      method: 'post',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify({
                            name: name
                      })
                      
                })
                .then(res=>res.json())
                .then(result=>{
                    console.log(result)
                 this.setState({itemRecieved: result});
                   console.log(this.state)

                })


        }


        render() {
            return (
                    <>
                    <Navigation />
                    <AddItem />
                    <br/>
                    <br/>
                    <SearchItem fetchItems={(name , event)=>this.fetchItems(name)} />
                    <br/>
                    <br/>
                    <Itemtable item={this.state.itemRecieved} />
                    </>
            );
        }
}

export default App;
