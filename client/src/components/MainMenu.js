import React from "react";
import MenuElement from "./MenuElement";

class MainMenu extends React.Component{
    render() {
        return(
            <nav className="MainMenuContainer">
                <div className="MainMenu">
                    <ul>
                        <li>
                            <MenuElement option="Strona Główna"/>
                        </li>
                        <li>
                            <MenuElement option="Nasze Linie"/>
                        </li>
                        <li>
                            <MenuElement option="Wyszukaj Połączenie i Kup Bilet"/>
                        </li>
                        <div className="clear"></div>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default MainMenu;