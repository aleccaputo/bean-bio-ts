import React, {useEffect, useState} from 'react';
import type {Coffee, CoffeeState} from '../../ducks/coffeesDuck';
import {useDispatch, useSelector} from 'react-redux';
import ScreenLayout from '../../components/screen-layout';
import {makeStyles, MenuItem, TextField} from '@material-ui/core';
import {Rating} from '@material-ui/lab';
import ContentLayout from '../../components/content-layout';
import ActionButtons from '../../components/action-buttons';
import Navigation from '../../components/navigation';
import {BREW_METHODS} from '../../constants';
import {SvgIcon} from '@material-ui/core';
import {ReactComponent as CoffeeBeanIcon} from '../../img/coffee-bean.svg'
import {coffeesFetchReset, saveCoffeeToDb} from '../../ducks/coffeesDuck';
import {useHistory} from 'react-router-dom';
import {HOME} from '../../workflow';
import ReactGA from 'react-ga';

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(4)
    },
    select: {
        width: '50%',
        textAlign: 'left'
    },
    bean: {
        fill: theme.palette.primary.main
    },
    beanDisabled: {
        fill: theme.palette.action.disabled
    }
}));

const NewCoffee = () => {
    const userId: string = useSelector(state => state.user.id);
    const coffeeState: CoffeeState = useSelector(state => state.coffees);
    const dispatch = useDispatch();
    const history = useHistory();

    const [newCoffee: Coffee, setNewCoffee] = useState({
        rating: 0,
        brewMethod: '',
        flavorProfile: '',
        otherObservations: '',
        name: '',
        company: '',
        userId
    });
    const classes = useStyles();

    const updateCoffee = (key, value) => setNewCoffee({...newCoffee, [key]: value});

    const saveFunction = () => {
        dispatch(saveCoffeeToDb(newCoffee));
    };

    useEffect(() => {
        if (coffeeState.fetchSuccess) {
            history.push(HOME);
            dispatch(coffeesFetchReset())
        }
    }, [coffeeState.fetchSuccess, dispatch, history]);
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    return (
        <ContentLayout direction={'column'} xs={12} spacing={2}>
            <TextField
                label={'Brew Method'}
                select={true}
                value={newCoffee.brewMethod}
                onChange={e => updateCoffee('brewMethod', e.target.value)}
                className={classes.select}
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
                label={'Company'}
                value={newCoffee.company}
                onChange={e => updateCoffee('company', e.target.value)}
            />
            <TextField
                label={'Name'}
                value={newCoffee.name}
                onChange={e => updateCoffee('name', e.target.value)}
            />
            <TextField
                label={'Flavor Profile'}
                value={newCoffee.flavorProfile}
                onChange={e => updateCoffee('flavorProfile', e.target.value)}
            />
            <TextField
                label={'Other Observations'}
                value={newCoffee.otherObservations}
                onChange={e => updateCoffee('otherObservations', e.target.value)}
            />
            <SvgIcon>

            </SvgIcon>
            <Rating
                name={'Rating'}
                value={newCoffee.rating}
                onChange={(e, newValue) => updateCoffee('rating', newValue)}
                emptyIcon={<CoffeeBeanIcon className={classes.beanDisabled}/>}
                icon={<CoffeeBeanIcon className={classes.bean}/>}
            />
            <ActionButtons primaryAction={saveFunction}/>
        </ContentLayout>

    );
};

export default NewCoffee;