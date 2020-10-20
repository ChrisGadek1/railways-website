import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

class ChooseDate extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    onChange = (date) => {
        this.setState({
            date:date
        }, ()=>{
            this.props.getData(this.state.date);
        });
    };


    render() {
        return(
            <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd.MM.yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Wybierz Datę"
                        value={this.state.date}
                        onChange={this.onChange}

                    />
                </MuiPickersUtilsProvider>
            </div>
        );
    }
}

export default ChooseDate;