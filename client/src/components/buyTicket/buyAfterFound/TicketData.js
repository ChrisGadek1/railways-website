import React from "react";

class TicketData extends React.Component{
    render() {
        return(
            <div className="SummarizingDataWrapper">
                <div className="floatLeft SummarizingDataInnerDesc">{this.props.desc1}<br/>{this.props.desc2}</div>
                <div className="floatLeft SummarizingDataInnerValueWrapper">
                    <div className="SummarizingDataInnerValue">
                        {this.props.info}
                    </div>
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}

export default TicketData;