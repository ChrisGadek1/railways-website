import React from "react";
import axios from "axios";

class RegisterComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            information: "",
            color: "green",
            canSend: false,
            password: ""
        }
        this.testInput = this.testInput.bind(this);
    }

    static getDerivedStateFromProps(props, state){
        if(props.id === "repeat_password" && !(props.theSame === true) && state.password !== ""){
            return{
                information: "hasła nie są takie same",
                color: "red",
                canSend: false
            };
        }
        else if(props.id === "repeat_password" && state.password !== ""){
            return{
                information: "OK",
                color: "green",
                canSend: true
            };
        }
        else{
            return null;
        }
    }

    testInput = (e) => {
        e.persist();
        if(this.props.id === "accept"){
            this.setState({
                information: "",
                color: "green"
            },() =>{
                this.isOk(e.target.checked);
            });
        }
        else{
            this.setState({
                information: "OK",
                color: "green"
            },() =>{
                this.isOk(e.target.value);
            });
        }



        let emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let alphanumericRE = /^[a-zA-Z0-9]+$/i;
        let passwordPowerRE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).+$/i;
        if(this.props.id === "email" && !emailRE.test(e.target.value)){
            this.setState({
                information: "niepoprawny address email",
                color: "red",
                canSend: false
            },() =>{
                this.props.getData(e.target.value);
                this.isOk(e.target.value);
            });
        }
        if(this.props.id === "login"){
            this.setState({
                information: "trwa sprawdzanie loginu",
                color: "black"
            }, () =>{
                axios.get("https://slk-host.herokuapp.com/api/checkLogin?login="+e.target.value,{
                    withCredentials: true
                }).then( res =>{
                    const data = res.data;
                    this.setState({data});
                    if(!data.getOkLogin){
                        this.setState({
                            information: "ten login jest już zajęty",
                            color: "red",
                            canSend: false
                        },() =>{
                            this.isOk(e.target.value);
                        });
                    }
                    else if(!alphanumericRE.test(e.target.value)){
                        this.setState({
                            information: "dozwolone tylko litery i cyfry",
                            color: "red",
                            canSend: false
                        },() =>{
                            this.isOk(e.target.value);
                        });
                    }
                    else if(e.target.value !== ""){
                        this.setState({
                            information: "OK",
                            color: "green",
                            canSend: false
                        },() =>{
                            this.props.getData(e.target.value);
                            this.isOk(e.target.value);
                        });
                    }
                    else{
                        this.setState({
                            information: "",
                            color: "green",
                            canSend: false
                        },() =>{
                            this.props.getData(e.target.value);
                            this.isOk(e.target.value);
                        });
                    }
                });
            });
        }
        if(this.props.id === "password" || this.props.id === "repeat_password"){
            this.setState({
                password: e.target.value
            }, () => {
                this.props.getData(this.state.password);
                this.isOk(e.target.value);
            });
        }
        if(this.props.id === "password" && (e.target.value.length < 8 || e.target.value.length > 30)){
            this.setState({
                information: "hasło musi mieć długość od 8 do 30 znaków",
                color: "red",
                canSend: false
            });
        }
        if(this.props.id === "password" && !passwordPowerRE.test(e.target.value)){
            this.setState({
                information: "hasło musi zawierać małe i duże litery, cyfry i znak specjalny",
                color: "red",
                canSend: false
            },() =>{
                this.isOk(e.target.value);
            });
        }
        if(this.props.id === "accept" && !e.target.checked){
            let checked = e.target.checked;
            this.setState({
                information: "",
                color: "red",
                canSend: false
            },() =>{
                this.isOk(checked);
            });
        }

        if(this.props.id !== "accept" && e.target.value === ""){
            this.setState({
                information: "",
                color: "green",
                canSend: false
            },() =>{
                this.isOk(e.target.value);
            });
        }
        if(this.props.id !== "accept") this.props.getData(e.target.value);
    }

    isOk(data){
        if(this.state.information === "OK"){
            this.props.isOk(true);
        }
        else if(this.props.id === "accept" && data){
            this.props.isOk(true);
        }
        else{
            this.props.isOk(false);
        }
    }

    render() {
        let className = "LabelInRegisterComponent";
        if(this.props.typeOfCom === "checkbox"){
            className += " withCheckBox";
        }
        let info = this.state.information;
        return(
          <div className="RegisterComponent">
              <label className={className} html={this.props.id}>{this.props.message}</label>
              <input type={this.props.typeOfCom} id={this.props.id} onInput={this.testInput}/>
              <div className={"corrects" + " " + this.props.id} style={{color: this.state.color}}>{info}</div>
          </div>
        );
    }
}

export default RegisterComponent;