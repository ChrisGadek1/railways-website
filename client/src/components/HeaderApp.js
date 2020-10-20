import React from "react";
import LoginPanel from "./LoginPanel";
import MainMenu from "./MainMenu";

class HeaderApp extends React.Component{

    constructor(props) {
        super(props);
    }

    redirectToMain = () => {
        window.location.href = "/";
    }

    isLogged = (logged) => {
        this.props.isLogged(logged)
    }


    render() {
        return (
            <header className="HeaderAppContainer">
                <div className="HeaderApp">
                    <LoginPanel isLogged={this.isLogged} />
                    <div className="TitleContainer">
                        <div className="Title" onClick={this.redirectToMain}>
                            <i className="icon-train"></i>
                            Sieniczniańskie Linie Kolejowe
                        </div>
                    </div>
                    <MainMenu />
                </div>
            </header>
        );
    }
}

export default HeaderApp;