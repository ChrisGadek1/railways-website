import React from "react";
import axios from "axios";
import DisplayPathOneLine from "../findConnections/DisplayPathOneLine";


class GenerateTicket extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            lines: [],
            stations: [],
            back: false
        }
    }

    componentDidMount() {
        let readyStates = [];
        axios.get("https://slk-host.herokuapp.com/getLines").then((response)=>{
            this.setState({
               lines: response.data
            });
        });
        for(let i = 0; i < this.props.stations.length; i++){
            if(i != 0 && this.props.stations[i].stations_id.split("__")[0] != this.props.stations[i - 1].stations_id.split("__")[0] &&
                this.props.stations[i].stations_id.split("__")[1] != this.props.stations[i - 1].stations_id.split("__")[1]){
                let readyState = {};
                readyState["name"] = this.props.stationsName[this.props.stations[i-1].stations_id.split("__")[0]];
                readyState["stations_id"] = this.props.stations[i-1].stations_id.split("__")[0]+"__"+this.props.stations[i].stations_id.split("__")[1]+"__"+this.props.stations[i].stations_id.split("__")[2];
                readyState["time"] = this.props.stations[i].time;
                readyStates.push(readyState);
            }
            let readyState = {};
            readyState["name"] = this.props.stationsName[this.props.stations[i].stations_id.split("__")[0]];
            readyState["stations_id"] = this.props.stations[i].stations_id;
            readyState["time"] = this.props.stations[i].time;
            readyStates.push(readyState);
        }
        let stationsWithLines = [[]];
        let it = 0;
        for(let i = 0; i < readyStates.length; i++){
            if(i != 0 && (readyStates[i].stations_id.split("__")[1] != readyStates[i - 1].stations_id.split("__")[1] || readyStates[i].stations_id.split("__")[2] != readyStates[i - 1].stations_id.split("__")[2])){
                stationsWithLines.push([]);
                it++;
            }
            stationsWithLines[it].push(readyStates[i]);
        }
        console.log("stacje z liniami");
        console.log(stationsWithLines);
        this.setState({
            stations: stationsWithLines
        })
    }

    back = () => {
        this.props.back(true)
    }

    render() {
        return(
            <div className="DialogWindowWrapper">
                <div className="DialogWindowTicketWrapper">
                    <div className="DialogWindowTicket">
                        <div className="TicketTitleWrapper">
                            <div className="TicketTitle">
                                <i className="icon-train"></i>
                                Sieniczniańskie Linie Kolejowe
                            </div>
                        </div>
                        <div>id biletu: {this.props.id}</div>
                        <div>
                            <div>kolejne stacje według linii: </div>
                            {this.state.lines.length != 0 ?
                                this.state.stations.map(stations => <DisplayPathOneLine stations={stations} color={"#FFFFFF"} lines={this.state.lines}/>)
                                :
                                <div></div>
                            }

                            <div className="clear"></div>
                        </div>
                    </div>
                    <div>
                        <input type="button" value="powrót" onClick={this.back}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default GenerateTicket;