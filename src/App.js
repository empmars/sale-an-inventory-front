import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Components/Inventory/Nav/nav.js';
import AddItem from './Components/Inventory/add/add.js';
import SearchItem from './Components/Inventory/search/search.js';
import Itemtable from './Components/Inventory/table/table.js';
import Allitems from './Components/Inventory/allItems/allitems.js';
import AddSale from './Components/Sale/addSale/addSale.js';
import Totals from './Components/Statistics/totals/totals.js';
import 'bootstrap/dist/css/bootstrap.min.css';

fetch('http://localhost:3001/', {
  method: 'get',
  headers: {'Content-Type': 'application/json'}

})


class App extends React.Component  {

        constructor() {
            super();
            this.state = {
                current: 'inventory',
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

        changeDirect = (dir) => {
            this.setState({current: dir})
        }


        render() {

            const { current } = this.state;

            if(this.state.current === "inventory") {

                    return (
                            <>
                            <Navigation changeDir={(dir)=>this.changeDirect(dir)} />
                            <AddItem />
                            <br/>
                            <br/>
                            <SearchItem fetchItems={(name , event)=>this.fetchItems(name)} />
                            <br/>
                            <br/>
                            <Itemtable item={this.state.itemRecieved} />
                            <Allitems />
                            </>
                    );
            } else if(this.state.current === "sale") {

                return(
                        <>
                            <Navigation changeDir={(dir)=>this.changeDirect(dir)} />
                            <AddSale />
                        </>

                    )

            } else {

              return(
                      <>
                          <Navigation changeDir={(dir)=>this.changeDirect(dir)} />
                          <Totals />
                      </>

                  )

            }
        }
}

export default App;
