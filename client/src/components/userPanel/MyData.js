import React from "react";
import DisplayData from "./DisplayData";

class MyData extends React.Component{
    render() {
        return(
            <div className="MyData">
                <DisplayData  desc="login"/>
                <DisplayData  desc="hasło"/>
                <DisplayData  desc="email"/>
            </div>
        );
    }
}

export default MyData;