import React from "react";
import axios from "axios";

class DisplayData extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            info: "",
            change: false,
            buttonInfo: "zmień",
            changedData: "",
            errorInfo: "",
            canConfirm: false
        }
    }


    componentDidMount(){
        axios.get("https://slk-host.herokuapp.com/isLogged", {
            withCredentials: true
        }).then((response) => {
            if(this.props.desc == "login"){
                this.setState({
                    info: response.data.login,
                    login: response.data.login
                })
            }
            else if(this.props.desc == "hasło"){
                this.setState({
                    info: response.data.password,
                    login: response.data.login
                })
            }
            else if(this.props.desc == "email"){
                this.setState({
                    info: response.data.email,
                    login: response.data.login
                })
            }
        });
    }

    change = () => {
        this.setState((prev) =>{
            return{
                change: !prev.change,
                buttonInfo: prev.buttonInfo == "zmień" ? "anuluj" : "zmień"
            }
        });
    }

    setData = (e) => {
        this.setState({
            changedData: e.target.value
        }, () => {
            let emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let alphanumericRE = /^[a-zA-Z0-9]+$/i;
            let passwordPowerRE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).+$/i;
            if(this.props.desc == "login"){
                axios.get("https://slk-host.herokuapp.com/api/checkLogin?login="+this.state.changedData).then((response) => {
                    if(this.state.changedData == ""){
                        this.setState({
                            canConfirm: false,
                            errorInfo: "",
                        });
                    }
                    else if(!response.data.getOkLogin){
                        this.setState({
                            canConfirm: false,
                            errorInfo: "Taki login już istnieje",
                        });
                    }
                    else if(!alphanumericRE.test(this.state.changedData)){
                        this.setState({
                            canConfirm: false,
                            errorInfo: "login może składać się tylko z liter i cyfr",
                        });
                    }
                    else{
                        this.setState({
                            canConfirm: true,
                            errorInfo: "",
                        });
                    }
                });
            }
            else if(this.props.desc === "email"){
                if(this.state.changedData == ""){
                    this.setState({
                        canConfirm: false,
                        errorInfo: "",
                    });
                }
                else if(!emailRE.test(this.state.changedData)){
                    this.setState({
                        canConfirm: false,
                        errorInfo: "wprowadź poprawny email"
                    });
                }
                else{
                    this.setState({
                        canConfirm: true,
                        errorInfo: ""
                    });
                }
            }
            else if(this.props.desc === "hasło"){
                if(this.state.changedData == ""){
                    this.setState({
                        errorInfo: "",
                        canConfirm: false
                    });
                }
                else if(this.state.changedData.length < 8 || this.state.changedData.length > 30){
                    this.setState({
                        errorInfo: "hasło musi mieć długość od 8 do 30 znaków",
                        canConfirm: false
                    });
                }
                else if(!passwordPowerRE.test(this.state.changedData)){
                    this.setState({
                        errorInfo: "hasło musi zawierać małe i duże litery, cyfry i znak specjalny",
                        canConfirm: false
                    });
                }
                else{
                    this.setState({
                        errorInfo: "",
                        canConfirm: true
                    });
                }
            }
        });
    }

    confirmedChange = () => {
        axios.post("https://slk-host.herokuapp.com/changeData",{
            dataType: this.props.desc == "hasło" ? "password" : this.props.desc,
            data: this.state.changedData,
            login: this.state.login
        }, {
            withCredentials: true
        }).then((response) => {
            this.setState({
                info: this.state.changedData,
                change: false
            });
        })
    }

    render() {
        return(
            <div className="DisplayData">
                <div className="floatLeft DisplayDataInner">
                    <div className="floatLeft DisplayDataDesc">
                        {this.props.desc+": "}
                    </div>
                    <div className="floatLeft DisplayDataMain">
                        {this.state.info}
                    </div>
                    <div className="clear"></div>
                </div>
                <input className="floatLeft DisplayDataChangeButton" type="button" value={this.state.buttonInfo} onClick={this.change}/>
                {this.state.change ?
                    <div className="floatLeft ChangeContainer">
                        <div className="floatLeft ChangeContainerInputText">
                            <input className="ChangeInner" type="text" onInput={this.setData}/>
                            <div className="errorInfoChange">{this.state.errorInfo}</div>
                        </div>
                        <input className="floatLeft ChangeInner" type="button" disabled={!this.state.canConfirm} value="Potwierdź" onClick={this.confirmedChange}/>
                        <div className="clear"></div>
                    </div>
                    :
                    <div>

                    </div>
                }
                <div className="clear"></div>
                <div className="BorderBottomDisplay"></div>
            </div>
        );
    }
}

export default DisplayData;