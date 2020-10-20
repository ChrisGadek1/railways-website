import React from 'react';
import '../css/App.css';
import HeaderApp from "./HeaderApp";
import Footer from "./Footer";
import {
    BrowserRouter as Router,
} from "react-router-dom";
import Routes from "../routes"

class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            logged: null,
            canAllow: false
        }
    }

    isLogged = (logged) => {
        this.setState({
            logged: logged
        })
    }

    render() {
        if(this.state.logged == null){
            return (
                <Router className="App">
                    <HeaderApp isLogged={this.isLogged} />
                    <Footer />
                </Router>
            );
        }
        else{
            return (
                <Router className="App">
                    <HeaderApp isLogged={this.isLogged} />
                    <Routes isLogged={this.state.logged} />
                    <Footer />
                </Router>
            );
        }
    }
}


export default App;
