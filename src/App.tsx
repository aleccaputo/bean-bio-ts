import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import {Provider} from 'react-redux';
import AppStore from './store';
import NewUser from './screens/new-user';
import UserPreferences from './screens/preferences';
import Init from './screens/init';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import {createMuiTheme} from '@material-ui/core';
import Home from './screens/home';
import brown from '@material-ui/core/colors/brown';
import orange from '@material-ui/core/colors/orange';
import ScreenLayout from './components/screen-layout';
import {WorkflowTypeEnum} from './workflow';
import IsNewUser from './components/is-new-user';
import IsExistingUser from './components/is-existing-user';
import NewCoffee from './screens/new-coffee';
import MyCoffees from './screens/my-coffees';
import Navigation from './components/navigation';
import ReactGA from 'react-ga';
import Profile from "./screens/profile";
import {humanizeTimeOfDay} from "./utilities";

ReactGA.initialize('myKey');
if(window.location.hostname === 'localhost') {
    // @ts-ignore
    window['ga-myKey'] = true;
}

const App = () => (
    <Provider store={AppStore}>
        <ThemeProvider theme={createMuiTheme({
            palette: {
                primary: brown,
                secondary: orange,
                type: humanizeTimeOfDay() === 'Evening' ? 'dark' : 'light'
            },
            typography: {
                button: {
                    textTransform: 'none'
                }
            }
        })}>
            <ScreenLayout>
                <Init>
                    <IsNewUser>
                        <Router>
                            <Switch>
                                <Route exact={true} path={'/'}>
                                    <Redirect to={WorkflowTypeEnum.NEW_USER}/>
                                </Route>
                                <Route path={WorkflowTypeEnum.NEW_USER}>
                                    <NewUser/>
                                </Route>
                                <Route path={WorkflowTypeEnum.INITIAL_PREFERENCES}>
                                    <UserPreferences/>
                                </Route>
                            </Switch>
                        </Router>
                    </IsNewUser>
                    <IsExistingUser>
                        <Router>
                            <Navigation>
                                <Switch>
                                    <Route exact={true} path={[WorkflowTypeEnum.HOME, WorkflowTypeEnum.INITIAL_PREFERENCES]}>
                                        <Home/>
                                    </Route>
                                    <Route path={WorkflowTypeEnum.NEW_COFFEE}>
                                        <NewCoffee/>
                                    </Route>
                                    <Route path={WorkflowTypeEnum.MY_COFFEES}>
                                        <MyCoffees/>
                                    </Route>
                                    <Route path={WorkflowTypeEnum.PROFILE}>
                                        <Profile/>
                                    </Route>
                                </Switch>
                            </Navigation>
                        </Router>
                    </IsExistingUser>
                </Init>
            </ScreenLayout>
        </ThemeProvider>
    </Provider>
);
export default App;
