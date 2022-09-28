import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Components/Nav/nav.js';
import AddItem from './Components/add/add.js';
import SearchItem from './Components/search/search.js';
import Table from './Components/table/table.js';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
    <Navigation />
    <AddItem />
    <br/>
    <br/>
    <SearchItem/>
    <br/>
    <br/>
    <Table/>
    </>
  );
}

export default App;
