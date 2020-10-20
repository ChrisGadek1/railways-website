import React from "react";

class LoginComponent extends React.Component{

    getData = (event) => {
        event.persist();
        this.props.getData(event.target.value);
    }

    render() {
        return(
            <div>
                <label htmlFor={this.props.id} >{this.props.message}</label>
                <input type={this.props.type} id={this.props.id} onInput={this.getData}/>
            </div>
        );
    }
}

export default LoginComponent