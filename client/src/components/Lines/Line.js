import React from "react";
import CheckHours from "./CheckHours";
import OneStationInner from "./OneStationInner";

class Line extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            classBubble: "",
            classSee: "CheckHours",
            isSeen: false,
            buttonMessage: "Zobacz godziny odjazdów"
        }
    }


    compare(a, b) {
        if (a.number > b.number) return 1;
        if (b.number > a.number) return -1;

        return 0;
    }

    setVisibility = () => {
        if(!this.state.isSeen){
            this.setState({
                classSee: "VisibleCheckHours",
                isSeen: true,
                buttonMessage: "Ukryj godziny odjazdów"
            });
        }
        else{
            this.setState({
                classSee: "CheckHours",
                isSeen: false,
                buttonMessage: "Zobacz godziny odjazdów"
            });
        }
    }



    render() {
        this.props.stations.sort(this.compare);
        return(
            <div className="Line">
                <div className="LineTitle">{"Linia: "+this.props.begin+"-"+this.props.end}</div>
                <div className="LineStations">
                    <div>Kolejne Stacje:</div>
                    {this.props.stations.map(station =>
                        <OneStationInner key={station.stations_id+this.props.number} station={station} number={this.props.number} />
                    )}
                    <div className="clear"></div>
                </div>
                <div className="CheckHoursContainer">
                    <div className="CheckHoursTitle" onClick={this.setVisibility}>{this.state.buttonMessage}</div>
                    <CheckHours begin={this.props.begin} end={this.props.end} trains={this.props.trains} classTitle={this.state.classSee}/>
                </div>
            </div>
        );
    }
}

export default Line