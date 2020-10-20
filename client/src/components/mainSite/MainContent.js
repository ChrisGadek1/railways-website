import React from "react";
import BreakingNews from "./BreakingNews";

class MainContent extends React.Component{
    render() {
        return(
            <article className="MainContentContainer">
                <div className="MainContent">
                    <div className="Aktualnosci">Aktualności</div>
                    <BreakingNews />
                    <BreakingNews />
                </div>
            </article>
        );
    }
}

export default MainContent;