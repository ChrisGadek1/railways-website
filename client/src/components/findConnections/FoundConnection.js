import React from "react";
import DisplayPathOneLine from "./DisplayPathOneLine";

class FoundConnection extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            readyStations: []
        }
    }


    mapStationsData = () => {
        let tmpStations = [];
        let it = -1;
        let colors = ["#000000","#668ced","#59d494","#e8df64","#d65856","#e3a7d2","#54dec5"];
        for(let i = 0; i < this.props.stations.length; i++){
            if(i == 0 || this.props.stations[i].stations_id.split("__")[1] != this.props.stations[i-1].stations_id.split("__")[1] ||
                this.props.stations[i].stations_id.split("__")[2] != this.props.stations[i-1].stations_id.split("__")[2]){
                tmpStations.push([colors[it+1],[]]);
                it++;
            }
            tmpStations[it][1].push(this.props.stations[i]);
        }
        let tmpStations1 = []
        for(let i = 1; i < tmpStations.length - 1; i++){
            tmpStations1.push(tmpStations[i]);
        }
        return tmpStations1;
    }

    static getDerivedStateFromProps(props, state){
        let object = new FoundConnection(props);
        let readyStations = object.mapStationsData();
        return{
            readyStations: readyStations
        };
    }

    render() {
        return(
            <div className="FoundConnection">
                <div className="DirectionTitle ">
                    <div className="floatLeft DirectionTime">{"Czas Odjazdu:"}</div>
                    <div className="floatLeft DirectionHour">{this.props.beginTime}</div>
                    <div className="clear"></div>
                </div>
                <div className="DirectionTitle">
                    <div className="floatLeft DirectionTime">{"Czas Przyjazdu:"}</div>
                    <div className="floatLeft DirectionHour">{this.props.finishTime}</div>
                    <div className="clear"></div>
                </div>
                <div className="DisplayPathConnection">
                    {this.state.readyStations.map(station => <DisplayPathOneLine class1="FoundedLineTitle" stations={station[1]} color={station[0]} lines={this.props.lines}/>)}
                </div>
            </div>
        );
    }
}

export default FoundConnection;