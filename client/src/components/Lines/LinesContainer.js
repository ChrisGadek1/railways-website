import React from "react";
import Line from "./Line";
import axios from "axios";

class LinesContainer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            lines: []
        }
    }

    componentDidMount() {
        axios.get("https://slk-host.herokuapp.com/getLines").then((response) => {
            let newResponse = response.data;
            let dictNames = {};
            for(let j = 0; j < newResponse.length; j++){
                for(let i = 0; i < newResponse[j].stops_join.length; i++){
                    dictNames[newResponse[j].stops_join[i]._id] = newResponse[j].stops_join[i].name;
                }
            }
            for(let i = 0; i < newResponse.length; i++){
                let number = 0;
                for(let j = 0; j < newResponse[i].stops.length; j++){
                    newResponse[i].stops[j]["name"] = dictNames[newResponse[i].stops[j]["stations_id"]];
                    number += 1;
                }
                newResponse[i]["numberOfStations"] = number;
            }
            this.setState({
               lines: newResponse
            },() =>{
                axios.get("https://slk-host.herokuapp.com/getTrains").then((responseTrains) => {
                    console.log(responseTrains.data);
                    console.log(response.data);
                    let linesDict = {};
                    for(let i = 0; i < newResponse.length; i++){
                        linesDict[newResponse[i]._id] = newResponse[i];
                    }
                    for(let i = 0; i < responseTrains.data.length; i++){
                        if(linesDict[responseTrains.data[i].line_id].trains == null) linesDict[responseTrains.data[i].line_id].trains = [];
                        linesDict[responseTrains.data[i].line_id].trains.push(responseTrains.data[i]);
                    }
                    this.setState({
                       lines:  newResponse
                    });
                });
            });
        });
    }


    render() {
        return(
            <div className="LinesContainerWrapper">
                <div className="LinesContainer">
                    {this.state.lines.map(line => <Line key={line._id} begin={line.begin[0].name} end={line.end[0].name} stations={line.stops} number={line.numberOfStations} trains={line.trains}/>)}
                </div>
            </div>
        );
    }
}

export default LinesContainer;