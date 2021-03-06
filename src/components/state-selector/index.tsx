import React from 'react';
import {MenuItem, TextField} from "@material-ui/core";

const states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
const statesDropdown = () => (
    states.map(state => (
        <MenuItem key={state} value={state}>
            {state}
        </MenuItem>
    ))
);

interface Props {
    currentState: string,
    updateState: (abbreviation: string) => void,
    className?: string
};
const StateSelector = ({currentState, updateState, className}: Props) => {
    return (
        <TextField
            className={className}
            label={'State'}
            value={currentState}
            select={true}
            onChange={e => updateState(e.target.value)}
        >
            {statesDropdown()}
        </TextField>
    )
};

export default StateSelector;