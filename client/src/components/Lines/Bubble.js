import React from "react";

class Bubble extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            newClass: ""
        }
    }

    static getDerivedStateFromProps(props, state){
        return{
            newClass: props.newClass
        }
    }

    render() {
        return(
            <div className={"bubbleContainer"+" "+"notDisplay"+" "+this.state.newClass}>
                <div className={"bubble bubble-bottom-left"}>
                    {"czas dojazdu w minutach: "+this.props.minutes}
                </div>
            </div>
        );
    }
}

export default Bubble;