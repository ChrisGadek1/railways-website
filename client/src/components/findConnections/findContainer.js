import React from "react";
import QueryContainer from "./QueryContainer";
import axios from "axios";
import TinyQueue from "tinyqueue";
import FoundConnection from "./FoundConnection";
import DisplayPathOneLine from "./DisplayPathOneLine";
import DialogWindow from "../buyTicket/buyAfterFound/DialogWindow";

class Node{
    constructor(name, stations_id, minutes) {
        this.stations_id = stations_id;
        this.minutes = minutes;
        this.time = 1000000;
        this.name = name;
        this.changeTrain = 0;
        this.edges = [];
        this.actualCost = 0;
        this.visited = false;
        this.parent = null;
    }
}

class Edge{
    constructor(cost, destination) {
        this.cost = cost;
        this.destination = destination;
    }

}

class Graph{
    constructor(trains) {
        this.nodes = {};
        this.repeatNodes = {};
        this.trains = trains;
        this.prepareTrains();
    }

    prepareTrains(){
        this.trains = this.trains.sort((a,b) => {
           if(parseInt(a.time) > parseInt(b.time)) return 1;
           else if(parseInt(a.time) < parseInt(b.time)) return -1;
           return 0;
        });
        console.log(this.trains);
    }

    createGraph(lines){

        //add to lines real names of stations
        let nameDict = {};
        for(let i = 0; i < lines.length; i++){
            for(let j = 0; j < lines[i].stops_join.length; j++){
                nameDict[lines[i].stops_join[j]._id] = lines[i].stops_join[j].name;
            }
        }
        for(let i = 0; i < lines.length; i++){
            for(let j = 0; j < lines[i].stops.length; j++){
                lines[i].stops[j]["name"] = nameDict[lines[i].stops[j].stations_id];
            }
        }

        //create and add nodes to list from constructor
        for(let i = 0; i < lines.length; i++){
            for(let j = 0; j < lines[i].stops.length; j++){
                let newNodeForward = new Node(lines[i].stops[j].name,lines[i].stops[j].stations_id+"__"+lines[i]._id+"__forward",lines[i].stops[j].minutes);
                let newNodeReverse = new Node(lines[i].stops[lines[i].stops.length - 1 - j].name,lines[i].stops[lines[i].stops.length - 1 - j].stations_id+"__"+lines[i]._id+"__reverse",lines[i].stops[j].minutes);
                this.nodes[lines[i].stops[j].stations_id+"__"+lines[i]._id+"__forward"] = newNodeForward;
                this.nodes[lines[i].stops[lines[i].stops.length - 1 -j].name,lines[i].stops[lines[i].stops.length - 1 -j].stations_id+"__"+lines[i]._id+"__reverse"] = newNodeReverse;
            }
        }


        //add connections beetwen station in one line
        for(let i = 0; i < lines.length; i++){
            for(let j = 0; j < lines[i].stops.length - 1; j++){
                let edgeForward = new Edge(-1, this.nodes[lines[i].stops[j+1].stations_id+"__"+lines[i]._id+"__forward"]);
                let edgeReverse = new Edge(-1, this.nodes[lines[i].stops[lines[i].stops.length - 2 - j].stations_id+"__"+lines[i]._id+"__reverse"]);
                this.nodes[lines[i].stops[j].stations_id+"__"+lines[i]._id+"__forward"].edges.push(edgeForward);
                this.nodes[lines[i].stops[lines[i].stops.length - 1 - j].stations_id+"__"+lines[i]._id+"__reverse"].edges.push(edgeReverse);
            }
        }

        //create list of repeated stations
        for(let i = 0; i < lines.length; i++){
            for(let j = 0; j < lines[i].stops.length; j++){
                if(this.repeatNodes[lines[i].stops[j].stations_id] == null){
                    this.repeatNodes[lines[i].stops[j].stations_id] = [];
                }
                this.repeatNodes[lines[i].stops[j].stations_id].push(this.nodes[lines[i].stops[j].stations_id+"__"+lines[i]._id+"__forward"]);
                this.repeatNodes[lines[i].stops[j].stations_id].push(this.nodes[lines[i].stops[j].stations_id+"__"+lines[i]._id+"__reverse"]);
            }
        }

        //add connections beetwen the same stations

        Object.values(this.repeatNodes).forEach(value => {
           for(let i = 0; i < value.length; i++){
               for(let j = 0; j < value.length; j++){
                   if(value[i].stations_id != value[j].stations_id){
                       let edge = new Edge(-1, value[j])
                       this.nodes[value[i].stations_id].edges.push(edge);
                   }
               }
           }
        });
    }

