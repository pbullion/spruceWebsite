import React from 'react';
import HomePage from './HomePage';
import {MyContext} from "../../contexts/MyContext";

export default () => (
    <MyContext.Consumer>
        {() => <HomePage />}
    </MyContext.Consumer>
)
