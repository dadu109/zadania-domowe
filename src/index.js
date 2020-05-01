import React from 'react';
import ReactDOM from 'react-dom';
import Root from './views/Root';
import * as serviceWorker from './serviceWorker';
import useGlobalStore from "./store/useGlobalStore";
import Context from "./store/context";
import {assignments} from "./utils";

const Index = ({children}) => {
    const store = useGlobalStore(assignments);
    return (
        <Context.Provider value={store}>
            {children}
        </Context.Provider>
    )
};

ReactDOM.render(
  <React.StrictMode>
    <Index>
        <Root />
    </Index>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