    addBeginAndEnd(stationA, stationB, userTime){
        this.nodes[stationA] = new Node(stationA, stationA+"__"+"without line"+"__"+"without direction", 0);
        this.nodes[stationA].time = userTime;
        this.nodes[stationB] = new Node(stationB, stationB+"__"+"without line"+"__"+"without direction", 0);
        for(let i = 0; i < this.repeatNodes[stationA].length; i++){
            this.nodes[stationA].edges.push(new Edge(-1,this.repeatNodes[stationA][i]));
        }
        for(let i = 0; i < this.repeatNodes[stationB].length; i++){
            this.nodes[this.repeatNodes[stationB][i].stations_id].edges.push(new Edge(-1, this.nodes[stationB]));
        }
    }

    findIndex(time, rotations){
        let end = this.trains.length;
        let start = 0;
        while(start != end){
            let mid = Math.floor((start+end)/2);
            if(parseInt(this.trains[mid].time) <= time){
                start = mid + 1;
            }
            else{
                end = mid;
            }
        }
        if(end > this.trains.length - 1){
            end = 0;
            rotations++;
        }
        return [end, rotations];
    }

    findNextTrainTime(time, line, direction, station){
        let timeBefore = this.nodes[station+"__"+line+"__"+direction].minutes*60;
        time = time - timeBefore;
        let ans = -1;
        let rotations = 0;
        if(time < 0) {
            time = parseInt(this.trains[this.trains.length-1].time) - time;
            rotations--;
        }
        if(time >= parseInt(this.trains[this.trains.length-1].time)){
             ans = 0;
             rotations++;
        }
        else{
            let result = this.findIndex(time, rotations);
            ans = result[0];
            rotations = result[1];
        }
        while(this.trains[ans].line_id != line || this.trains[ans].direction != direction){
            if(ans == this.trains.length - 1) {
                ans = 0;
                rotations++;
            }
            else{
                ans++;
            }
            if(station == "gorenice_centralne"){
                console.log("aktualny pociag:");
                console.log(this.trains[ans]);
            }
        }
        return parseInt(this.trains[this.trains.length-1].time)*rotations+parseInt(this.trains[ans].time)+timeBefore;
    }


