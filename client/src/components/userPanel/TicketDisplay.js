import React from "react";
import axios from "axios";
import TicketDataLine from "./TicketDataLine";
import GenerateTicket from "./GenerateTicket";

class TicketDisplay extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            tickets: [],
            stations: {},
            firstStation: "",
            lastStation: "",
            generate: false
        }
    }

    componentDidMount() {
        axios.get("https://slk-host.herokuapp.com/isLogged", {
            withCredentials: true
        }).then((response) => {
            this.setState({
                login: response.data.login
            }, ()=>{
                axios.get("https://slk-host.herokuapp.com/getTickets?login="+this.state.login).then((responseTickets) => {
                    this.setState({
                        tickets: responseTickets.data
                    }, ()=>{
                        axios.get("https://slk-host.herokuapp.com/getStations").then((responseStations) => {
                            let stations = {};
                            for(let i = 0; i < responseStations.data.length; i++){
                                stations[responseStations.data[i]._id] = responseStations.data[i].name;
                            }
                            this.setState({
                                stations: stations,
                            })
                        });
                    })
                })

            })
        });
    }

   generateTicket = (action) => {
        this.setState({
           generate: true
        }, ()=>{
            this.props.generate([action, this.state.stations]);
        });
   }


    render() {
        return(
            <div className="TicketDisplay">
                <div className="TicketDisplayInfo">
                    Kliknij na wybrany bilet, aby go wygenerować
                </div>
                    {this.state.tickets.length == 0 ?
                        <div>
                            <div>Brak Dostępnych Biletów</div>
                        </div>
                        :
                        <table>
                            <tr>
                                <th>Id biletu</th><th> Data Odjazdu</th><th>Stacja początkowa i końcowa</th><th>Cena</th>
                            </tr>
                            {this.state.tickets.map(ticket =>
                                <TicketDataLine
                                    stations={ticket.stations}
                                    ticketId={ticket._id}
                                    ticketDate={ticket.date}
                                    beginEnd={this.state.stations[ticket.stations[0].stations_id.split("__")[0]]+" - "+this.state.stations[ticket.stations[ticket.stations.length-1].stations_id.split("__")[0]]}
                                    ticketPrice={(ticket.stations.length-1)*3+"zł"}
                                    getAction={this.generateTicket}
                                />

                            )}
                        </table>
                    }
            </div>
        );
    }
}

export default TicketDisplay;