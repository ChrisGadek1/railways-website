import React from 'react';
import { render } from '@testing-library/react';
import HeaderApp from "../components/HeaderApp";
import { shallow } from 'enzyme';

it("renderuje headera", ()=>{
    const headerApp = render(
        <HeaderApp />
    );
})