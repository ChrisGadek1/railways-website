import React from "react";
import ChooseStation from "./ChooseStation";
import ChooseDate from "./ChooseDate";
import ChooseTime from "./ChooseTime";

class QueryContainer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    getInfo = (info) => {
        this.setState({
           data: info
        }, () => {
            this.props.getData(this.state.data);
        });
    }



    render() {
        if(this.props.StationOrDate == "date"){
            return(
                <div className="QueryContainer">
                    <div className="QueryTitle">
                        {this.props.title}
                    </div>
                    <ChooseDate getData={this.getInfo}/>
                </div>
            );
        }
        else if(this.props.StationOrDate == "station"){
            return(
                <div className="QueryContainer">
                    <div className="QueryTitle">
                        {this.props.title}
                    </div>
                    <ChooseStation  getData={this.getInfo} />
                </div>
            );
        }
        else{
            return(
                <div className="QueryContainer">
                    <div className="QueryTitle">
                        {this.props.title}
                    </div>
                    <ChooseTime getData={this.getInfo} />
                </div>
            );
        }
    }
}

export default QueryContainer;