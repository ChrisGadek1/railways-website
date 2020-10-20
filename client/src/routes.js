import React from "react";
import {Route, Switch} from "react-router-dom";
import RegisterPanelContainer from "./components/registerPanel/RegisterPanelContainer";
import MainContent from "./components/mainSite/MainContent";
import EndRegister from "./components/confirmRegister/EndRegister";
import LoginContainer from "./components/loginPanel/LoginContainer";
import LinesContainer from "./components/Lines/LinesContainer";
import findContainer from "./components/findConnections/findContainer";
import MainPanel from "./components/userPanel/MainPanel";
import DidntFound from "./components/404error/DidntFound";
import {Redirect} from "react-router";

class Routes extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            con: false
        }
    }



    render() {
        return (
            <Switch>
                <Route exact path='/register' component={() => <RegisterPanelContainer />}/>
                <Route exact path='/' component={MainContent}/>
                <Route exact path='/confirmRegister' component={EndRegister}/>
                <Route exact path='/login' component={LoginContainer}/>
                <Route exact path='/lines' component={LinesContainer}/>
                <Route exact path='/search' component={findContainer}/>
                <Route exact path={"/user"}>
                {!this.props.isLogged ?
                    <Redirect to={"/"}/>
                    :
                    <MainPanel />
                }
                </Route>
                <Route component={DidntFound}/>
            </Switch>
        );
    }
}

export default Routes;