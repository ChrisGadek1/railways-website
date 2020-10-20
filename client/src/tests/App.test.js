import React from 'react';
import { shallow } from 'enzyme';
import App from '../components/App';
import HeaderApp from "../components/HeaderApp";
import {mount} from "enzyme";
import { MemoryRouter } from 'react-router-dom';
import MainContent from "../components/mainSite/MainContent";
import Footer from "../components/Footer";



it('renders without crashing', () => {
  shallow(<App />);
});

it("renders with HeaderApp", ()=> {
  const app = shallow(<App />);
  expect(app.containsMatchingElement(<HeaderApp />));
});

it("renders with Footer", ()=> {
    const app = shallow(<App />);
    expect(app.containsMatchingElement(<Footer />));
});
