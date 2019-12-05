// @flow
import React from 'react';
import {MenuItem, TextField} from "@material-ui/core";
import {BREW_METHODS, COUNTRIES_OF_ORIGIN, ROAST_LEVELS} from "../../constants";
import ContentLayout from "../content-layout";
import type {Preferences, PreferencesState} from "../../ducks/preferencesDuck";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    select: {
        width: '50%',
        [theme.breakpoints.down('xs')]: {
            width: '90%'
        }
    }
}));

type Props = {
    updateFunction: Preferences => void,
    currentState: PreferencesState
}
const PersonalPreferences = ({updateFunction, currentState}: Props) => {
    const classes = useStyles();
    return (
        <ContentLayout spacing={2}>
            <TextField
                align={'left'}
                className={classes.select}
                label={'Favorite Brew Method?'}
                value={currentState.brewMethod}
                onChange={e => updateFunction({...currentState, brewMethod: e.target.value})}
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
                align={'left'}
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
                align={'left'}
                className={classes.select}
                label={'Favorite Country of Origin?'}
                value={currentState.origin}
                onChange={e => updateFunction({...currentState, origin: e.target.value})}
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
                align={'left'}
                className={classes.select}
                label={'Favorite Company?'}
                value={currentState.company}
                onChange={e => updateFunction({...currentState, company: e.target.value})}
            />
        </ContentLayout>
    )
};

export default PersonalPreferences;