    addCosts(stationA, stationB,userTime){
        this.switchedTrains = [];
        this.addBeginAndEnd(stationA,stationB,userTime)
        console.log("user Time: "+this.nodes[stationA].time);
        let queue = new TinyQueue([],function(a,b){
            if(parseInt(b.time) < parseInt(a.time))  return 1;
            else if(parseInt(b.time) > parseInt(a.time)) return -1;
            else return 0;
        });
        queue.push(this.nodes[stationA]);
        Object.entries(this.nodes).forEach(entry =>{
            entry[1].changeTrain = 0;
            if(entry[0] != stationA){
               queue.push(entry[1]);
            }
        });
        while(queue.length > 0){
            let node = queue.pop();
            for(let i = 0; i < node.edges.length; i++){
                if(node.edges[i].destination.stations_id.split("__")[1] == "without line"){
                    if(parseInt(node.time) < parseInt(node.edges[i].destination.time) ||
                        (parseInt(node.time) == parseInt(node.edges[i].destination.time) && node.edges[i].destination.changeTrain > node.changeTrain)){
                        node.edges[i].destination.time = node.time;
                        node.edges[i].destination.changeTrain = node.changeTrain;
                        node.edges[i].destination.parent = node;
                    }
                }
                else if((node.edges[i].destination.stations_id.split("__")[1] != node.stations_id.split("__")[1] ||
                    node.edges[i].destination.stations_id.split("__")[2] != node.stations_id.split("__")[2]) &&
                    node.edges[i].destination.stations_id.split("__")[1] != "without line") {
                    let nextTime = this.findNextTrainTime(parseInt(node.time), node.edges[i].destination.stations_id.split("__")[1], node.edges[i].destination.stations_id.split("__")[2], node.edges[i].destination.stations_id.split("__")[0]);
                    if (parseInt(node.edges[i].destination.time) > parseInt(nextTime) || (parseInt(node.edges[i].destination.time) == parseInt(nextTime) && node.edges[i].destination.changeTrain > node.changeTrain + 1)) {
                        node.edges[i].destination.time = parseInt(nextTime);
                        node.edges[i].destination.parent = node;
                        node.edges[i].destination.changeTrain = node.changeTrain + 1;
                        queue.push(node.edges[i].destination);
                    }
                }
                else if(node.edges[i].destination.stations_id.split("__")[1] != "without line"){
                    if((parseInt(node.edges[i].destination.time) > parseInt(node.time) + parseInt(node.edges[i].destination.minutes)*60 - parseInt(node.minutes)*60)||
                        (parseInt(node.edges[i].destination.time) == parseInt(node.time) + parseInt(node.edges[i].destination.minutes)*60 - parseInt(node.minutes)*60 &&
                            node.edges[i].destination.changeTrain > node.changeTrain)){
                        node.edges[i].destination.time = parseInt(node.time) + parseInt(node.edges[i].destination.minutes)*60 - parseInt(node.minutes)*60;
                        node.edges[i].destination.parent = node;
                        node.edges[i].destination.changeTrain = node.changeTrain;
                        queue.push(node.edges[i].destination);
                    }
                }
            }
        }
        this.switchedTrains = this.switchedTrains.sort();
        console.log(this.nodes);
        let result = [];
        let dest = this.nodes[stationB];
        result.push(this.nodes[stationB]);
        while(dest != this.nodes[stationA]){
            console.log(dest);
            dest = dest.parent;
            result.push(dest);
        }
        return result;
    }


}

