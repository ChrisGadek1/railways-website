import React from "react";

class DisplayPathOneLine extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            style: {
                backgroundColor: this.props.color
            }
        }

    }

    static getDateFromInt(intDate){
        let weekDays = ["poniedziałek","wtorek","środa","czwartek","piątek","sobota","niedziela"];
        let weekNumber = parseInt(Math.floor(intDate/(24*60*60)));
        intDate = intDate % (24*60*60);
        let daysSeconds = parseInt(intDate);
        let hour = parseInt(Math.floor(intDate/(60*60)));
        if(hour < 10) hour = "0"+hour;
        intDate = intDate % (60*60);
        let minutes = parseInt(Math.floor(intDate/60));
        if(minutes < 10) minutes = "0"+minutes;
        return hour+":"+minutes;
    }

    findBeginAndFinish = (stationId) => {
        let lineId = stationId.split("__")[1];
        let forward = stationId.split("__")[2];
        console.log(this.props.lines);
        for (let i = 0; i < this.props.lines.length; i++) {
            console.log(this.props.lines[i]._id + " "+lineId);
            if (this.props.lines[i]._id == lineId) {
                if(forward == "forward") return [this.props.lines[i].begin[0].name, this.props.lines[i].end[0].name];
                else return [this.props.lines[i].end[0].name, this.props.lines[i].begin[0].name];
            }
        }
    }

    render() {
        return(
            <div className="DisplayPathOneLine">
                <div className="DisplayLinePathInner">
                    <div className={this.props.class1}> {"Linia relacji:     "+this.findBeginAndFinish(this.props.stations[0].stations_id)[0]+" - "+this.findBeginAndFinish(this.props.stations[0].stations_id)[1]} </div>
                    <div>
                        {this.props.stations.map((station, index) =>
                            <div className="floatLeft" key={index+"_stations"}>
                                <div className="floatLeft iconPath">
                                    {index != 0 ? <i className="icon-right"></i> : ""}
                                </div>
                                <div className="floatLeft">
                                    <div className="DisplayPathStation" style={this.state.style}>
                                        {station.name} <br/>
                                        {DisplayPathOneLine.getDateFromInt(station.time)}
                                    </div>
                                </div>
                                <div className="clear"></div>
                            </div>
                        )}
                        <div className="clear"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DisplayPathOneLine