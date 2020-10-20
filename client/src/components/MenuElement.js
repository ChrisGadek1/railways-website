import React from "react";

class MenuElement extends React.Component{
    constructor(props) {
        super(props);

    }

    redirect = () => {
        if(this.props.option == "Strona Główna"){
            window.location.href = "/";
        }
        else if(this.props.option == "Nasze Linie"){
            window.location.href = "/lines";
        }
        else if(this.props.option == "Wyszukaj Połączenie i Kup Bilet"){
            window.location.href = "/search";
        }
    }

    render(){
        const option = this.props.option;
        return(
            <div className="MenuElement" onClick={this.redirect}>
                <div >{option}</div>
            </div>
        );
    }
}

export default MenuElement;