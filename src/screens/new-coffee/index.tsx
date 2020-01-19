import React, {useEffect, useState} from 'react';
import {Coffee} from '../../ducks/coffeesDuck';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles, MenuItem, TextField, Paper} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';
import ContentLayout from '../../components/content-layout';
import ActionButtons from '../../components/action-buttons';
import {BREW_METHODS} from '../../constants';
import {SvgIcon} from '@material-ui/core';
import {coffeesFetchReset, saveCoffeeToDb} from '../../ducks/coffeesDuck';
import {useHistory} from 'react-router-dom';
import {WorkflowTypeEnum} from '../../workflow';
import ReactGA from 'react-ga';
import CoffeeRating from "../../components/coffee-rating";
import {RootState} from "../../store";

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(4)
    },
    select: {
        minWidth: 200,
        textAlign: 'left'
    }
}));

const NewCoffee = () => {
    const user = useSelector((state: RootState) => state.user);
    const coffeeState = useSelector((state: RootState) => state.coffees);
    const roasters = useSelector((state: RootState) => state.localCoffees.roasters);
    const dispatch = useDispatch();
    const history = useHistory();

    const [hasClickedSave, setHasClickedSave] = useState(false);
    const [newCoffee, setNewCoffee] = useState<Coffee>({
        rating: 0,
        brewMethod: '',
        flavorProfile: '',
        otherObservations: '',
        name: '',
        company: '',
        userId: user.id
    });
    const classes = useStyles();

    const updateCoffee = (key: string, value: any) => setNewCoffee({...newCoffee, [key]: value});

    const saveFunction = () => {
        setHasClickedSave(true);
        dispatch(saveCoffeeToDb(newCoffee));
    };

    const updateRating = (rating: number) => {
        updateCoffee('rating', rating);
    };

    useEffect(() => {
        if (coffeeState.fetchSuccess && hasClickedSave) {
            dispatch(coffeesFetchReset());
            history.push(WorkflowTypeEnum.HOME);
        }
    }, [coffeeState.fetchSuccess, dispatch, history, hasClickedSave]);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    return (
        <Paper>
            <ContentLayout direction={'column'} xs={12} spacing={2}>
                <TextField
                    label={'Brew Method'}
                    select={true}
                    value={newCoffee.brewMethod}
                    onChange={e => updateCoffee('brewMethod', e.target.value)}
                    className={classes.select}
                >
                    {
                        Object.keys(BREW_METHODS).sort().map(method => (
                            <MenuItem key={method} value={method}>
                                {BREW_METHODS[method]}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <Autocomplete
                    freeSolo={true}
                    options={roasters.map(roaster => roaster)}
                    renderInput={params => <TextField {...params} value={newCoffee.company} label={'Roaster'} className={classes.select} onChange={e => updateCoffee('company', e.target.value)}/>}
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
                <CoffeeRating rating={newCoffee.rating} onRatingChange={updateRating}/>
                <ActionButtons primaryAction={saveFunction}/>
            </ContentLayout>
        </Paper>

    );
};

export default NewCoffee;