// @flow
import React, {useState} from 'react';
import {TextField, Button} from '@material-ui/core';
import type {User, UserState} from '../../ducks/userDuck';
import {useDispatch, useSelector} from 'react-redux';
import {saveUserToDb} from '../../ducks/userDuck';
import {Redirect} from 'react-router-dom';

type Props = {
    db: any
}
const NewUser = ({db}: Props) => {
    const userState: UserState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [formUser: User, setFormUser] = useState({firstName: '', lastName: '', id: 1});
    const formIsValid = formUser.lastName && formUser.lastName;

    return userState.fetchSuccess && userState.firstName && userState.lastName ?
        <Redirect to={'/new-user/preferences'}/>
        : (
            <div>
                <p>{'Please enter some basic information'}</p>
                <TextField
                    label={'First Name'}
                    value={formUser.firstName}
                    onChange={e => setFormUser({...formUser, firstName: e.target.value})}
                />
                <TextField
                    label={'Last Name'}
                    value={formUser.lastName}
                    onChange={e => setFormUser({...formUser, lastName: e.target.value})}
                />
                <Button
                    variant={'contained'}
                    color={'primary'}
                    disabled={userState.isFetching || !formIsValid}
                    onClick={() => dispatch(saveUserToDb(formUser, db))}
                >
                    {'Save'}
                </Button>
            </div>
        )
};

export default NewUser;