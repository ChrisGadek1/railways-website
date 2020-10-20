import React from "react";
import axios from "axios";

class ChooseStation extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            stations: [{"name":"wczytywanie danych"}]
        }
    }

    componentDidMount() {
        axios.get("https://slk-host.herokuapp.com/getStations").then((response) => {
            response.data.sort(this.compare);
            this.setState({
                stations: response.data
            })
        });
    }

    compare(a, b){
        if(a._id > b._id) return 1;
        else if(a._id < b._id) return -1;
        else return 0;
    }

    onChange = (event) => {
        this.props.getData(event.currentTarget.value);
    }


    render() {
        return(
            <div>
                <select onChange={this.onChange}>
                    {this.state.stations.map(station => <option value={station.name} key={station.stations_id+Math.random()}>{station.name}</option>)}
                </select>
            </div>
        );
    }
}

export default ChooseStation;