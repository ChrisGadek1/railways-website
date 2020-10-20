import React from "react";
import LoginComponent from "./LoginComponent";
import axios from "axios";

class LoginContainer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            information: ""
        }
    }

    getLogin = (login) => {
        this.setState({
           login: login
        });
    }

    getPassword = (pass) => {
        this.setState({
           password: pass
        });
    }


    login = () =>{
        axios.post("https://slk-host.herokuapp.com/checkLoginData", {
            login: this.state.login,
            password: this.state.password
        },{
            withCredentials: true
        }).then((response) => {
            if(response.data.success){
                this.setState({
                   information:""
                },() => {
                    window.location.href = "/";
                });
            }
            else{
                this.setState({
                    information: "niepoprawny login lub hasło"
                });
            }
        });
    }

    render() {
        return(
            <div className="LoginContainerWrapper">
                <div className="LoginContainer">
                    <LoginComponent id="login" message="login" type="text" getData={this.getLogin}/>
                    <LoginComponent id="password" message="hasło" type="password" getData={this.getPassword}/>
                    <div className="LoginErrorInfo">{this.state.information}</div>
                    <input type="button" value="zaloguj" onClick={this.login}/>
                    <div className="RegisterInformation">Nie posiadasz konta? Zarejestruj się<br/> pod <a href="/register">tym adresem</a></div>
                </div>
            </div>
        );
    }
}

export default LoginContainer;