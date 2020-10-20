import React from "react";
import axios from "axios";
import TicketData from "./TicketData";

class DialogWindow extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            message: "Trwa wczytywanie",
            readyStation: [],
            onlyNames: [],
            numberOfChanges: 0,
            beginStation: {name: ""},
            endStation: {name: ""},
            date: new Date().getDate(),
            time: "",
            buy: false,
            login: "",
            dateFormatted: ""
        }
    }

    componentDidMount() {
        axios.get("https://slk-host.herokuapp.com/isLogged",{
            withCredentials: true
        }).then((response) => {
            if(response.data.logged){
                this.setState({
                    login: response.data.login,
                    isLogged: true,
                    message: "Podsumowanie Wygenerowanego biletu"
                });
            }
            else{
                this.setState({
                   isLogged: false,
                   message: "Aby zakupić bilet, zaloguj się"
                });
            }
        });
    }

    static getDerivedStateFromProps(props, state){
        let stations = [];
        let beginStation = {name: ""};
        let endStation = {name: ""};
        let numberOfChanges = 0;
        let newDate = props.date.getTime() - props.numberOfFinding*60*500;
        let date = new Date(newDate);
        let onlyNames = [];
        for(let i = 1; i < props.stations.length - 1; i++){
            if(i == 1){
                beginStation = props.stations[i];
                stations.push(props.stations[i]);
                onlyNames.push({
                    stations_id: props.stations[i].stations_id,
                    time: props.stations[i].time
                });
            }
            else if(i == props.stations.length - 2){
                endStation = props.stations[i];
            }
            if(i > 1 && props.stations[i].stations_id.split("__")[0] != props.stations[i-1].stations_id.split("__")[0]){
                stations.push(props.stations[i]);
                onlyNames.push({
                    stations_id: props.stations[i].stations_id,
                    time: props.stations[i].time
                });
            }
            else if(i > 1 && props.stations[i].stations_id.split("__")[0] == props.stations[i-1].stations_id.split("__")[0]){
                numberOfChanges++;
            }
        }
        let Year = date.getFullYear();
        let Month = date.getMonth() + 1;
        let Day = date.getDate();
        let Hours = date.getHours();
        let Minutes = date.getMinutes();
        if(Month < 10) Month = "0"+Month;
        if(Day < 10) Day = "0"+Day;
        if(Hours < 10) Hours = "0"+Hours;
        if(Minutes < 10) Minutes = "0" + Minutes;
        return{
            dateFormatted:  Year+"-"+Month+"-"+Day+" "+Hours+":"+Minutes,
            readyStation: stations,
            onlyNames: onlyNames,
            beginStation: beginStation,
            endStation: endStation,
            date: date,
            time: props.time,
            numberOfChanges: numberOfChanges
        }
    }

    cancel = () => {
        this.props.getDecision(false);
    }

    OK = () => {
        this.props.getDecision(false);
    }

    Buy = () => {
        axios.post("https://slk-host.herokuapp.com/insertTicket", {
            date:this.state.dateFormatted,
            stations: this.state.onlyNames,
            login: this.state.login,
            changingTime: this.intTimeToWordTime(parseInt(this.state.readyStation[this.state.readyStation.length - 1].time) - parseInt(this.state.readyStation[0].time))
        }).then((response)=>{

        });
        this.setState({
            buy: true
        })
    }

    intTimeToWordTime(time){
        console.log(time);
        if(time < 0) time += 7*24*60*60;
        let result = "";
        let minutes = ["minuta","minuty","minut"];
        let hours = ["godzina","godziny","godzin"];
        let days = ["dzień","dni"];
        if(Math.floor(time / (24*60*60)) > 0){
            if(Math.floor(time / (24*60*60)) > 1){
                result += Math.floor(time / (24*60*60))+" "+days[0]+" ";
            }
            else{
                result += Math.floor(time / (24*60*60))+" "+days[1]+" ";
            }
        }
        if(Math.floor((time % (3600*24))/3600) > 0){
            if(Math.floor((time % (3600*24))/3600) == 1){
                result += Math.floor((time % (3600*24))/3600)+" "+hours[0]+" ";
            }
            else if(Math.floor((time % (3600*24))/3600) > 1 && Math.floor((time % (3600*24))/3600) < 5){
                result += Math.floor((time % (3600*24))/3600)+" "+hours[1]+" ";
            }
            else{
                if(Math.floor((time % (3600*24))/3600) > 20 && Math.floor((time % (3600*24))/3600) % 10 > 4){
                    result += Math.floor((time % (3600*24))/3600)+" "+hours[2]+" ";
                }
                else{
                    result += Math.floor((time % (3600*24))/3600)+" "+hours[1]+" ";
                }
            }
        }
        if(Math.floor((time % 3600)/60) > 0){
            if(Math.floor((time % 3600)/60) == 1){
                result += Math.floor((time % 3600)/60)+" "+minutes[0]+" ";
            }
            else if(Math.floor((time % 3600)/60) > 1 && Math.floor((time % 3600)/60) < 5){
                result += Math.floor((time % 3600)/60)+" "+minutes[1]+" ";
            }
            else{
                if(Math.floor((time % 3600)/60) > 20 && (Math.floor((time % 3600)/60) % 10 > 4 || Math.floor((time % 3600)/60) % 10 < 2)){
                    result += Math.floor((time % 3600)/60)+" "+minutes[2]+" ";
                }
                else{
                    result += Math.floor((time % 3600)/60)+" "+minutes[1]+" ";
                }
            }
        }
        return result;
    }


    render() {

        if(this.state.readyStation.length == 0){
            return(
                <div></div>
            );
        }
        else{
            return(
                <div className="DialogWindowWrapper">
                    <div className="DialogWindow">
                        {this.state.isLogged ?
                            !this.state.buy ?
                                <div>
                                    <div className="dialogTitle">{this.state.message}</div>
                                    <div>
                                        <div className="DialogWindowTicketData">
                                            <TicketData info={this.state.dateFormatted} desc1="data odjazdu"/>
                                            <TicketData info={this.state.beginStation.name} desc1="stacja początkowa"/>
                                            <TicketData info={this.state.endStation.name} desc1="stacja końcowa"/>
                                            <TicketData info={this.state.readyStation.length} desc1="ilość stacji"/>
                                            <TicketData info={this.state.numberOfChanges} desc1="ilość przesiadek"/>
                                            <TicketData info={this.intTimeToWordTime(parseInt(this.state.readyStation[this.state.readyStation.length - 1].time) - parseInt(this.state.readyStation[0].time))} desc1="czas dojazdu, włącznie z" desc2="czekaniem na przesiadki"/>
                                        </div>
                                        <div className="TicketPriceContainer">
                                            <div>{"Cena biletu: "+(this.state.readyStation.length-1)*3+"zł"}</div>
                                        </div>
                                        <div className="ConfirmButtonsDialogWrapper">
                                            <div className="ConfirmButtonsDialog">
                                                <input className="floatLeft confirmDialogButton" type="button" value="Anuluj" onClick={this.cancel}/>
                                                <input className="floatLeft confirmDialogButton" type="button" value="Kupuję" onClick={this.Buy}/>
                                                <div className="clear"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className="BuyInformation">Bilet został zakupiony poprawnie.<br/><br/>Dziękujemy za wybór Sieniczniańskich linii kolejowych!</div>
                                    <input type="button" value="OK" onClick={this.OK}/>
                                </div>
                            :
                            <div>
                                <div className="dialogTitle">{this.state.message}</div>
                                <div className="OKButtonWrapper">
                                    <input type="button" value="OK" onClick={this.OK}/>
                                </div>
                            </div>

                        }
                    </div>
                </div>
            );
        }

    }
}

export default DialogWindow;