import React from "react";
import Bubble from "./Bubble";

class OneStationInner extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            classBubble: ""
        }
    }

    disable = () => {
        this.setState({
            classBubble: "notDisplay"
        });
    }

    enable = () => {
        this.setState({
            classBubble: "Display"
        });
    }

    render() {
        return(
            <div className="OneStation" key={this.props.station._id}>
                <div className="OneStationInner">
                    <Bubble minutes={this.props.station.minutes} newClass={this.state.classBubble}/>
                    <div onMouseEnter={this.enable} onMouseLeave={this.disable}>
                        {this.props.station.name}
                    </div>
                </div>
                <div className="OneStationM">
                    {this.props.station.number == this.props.number - 1 ? "" : " - "}
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}

export default OneStationInner