import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import type {UserState} from '../../ducks/userDuck';
import {TextField, Typography, MenuItem, Button} from '@material-ui/core';
import type {Preferences, PreferencesState} from '../../ducks/preferencesDuck';
import {BREW_METHODS, ROAST_LEVELS, COUNTRIES_OF_ORIGIN} from '../../constants';
import {savePreferencesToDb} from '../../ducks/preferencesDuck';
import {Redirect} from 'react-router-dom';

const UserPreferences = ({db}) => {
    const user: UserState = useSelector(state => state.user);
    const preferences: PreferencesState = useSelector(state => state.preferences);
    const dispatch = useDispatch();
    const [formPrefs: Preferences, setFormPrefs] = useState({
        roastLevel: preferences.roastLevel || '',
        brewMethod: preferences.brewMethod || '',
        origin: preferences.origin || '',
        company: preferences.company || ''
    });

    const formIsValid = formPrefs.roastLevel && formPrefs.company && formPrefs.brewMethod && formPrefs.roastLevel;

    return preferences.fetchSuccess && preferences.roastLevel && preferences.brewMethod && preferences.origin && preferences.company
        ? <Redirect to={'/'}/>
        : (
            <div>
                <Typography
                    variant={'h5'}>{`Thanks, ${user.firstName}. Please select some initial preferences.`}</Typography>
                <TextField
                    label={'Favorite Brew Method?'}
                    value={formPrefs.brewMethod}
                    onChange={e => setFormPrefs({...formPrefs, brewMethod: e.target.value})}
                    select={true}
                    fullWidth={true}
                >
                    {
                        Object.keys(BREW_METHODS).map(method => (
                            <MenuItem key={method} value={method}>
                                {BREW_METHODS[method]}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <TextField
                    label={'Favorite Roast Level?'}
                    value={formPrefs.roastLevel}
                    onChange={e => setFormPrefs({...formPrefs, roastLevel: e.target.value})}
                    select={true}
                    fullWidth={true}
                >
                    {
                        Object.keys(ROAST_LEVELS).map(level => (
                            <MenuItem key={level} value={level}>
                                {ROAST_LEVELS[level]}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <TextField
                    label={'Favorite Country of Origin?'}
                    value={formPrefs.origin}
                    onChange={e => setFormPrefs({...formPrefs, origin: e.target.value})}
                    select={true}
                    fullWidth={true}
                >
                    {
                        Object.keys(COUNTRIES_OF_ORIGIN).map(country => (
                            <MenuItem key={country} value={country}>
                                {COUNTRIES_OF_ORIGIN[country]}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <TextField
                    label={'Favorite Company?'}
                    value={formPrefs.company}
                    onChange={e => setFormPrefs({...formPrefs, company: e.target.value})}
                    fullWidth={true}
                />
                <Button
                    onClick={() => dispatch(savePreferencesToDb({...formPrefs, userId: user.id}, db))}
                    disabled={preferences.isFetching || !formIsValid}
                    color={'primary'}
                    variant={'contained'}
                >
                    {'Save'}
                </Button>
            </div>
        )
};

export default UserPreferences;