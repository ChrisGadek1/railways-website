import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

class chooseTime extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            testTime: new Date(),
            time : new Date().getHours()+":"+new Date().getMinutes()
        }

    }

    onChange = (date) => {
        if(date != null){
            this.setState({
                testTime: date,
                time: date.getHours()+":"+date.getMinutes()
            }, () => {
                this.props.getData(this.state.time);
            });
        }
    };

    render() {
        return(
            <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker  okLabel="Ok" clearLabel="Anuluj" cancelLabel="Anuluj" value={this.state.testTime} margin="normal" id="time-picker" label="Wybierz godzinę" ampm={false} onChange={this.onChange} locale="pl-PL" />
                </MuiPickersUtilsProvider>
            </div>
        );
    }
}

export default chooseTime;