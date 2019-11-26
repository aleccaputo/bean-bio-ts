// @flow
import React, {useEffect, useState} from 'react';
import {TextField, Button} from '@material-ui/core';
import type {User, UserState} from '../../ducks/userDuck';
import {useDispatch, useSelector} from 'react-redux';
import {saveUserToDb} from '../../ducks/userDuck';
import {Redirect} from 'react-router-dom';
import ContentLayout from '../../components/content-layout';
import {useHistory} from 'react-router-dom';
import {INITIAL_PREFERENCES} from '../../workflow';

const NewUser = () => {
    const userState: UserState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [formUser: User, setFormUser] = useState({firstName: '', lastName: '', id: 1});
    const formIsValid = formUser.lastName && formUser.lastName;
    useEffect(() => {
        if (userState.fetchSuccess && userState.firstName && userState.lastName) {
            history.push(INITIAL_PREFERENCES)
        }
    }, [userState.fetchSuccess, userState.firstName, userState.lastName]);

    return (
        <ContentLayout>
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
                onClick={() => dispatch(saveUserToDb(formUser))}
            >
                {'Save'}
            </Button>
        </ContentLayout>
    )
};

export default NewUser;