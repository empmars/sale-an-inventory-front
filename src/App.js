import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Components/Inventory/Nav/nav.js';
import AddItem from './Components/Inventory/add/add.js';
import ItemSearch from './Components/Inventory/ItemSearch/ItemSearch.js';
import AddSale from './Components/Sale/addSale/addSale.js';
import Totals from './Components/Statistics/totals/totals.js';
import SaleTable from './Components/Statistics/sale-table/sale-table.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'react-bootstrap';


class App extends React.Component {

    constructor() {
        super();
        this.state = {
            current: 'inventory',
            itemEdit: ''
        }
    }



    changeDirect = (dir) => {
        this.setState({ current: dir })
    }


    render() {

        const { current } = this.state;

        if (this.state.current === "inventory") {

            return (
                <>
                    <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
                        minBreakpoint="xxs" >

                        <Navigation changeDir={(dir) => this.changeDirect(dir)} />
                        <br />
                        <br />
                        <br />

                        <ItemSearch />
                    </ThemeProvider>

                    <br />
                </>
            );
        } else if (this.state.current === "sale") {

            return (
                <>
                    <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
                        minBreakpoint="xxs" >

                        <Navigation changeDir={(dir) => this.changeDirect(dir)} />
                        <AddSale />
                    </ThemeProvider>
                </>

            )

        } else {

            return (
                <>
                    <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
                        minBreakpoint="xxs" >

                        <Navigation changeDir={(dir) => this.changeDirect(dir)} />
                        <Totals />
                        <br />
                        <br />
                        <SaleTable />
                    </ThemeProvider>
                </>

            )

        }
    }
}

export default App;
