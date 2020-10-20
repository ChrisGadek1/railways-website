import React from "react";
import axios from "axios";

class LoginPanel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loginInfo: "",
            actionInfo: "",
            logout: "LogoutButton"
        }
    }

    componentDidMount() {
        axios.get("https://slk-host.herokuapp.com/isLogged",{
            withCredentials: true
        }).then((response) => {
            if(response.data.logged){
                this.setState({
                    loginInfo: "zalogowano: "+response.data.login,
                    actionInfo: "moje konto",
                    logout: "LoginButton"
                })
                this.props.isLogged(true);
            }
            else{
                this.setState({
                    loginInfo: "Nie zalogowano",
                    actionInfo: "zaloguj",
                    logout: "LogoutButton"
                })
                this.props.isLogged(false);
            }
        });
    }

    logout = () => {
        axios.post("https://slk-host.herokuapp.com/logout", {
            authenticated: true
        },{
            withCredentials: true
        }).then((response) => {
            window.location.reload();
        });
    }

    action = () => {
        if(this.state.actionInfo == "zaloguj"){
            window.location.href = "/login";
        }
        else{
            window.location.href = "/user";
        }
    }


     render() {
        return(
            <div className="LoginPanel">
                <div>{this.state.loginInfo}</div>
                <div className="LoginButton" onClick={this.action}>{this.state.actionInfo}</div>
                <div className={this.state.logout} onClick={this.logout}>wyloguj</div>
            </div>
        );
    }
}

export default LoginPanel;