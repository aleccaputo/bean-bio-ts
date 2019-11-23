import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Welcome from "./screens/welcome";
import db from './db/index';
import {Provider} from 'react-redux';
import AppStore from './store/index';
import NewUser from "./screens/new-user";
import UserPreferences from './screens/preferences';
import Init from './screens/init';

const App = () => (
    <Provider store={AppStore}>
        <Init db={db}>
            <Router>
                <Switch>
                    <Route exact={true} path={"/"}>
                        <Welcome db={db}/>
                    </Route>
                    <Route exact={true} path={"/new-user"}>
                        <NewUser db={db}/>
                    </Route>
                    <Route exact={true} path={"/new-user/preferences"}>
                        <UserPreferences db={db}/>
                    </Route>
                </Switch>
            </Router>
        </Init>
    </Provider>
)
export default App;
