import DidntFound from "../components/404error/DidntFound";
import LinesContainer from "../components/Lines/LinesContainer";
import findContainer from "../components/findConnections/findContainer";
import MainPanel from "../components/userPanel/MainPanel";
import RegisterPanelContainer from "../components/registerPanel/RegisterPanelContainer";
import EndRegister from "../components/confirmRegister/EndRegister";
import LoginContainer from "../components/loginPanel/LoginContainer";
import {mount} from "enzyme";
import MainContent from "../components/mainSite/MainContent";
import React from "react";
import Routes from "../routes";
import {MemoryRouter} from "react-router";


describe("routes redirect to correct components while signed in", ()=>{
    const components = [MainContent, RegisterPanelContainer, EndRegister, LoginContainer, MainPanel, findContainer,LinesContainer,DidntFound]
    const entries = [ "/", "/register", "/confirmRegister", "/login", "/user", "/search", "/lines","/unknown"];
    for(let i = 0; i < components.length; i++){
        it("test route: "+entries[i], ()=> {
            const wrapper = mount(
                <MemoryRouter initialEntries={ [ entries[i] ] }>
                    <Routes isLogged={true}/>
                </MemoryRouter>
            );
            expect(wrapper.find(components[i])).toHaveLength(1);
        });
    }

})

describe("routes redirect to correct components while signed out", ()=>{
    const components = [MainContent, RegisterPanelContainer, EndRegister, LoginContainer, MainContent, findContainer,LinesContainer,DidntFound]
    const entries = [ "/", "/register", "/confirmRegister", "/login", "/user", "/search", "/lines","/unknown"];
    for(let i = 0; i < components.length; i++){
        it("test route: "+entries[i], ()=> {
            const wrapper = mount(
                <MemoryRouter initialEntries={ [ entries[i] ] }>
                    <Routes isLogged={false}/>
                </MemoryRouter>
            );
            expect(wrapper.find(components[i])).toHaveLength(1);
        });
    }

})