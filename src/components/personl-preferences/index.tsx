import React, {Dispatch, SetStateAction} from 'react';
import {MenuItem, TextField, Theme} from "@material-ui/core";
import {BREW_METHODS, COUNTRIES_OF_ORIGIN, ROAST_LEVELS} from "../../constants";
import ContentLayout from "../content-layout";
import {makeStyles} from "@material-ui/styles";
import {Preferences, PreferencesState} from '../../ducks/preferencesDuck';

const useStyles = makeStyles((theme: Theme) => ({
    select: {
        width: '50%',
        [theme.breakpoints.down('xs')]: {
            width: '90%'
        }
    }
}));

interface Props {
    updateFunction: Dispatch<SetStateAction<Preferences>>,
    currentState: Preferences
}
const PersonalPreferences = ({updateFunction, currentState}: Props) => {
    const classes = useStyles();
    return (
        <ContentLayout spacing={2}>
            <TextField
                className={classes.select}
                label={'Favorite Brew Method?'}
                inputProps={{
                    style: {textAlign: 'left'}
                }}
                value={currentState.brewMethod}
                onChange={e => updateFunction({...currentState, brewMethod: e.target.value})}
                select={true}
            >
                {
                    Object.keys(BREW_METHODS).sort().map(method => (
                        <MenuItem key={method} value={method}>
                            {BREW_METHODS[method]}
                        </MenuItem>
                    ))
                }
            </TextField>
            <TextField
                inputProps={{
                    style: {textAlign: 'left'}
                }}
                className={classes.select}
                label={'Favorite Roast Level?'}
                value={currentState.roastLevel}
                onChange={e => updateFunction({...currentState, roastLevel: e.target.value})}
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
                inputProps={{
                    style: {textAlign: 'left'}
                }}
                className={classes.select}
                label={'Favorite Country of Origin?'}
                value={currentState.origin}
                onChange={e => updateFunction({...currentState, origin: e.target.value})}
                select={true}
            >
                {
                    Object.keys(COUNTRIES_OF_ORIGIN).sort().map(country => (
                        <MenuItem key={country} value={country}>
                            {COUNTRIES_OF_ORIGIN[country]}
                        </MenuItem>
                    ))
                }
            </TextField>
            <TextField
                inputProps={{
                    style: {textAlign: 'left'}
                }}
                className={classes.select}
                label={'Favorite Company?'}
                value={currentState.company}
                onChange={e => updateFunction({...currentState, company: e.target.value})}
            />
        </ContentLayout>
    )
};

export default PersonalPreferences;