class findContainer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            buttonDisabled: true,
            messageButton: "trwa pobieranie danych",
            messageUnderChoose: "",
            beginOrigin: "Braciejówka",
            finishOrigin: "Braciejówka",
            dateOrigin: new Date(),
            timeOrigin: new Date().getHours()+":"+new Date().getMinutes(),
            begin: "Braciejówka",
            finish: "Braciejówka",
            date: new Date(),
            time: new Date().getHours()+":"+new Date().getMinutes(),
            resultsVisibility: "isNotVisible",
            dialogWindowVisibility: "isNotVisible",
            numberOfFindings: 0,
            result: [{time: 0, stations_id:"0"},{time:0, stations_id: "1"}],
            trains: [],
            lines: [],
            stations: {}
        }
        this.currentGraph = null;
    }

    getReady = () => {
        if(!(this.state.trains.length != 0 && this.state.lines.length != 0 && this.state.stations["sieniczno"] != null)){
            this.setState({
                buttonDisabled: true,
                messageButton: "trwa pobieranie danych",
                messageUnderChoose: ""
            })
        }
        else{
            this.setState({
                buttonDisabled: false,
                messageButton: "szukaj",
                messageUnderChoose: ""
            })
        }
        if(this.state.begin == this.state.finish){
            this.setState({
                buttonDisabled: true,
                messageButton: "szukaj",
                messageUnderChoose: "stacja początkowa i końcowa nie może być taka sama"
            })
        }
        else{
            this.setState({
                buttonDisabled: false,
                messageButton: "szukaj",
                messageUnderChoose: ""
            })
        }
    }

    componentDidMount() {
        axios.get("https://slk-host.herokuapp.com/getTrains").then((responseTrains) => {
            this.setState({
                trains: responseTrains.data
            }, () =>{
                this.getReady();
            });
        })
        axios.get("https://slk-host.herokuapp.com/getLines").then((response) => {
            this.setState({
                lines: response.data
            }, () => {
                this.getReady();
            });
        });
        axios.get("https://slk-host.herokuapp.com/getStations").then((response) => {
            let stations = {};
            for(let i = 0; i < response.data.length; i++){
                stations[response.data[i].name] = response.data[i]._id;
            }
            this.setState({
                stations: stations
            }, ()=>{
                this.getReady();
            });
        })

    }

    buyTicket = () => {
        this.setState({
            dialogWindowVisibility: "isVisibleDialog"
        })
    }

    getStart = (begin) => {
        this.setState({
           beginOrigin: begin
        },()=>{
            this.setState({
                begin: this.state.beginOrigin
            }, ()=> {
                this.getReady();
            })
        });
    }

    getFinish = (finish) => {
        this.setState({
            finishOrigin: finish
        },()=>{
            this.setState({
               finish: this.state.finishOrigin
            },()=>{
                this.getReady();
            })
        });
    }

    getDate = (date) => {
        this.setState({
           dateOrigin: date
        },()=>{
            let tmpDate = this.state.dateOrigin;
            let tmpTime = this.state.timeOrigin;
            this.setState({
                date: new Date(tmpDate.getFullYear(),tmpDate.getMonth(),tmpDate.getDate(),tmpTime.split(":")[0],tmpTime.split(":")[1])
            },()=>{
                this.getReady();
            })
        });
    }

    getTime = (time) => {
        this.setState({
            timeOrigin:time
        },()=>{
            let tmpDate = this.state.dateOrigin;
            let tmpTime = this.state.timeOrigin;
            this.setState({
                time: this.state.timeOrigin,
                date: new Date(tmpDate.getFullYear(),tmpDate.getMonth(),tmpDate.getDate(),tmpTime.split(":")[0],tmpTime.split(":")[1])
            },()=>{
                this.getReady();
            })
        })
    }

    getTimeInInt(time, date){
        let weekDay = date.getDay() - 1;
        if(weekDay == -1) weekDay = 6;
        let seconds = parseInt(time.split(":")[0])*60*60+parseInt(time.split(":")[1])*60;
        console.log("przeliczono "+time+" "+weekDay+" na "+parseInt(weekDay*60*60*24 + seconds));
        return weekDay*60*60*24 + seconds;
    }

    getDateFromInt = (intDate) =>{
        let weekDays = ["poniedziałek","wtorek","środa","czwartek","piątek","sobota","niedziela"];
        let weekNumber = parseInt(Math.floor(intDate/(24*60*60)));
        intDate = intDate % (24*60*60);
        let daysSeconds = parseInt(intDate);
        let hour = parseInt(Math.floor(intDate/(60*60)));
        if(hour < 10) hour = "0"+hour;
        intDate = intDate % (60*60);
        let minutes = parseInt(Math.floor(intDate/60));
        if(minutes < 10) minutes = "0"+minutes;
        return [weekDays[weekNumber % 7], hour+":"+minutes];
    }

    getStationsWrapper = () => {
        let tmpDate = this.state.dateOrigin;
        let tmpTime = this.state.timeOrigin;
        this.setState({
            begin: this.state.beginOrigin,
            finish: this.state.finishOrigin,
            date: new Date(tmpDate.getFullYear(),tmpDate.getMonth(),tmpDate.getDate(),tmpTime.split(":")[0],tmpTime.split(":")[1]),
            time: this.state.timeOrigin,
            numberOfFindings: 0
        },()=>{
           this.getStations();
        });
    }

    getStations = () => {
        console.log(this.state.lines);
        let graph = new Graph(this.state.trains);
        graph.createGraph(this.state.lines);
        let result = graph.addCosts(this.state.stations[this.state.begin], this.state.stations[this.state.finish], this.getTimeInInt(this.state.time, this.state.date));
        result = result.reverse();
        this.currentGraph = graph;
        this.setState({
            result: result,
            resultsVisibility: "isVisible"
        },()=>{
            let oldSeconds = this.getTimeInInt(this.state.time, this.state.date);
            let newSeconds = this.state.result[1].time;
            let difference = (newSeconds - oldSeconds < 0 ? newSeconds - oldSeconds + 24*7*60*60 +60: newSeconds - oldSeconds + 60);
            this.setState({
                time: DisplayPathOneLine.getDateFromInt(this.state.result[1].time+60),
                date: new Date(parseInt(this.state.date.getTime()) + difference*1000),
                numberOfFindings: this.state.numberOfFindings + 1
            });
        });
    }

    nextPath = () => {
        this.getStations();
    }

    getDecision = (decision) => {
        if(decision){

        }
        else{
            this.setState({
                dialogWindowVisibility: "isNotVisible",
            })
        }
    }

    render() {
        return(
            <div className="defaultWrapper">
                <div className="findContainerWrapper">
                    <div className="titleOfFinding">
                        Wyszukaj połączenie
                    </div>
                    <div className="findContainer">
                        <div className="findContainerInner">
                            <QueryContainer  title="wybierz stację początkową" StationOrDate="station" getData={this.getStart}/>
                            <QueryContainer  title="wybierz stację końcową" StationOrDate="station" getData={this.getFinish}/>
                            <div clear="clear"></div>
                        </div>
                        <div className="StationError" >{this.state.messageUnderChoose}</div>
                        <div className="findContainerInner">
                            <QueryContainer  title="" StationOrDate="date" getData={this.getDate}/>
                            <QueryContainer title="" StationOrDate="time" getData={this.getTime}/>
                            <div clear="clear"></div>
                        </div>
                        <div className="ButtonContainer">
                            <input className="ChooseButton" type="button" value={this.state.messageButton} disabled={this.state.buttonDisabled} onClick={this.getStationsWrapper}/>
                        </div>
                    </div>
                </div>
                <div className={"findContainerWrapper "+this.state.resultsVisibility}>
                    <div className="FoundTitleWrapper">
                        <div className="FoundTitleContainer">
                            <input className="floatLeft BuyTicketButton" type="button" value="Kup Bilet" onClick={this.buyTicket}/>
                            <div className="FoundTitle floatLeft">Znaleziono Trasę:</div>
                            <div className="clear"></div>
                        </div>
                    </div>
                    <div className="findContainer">
                        <FoundConnection beginTime={this.getDateFromInt(this.state.result[1].time)[0]+" - "+this.getDateFromInt(this.state.result[1].time)[1]}
                                         finishTime={this.getDateFromInt(this.state.result[this.state.result.length - 2].time)[0]+" - "+this.getDateFromInt(this.state.result[this.state.result.length - 2].time)[1]}
                                         stations={this.state.result}
                                         lines={this.state.lines}/>
                    </div>
                    <div className="nextPathButtonWrapper">
                        <input value="Następna" type="button" onClick={this.nextPath}/>
                    </div>
                </div>
                <div className={this.state.dialogWindowVisibility}>
                    <DialogWindow getDecision={this.getDecision} stations={this.state.result} date={this.state.date} time={this.state.time} numberOfFinding={this.state.numberOfFindings}/>
                </div>
            </div>
        );
    }
}

export default findContainer;