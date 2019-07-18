import React from 'react';
import WaitListPage from './WaitListPage';
import {MyContext} from "../../contexts/MyContext";

export default () => (
    <MyContext.Consumer>
        {() => <WaitListPage />}
    </MyContext.Consumer>
)
