import React from "react";

class CheckHours extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            trains: [],
            className: ""
        }
    }

    static getDerivedStateFromProps(props, state){
        return{
            trains: props.trains,
            className: props.classTitle
        }
    }

    getDateFromInt = (intDate) =>{
        let weekDays = ["poniedziałek","wtorek","środa","czwartek","piątek","sobota","niedziela"];
        let weekNumber = parseInt(Math.floor(intDate/(24*60*60)));
        intDate = intDate % (24*60*60);
        let daysSeconds = parseInt(intDate);
        let hour = parseInt(Math.floor(intDate/(60*60)));
        if(hour < 10) hour = "0"+hour;
        intDate = intDate % (60*60);
        let minutes = parseInt(Math.floor(intDate/60));
        if(minutes < 10) minutes = "0"+minutes;
        console.log(weekNumber+" "+weekDays[weekNumber]);
        return [weekDays[weekNumber],weekNumber, hour+":"+minutes,daysSeconds];
    }

    render() {
        if(this.state.trains == null){
            return(<div></div>);
        }
        else{
            let datesForward = [];
            let datesReverse = [];
            for(let i = 0; i < this.state.trains.length; i++){
                if(this.state.trains[i].direction == "forward"){
                    datesForward.push(this.getDateFromInt(this.state.trains[i].time));
                }
                else{
                    datesReverse.push(this.getDateFromInt(this.state.trains[i].time));
                }
            }
            let readyDatesForward = [];
            let readyDatesReverse = [];
            for(let i = 0; i < datesForward.length; i++){
                let found = false;
                let index = -1;
                for(let j = 0; j < readyDatesForward.length; j++){
                    if(readyDatesForward[j][0] == datesForward[i][0]){
                        found = true;
                        index = j;
                        break;
                    }
                    index = j;
                }
                if(found){
                    readyDatesForward[index][2].push([datesForward[i][2],datesForward[i][3]]);
                }
                else{
                    readyDatesForward.push([datesForward[i][0],datesForward[i][1] ,[datesForward[i]]]);
                    readyDatesForward[index+1][2].push([datesReverse[i][2], datesReverse[i][3]]);
                }
            }
            for(let i = 0; i < datesReverse.length; i++){
                let found = false;
                let index = -1;
                for(let j = 0; j < readyDatesReverse.length; j++){
                    if(readyDatesReverse[j][0] == datesReverse[i][0]){
                        found = true;
                        index = j;
                        break;
                    }
                    index = j;
                }
                if(found){
                    readyDatesReverse[index][2].push([datesReverse[i][2],datesReverse[i][3]]);
                }
                else{
                    readyDatesReverse.push([datesReverse[i][0],datesReverse[i][1] , [datesReverse[i]]]);
                    readyDatesReverse[index+1][2].push([datesReverse[i][2], datesReverse[i][3]]);
                }
            }
            
            readyDatesReverse = readyDatesReverse.sort((a,b) => {
               return parseInt(a[1]) - parseInt(b[1]); 
            });

            readyDatesForward = readyDatesForward.sort((a,b) => {
                return parseInt(a[1]) - parseInt(b[1]);
            });

            for(let i = 0; i < readyDatesReverse.length; i++){
                readyDatesReverse[i][2] = readyDatesReverse[i][2].sort((a,b) => {
                    return parseInt(a[1]) - parseInt(b[1]);
                })
            }
            for(let i = 0; i < readyDatesForward.length; i++){
                readyDatesForward[i][2] = readyDatesForward[i][2].sort((a,b) => {
                    return parseInt(a[1]) - parseInt(b[1]);
                })
            }
            console.log(readyDatesReverse);
            return(
                <div className={this.state.className}>
                    <div className="DirectionContainer">
                        <div className="CheckHoursRelation">{"relacji: "+this.props.begin+" - "+this.props.end}</div>
                        {readyDatesForward.map(data =>
                            <div className="displayedHourContainer">
                                {data[2].map(hour =>
                                    <div className="displayedHour">
                                        {hour[0]}
                                    </div>
                                )}
                                <div className="clear"></div>
                            </div>
                        )}
                    </div>
                    <div className="DirectionContainer">
                        <div className="CheckHoursRelation">{"relacji: "+this.props.end+" - "+this.props.begin}</div>
                        {readyDatesReverse.map(data =>
                            <div className="displayedHourContainer">
                                {data[2].map(hour =>
                                    <div className="displayedHour">
                                        {hour[0]}
                                    </div>
                                )}
                                <div className="clear"></div>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
    }
}

export default CheckHours;