import React from "react";

class DidntFound extends React.Component{
    render() {
        return(
            <div className="DidntFoundWrapper">
                <div className="DidntFound">
                    <div className="Error404Title">Błąd 404!</div>
                    <div>Szukana Strona nie istnieje</div>
                </div>
            </div>
        );
    }
}

export default DidntFound;