import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import Root from './views/Root';
import * as serviceWorker from './serviceWorker';
import useGlobalStore from "./store/useGlobalStore";
import Context from "./store/context";
import {AuthContext, AuthProvider} from "./Auth";

const Index = ({children}) => {
    const store = useGlobalStore({subjects:[],assignments:[],done:[]});
    return (
        <Context.Provider value={store}>
            {children}
        </Context.Provider>
    )
};

ReactDOM.render(
  <React.StrictMode>
      <AuthProvider>
        <Index>
            <Root />
        </Index>
      </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
