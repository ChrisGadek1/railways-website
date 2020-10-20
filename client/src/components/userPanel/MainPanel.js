import React from "react";
import UserMenu from "./UserMenu";
import MyData from "./MyData";
import TicketDisplay from "./TicketDisplay";
import GenerateTicket from "./GenerateTicket";

class MainPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chosen: "moje dane",
            generate: false,
            ticketData: []
        }
    }

    getChosen = (data) => {
        this.setState({
            chosen: data
        });
    }

    generateTicket = (action) => {
        this.setState({
            generate: true,
            ticketData: action
        })
    }

    back = () => {
        this.setState({
            generate: false
        })
    }

    render() {
        return (
            <div className="MainPanel">
                <div className="userMainPanelWrapper">
                    <div className="userMainPanel">
                        <div className="userPanelTitle">Panel Użytkownika</div>
                        <UserMenu options={["moje dane", "moje bilety"]} getChosen={this.getChosen}
                                  chosen={this.state.chosen}/>
                        <div className="optionsBorder"></div>
                        {this.state.chosen == "moje dane" ?
                            <MyData/>
                            :
                            this.state.chosen == "moje bilety" ?
                                <div>
                                    <TicketDisplay generate={this.generateTicket}/>
                                </div>
                                :
                                <div>

                                </div>
                        }
                    </div>
                </div>
                {this.state.generate ?
                    <div>
                        <GenerateTicket
                            id={this.state.ticketData[0][0]}
                            date={this.state.ticketData[0][1]}
                            price={this.state.ticketData[0][2]}
                            stations={this.state.ticketData[0][3]}
                            stationsName={this.state.ticketData[1]}
                            back={this.back}
                        />
                    </div>
                    :
                    <div></div>
                }
            </div>
        );
    }
}

export default MainPanel