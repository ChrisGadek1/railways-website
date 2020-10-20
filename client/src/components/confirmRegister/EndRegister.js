import React from "react";

class EndRegister extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="endRegisterContainer">
                <div className="endRegister">
                    Dziękujemy za rejestracje w naszym serwisie!<br/> Można zalogować się na nowo utworzone
                    konto pod <a href="/login">tym adresem</a>
                </div>
            </div>
        );

    }
}

export default EndRegister;