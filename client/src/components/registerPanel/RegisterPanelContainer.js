import React from "react";
import RegisterComponent from "./RegisterComponent";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

class RegisterPanelContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            login: "",
            password1: "",
            password2: "",
            theSame: true,
            getOkEmail: false,
            getOkLogin: false,
            getOkPassword1: false,
            getOkPassword2: false,
            getOkAccept: false,
            getOkCaptcha: false,
            everythingOK: false
        }
    }

    isEverythingOK(){
        if(this.state.getOkAccept && this.state.getOkCaptcha && this.state.getOkPassword1 && this.state.theSame && this.state.getOkLogin && this.state.getOkEmail){
            this.setState({
                everythingOK: true
            });
        }
        else{
            this.setState({
                everythingOK: false
            });
        }
    }

    compare = () =>{
        if(this.state.password1 == this.state.password2){
            this.setState({
                theSame:true
            }, () =>{
                this.isEverythingOK();
            });
        }
        else {
            this.setState({
                theSame:false
            }, () =>{
                this.isEverythingOK();
            });
        }
    }

    getPassword1 = (password) =>{
        this.setState({
           password1: password
        }, () =>  {
            this.compare();
        });
    }

    getPassword2 = (password) =>{
        this.setState({
            password2: password
        }, () =>  {
            this.compare();
        });
    }

    getLogin = (login) => {
        this.setState({
            login: login
        });
    }

    getEmail = (email) => {
        this.setState({
            email: email
        })
    }

    getOkEmail = (email) =>{
        if(email){
            this.setState({
                getOkEmail: true
            }, () =>{
                this.isEverythingOK();
            });
        }
        else{
            this.setState({
                getOkEmail: false
            }, () =>{
                this.isEverythingOK();
            });
        }
    }

    getOkLogin = (login) =>{
        if(login){
            this.setState({
                getOkLogin: true
            }, () =>{
                this.isEverythingOK();
            });
        }
        else{
            this.setState({
                getOkLogin: false
            }, () =>{
                this.isEverythingOK();
            });
        }
    }

    getOkPassword1 = (pass) =>{
        if(pass){
            this.setState({
                getOkPassword1: true
            }, () =>{
                this.isEverythingOK();
            });
        }
        else{
            this.setState({
                getOkPassword1: false
            }, () =>{
                this.isEverythingOK();
            });
        }
    }

    getOkPassword2 = (pass) =>{

    }

    getOkAccept = (accept) =>{
        if(accept){
            this.setState({
                getOkAccept: true
            }, () =>{
                this.isEverythingOK();
            });
        }
        else{
            this.setState({
                getOkAccept: false
            }, () =>{
                this.isEverythingOK();
            });
        }
    }

    getOkCaptcha = (value) =>{
        this.setState(prevState =>{
            return{
                getOkCaptcha: !prevState.getOkCaptcha
            };
        }, () =>{
            this.isEverythingOK();
        });
    }

    sumbmitRegister = () => {
        axios.post("https://slk-host.herokuapp.com/endRegister",{
            login: this.state.login,
            email: this.state.email,
            password: this.state.password1
        }).then((response) =>{
            if(response.data.success){
                window.location.href = "/confirmRegister";
            }
        });
    }

    render() {
        return(
            <form className="RegisterPanelWrapper">
                <div className="RegisterPanelContainer">
                    <RegisterComponent typeOfCom="text" message="podaj email" id="email" isOk={this.getOkEmail} getData={this.getEmail}/>
                    <RegisterComponent typeOfCom="text" message="podaj login" id="login" isOk={this.getOkLogin} getData={this.getLogin}/>
                    <RegisterComponent typeOfCom="password" message="podaj hasło" id="password" getData={this.getPassword1} isOk={this.getOkPassword1}/>
                    <RegisterComponent typeOfCom="password" message="powtórz hasło" id="repeat_password" theSame={this.state.theSame} getData={this.getPassword2} isOk={this.getOkPassword2}/>
                    <RegisterComponent typeOfCom="checkbox" message="akceptuj regulamin" id="accept" isOk={this.getOkAccept} />
                    <ReCAPTCHA sitekey="6LcBkc8ZAAAAAHaP0bB9fghvlh0EmVWroOARATnO" onChange={this.getOkCaptcha}/>
                    <input type="button" value="Zarejestruj" disabled={!this.state.everythingOK} onClick={this.sumbmitRegister}/>
                </div>
            </form>
        );
    }
}

export default RegisterPanelContainer;