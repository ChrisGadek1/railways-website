import React from "react";

class TicketDataLine extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
    }

    provideAction = () => {
        this.props.getAction([this.props.ticketId,this.props.ticketDate,this.props.ticketPrice,this.props.stations]);
    }

    render() {
        return(
            <tr className="TicketTR" onClick={this.provideAction}>
                <td className="InnerTR">{this.props.ticketId}</td>
                <td className="InnerTR">{this.props.ticketDate}</td>
                <td className="InnerTR">{this.props.beginEnd}</td>
                <td className="InnerTR">{this.props.ticketPrice}</td>
            </tr>
        );
    }
}

export default TicketDataLine