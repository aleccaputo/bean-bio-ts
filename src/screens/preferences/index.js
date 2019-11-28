import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import type {UserState} from '../../ducks/userDuck';
import {TextField, Typography, MenuItem, Button} from '@material-ui/core';
import type {Preferences, PreferencesState} from '../../ducks/preferencesDuck';
import {BREW_METHODS, ROAST_LEVELS, COUNTRIES_OF_ORIGIN} from '../../constants';
import {savePreferencesToDb} from '../../ducks/preferencesDuck';
import {useHistory} from 'react-router-dom';
import ContentLayout from '../../components/content-layout';
import {makeStyles} from '@material-ui/styles';
import {NEW_USER} from '../../workflow';

const useStyles = makeStyles(theme => ({
    select: {
        width: '50%',
        [theme.breakpoints.down('xs')]: {
            width: '90%'
        }
    }
}));
const UserPreferences = () => {
    const user: UserState = useSelector(state => state.user);
    const preferences: PreferencesState = useSelector(state => state.preferences);
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const [formPrefs: Preferences, setFormPrefs] = useState({
        roastLevel: preferences.roastLevel || '',
        brewMethod: preferences.brewMethod || '',
        origin: preferences.origin || '',
        company: preferences.company || ''
    });

    useEffect(() => {
        if(!user.firstName || !user.lastName) {
            history.push(NEW_USER);
        }
    }, [user.firstName, user.lastName, history]);
    const formIsValid = formPrefs.roastLevel && formPrefs.company && formPrefs.brewMethod && formPrefs.roastLevel;

    return (
            <ContentLayout spacing={2}>
                <Typography
                    variant={'h5'}>{`Thanks, ${user.firstName}. Please select some initial preferences.`}</Typography>
                <TextField
                    className={classes.select}
                    label={'Favorite Brew Method?'}
                    value={formPrefs.brewMethod}
                    onChange={e => setFormPrefs({...formPrefs, brewMethod: e.target.value})}
                    select={true}
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
                    className={classes.select}
                    label={'Favorite Roast Level?'}
                    value={formPrefs.roastLevel}
                    onChange={e => setFormPrefs({...formPrefs, roastLevel: e.target.value})}
                    select={true}
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
                    className={classes.select}
                    label={'Favorite Country of Origin?'}
                    value={formPrefs.origin}
                    onChange={e => setFormPrefs({...formPrefs, origin: e.target.value})}
                    select={true}
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
                    className={classes.select}
                    label={'Favorite Company?'}
                    value={formPrefs.company}
                    onChange={e => setFormPrefs({...formPrefs, company: e.target.value})}
                />
                <Button
                    onClick={() => dispatch(savePreferencesToDb({...formPrefs, userId: user.id}))}
                    disabled={preferences.isFetching || !formIsValid}
                    color={'primary'}
                    variant={'contained'}
                >
                    {'Save'}
                </Button>
            </ContentLayout>
        )
};

export default UserPreferences;