import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Provider} from 'react-redux';
import AppStore from './store/index';
import NewUser from './screens/new-user';
import UserPreferences from './screens/preferences';
import Init from './screens/init';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import {createMuiTheme} from '@material-ui/core';
import Home from './screens/home';
import brown from '@material-ui/core/colors/brown';
import orange from '@material-ui/core/colors/orange';
import ScreenLayout from './components/screen-layout';
import {HOME, INITIAL_PREFERENCES, MY_COFFEES, NEW_COFFEE, NEW_USER} from './workflow';
import IsNewUser from './components/is-new-user';
import IsExistingUser from './components/is-existing-user';
import NewCoffee from './screens/new-coffee';
import MyCoffees from './screens/my-coffees';

const App = () => (
    <Provider store={AppStore}>
        <ThemeProvider theme={createMuiTheme({
            palette: {
                primary: brown,
                secondary: orange
            }
        })}>
            <ScreenLayout>
                <Init>
                    <IsNewUser>
                        <Router>
                            <Switch>
                                <Route exact={true} path={NEW_USER}>
                                    <NewUser/>
                                </Route>
                                <Route path={INITIAL_PREFERENCES}>
                                    <UserPreferences/>
                                </Route>
                            </Switch>
                        </Router>
                    </IsNewUser>
                    <IsExistingUser>
                        <Router>
                            <Switch>
                                <Route exact={true} path={HOME}>
                                    <Home/>
                                </Route>
                                <Route path={NEW_COFFEE}>
                                    <NewCoffee/>
                                </Route>
                                <Route path={MY_COFFEES}>
                                    <MyCoffees/>
                                </Route>
                            </Switch>
                        </Router>
                    </IsExistingUser>
                </Init>
            </ScreenLayout>
        </ThemeProvider>
    </Provider>
);
export default App;
