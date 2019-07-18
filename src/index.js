import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {MyProvider, MyContext} from "./contexts/MyContext";

ReactDOM.render(
    <MyProvider>
        <MyContext.Consumer>
            {() => <App />}
        </MyContext.Consumer>
    </MyProvider>
    , document.getElementById('root'));






serviceWorker.unregister();
