import React from "react";

class UserMenu extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            chosen: this.props.chosen
        }
    }

    setChosen(option){
        this.setState({
            chosen: option
        }, ()=>{
           this.props.getChosen(option);
        });
    }

    render() {
        return(
            <div className={"UserMenu"}>
                {this.props.options.map(option =>
                    <div
                        key={option}
                        className={this.state.chosen == option ? "floatLeft userMenuOption UserMenuChosen" : "floatLeft userMenuOption UserMenuUnchosen"}
                        onClick={ () => this.setChosen(option)}
                    >
                        {option}
                    </div>
                )}
                <div className="clear"></div>
            </div>
        );
    }
}

export default UserMenu;