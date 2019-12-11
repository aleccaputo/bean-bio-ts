import React, {useEffect, useState} from 'react';
import type {Coffee, CoffeeState} from '../../ducks/coffeesDuck';
import {useDispatch, useSelector} from 'react-redux';
import {CircularProgress, makeStyles, Typography, List, ListItem, ListItemText, Divider, ListItemSecondaryAction, ListItemIcon, Button, Drawer, Box} from '@material-ui/core';
import {coffeesFetchReset, fetchCoffeesFromDb, deleteCoffeeFromDb} from '../../ducks/coffeesDuck';
import ReactGA from 'react-ga';
import * as R from 'ramda';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DownArrow from '@material-ui/icons/ArrowDownward';
import UpArrow from '@material-ui/icons/ArrowUpward';

const sortableFields = {
    RATING: 'Rating',
    COMPANY: 'Company'
};
const sortDirections = {
    ASC: 'ASC',
    DESC: 'DESC'
};

const sortCoffees = (field, direction, coffees) => {
    switch (field) {
        case sortableFields.RATING:
            if(direction === sortDirections.DESC) {
                return R.sort((a, b) => a.rating > b.rating ? -1 : 1, coffees || []);
            } else {
                return R.sort((a, b) => a.rating < b.rating ? -1 : 1, coffees || []);
            }
        case sortableFields.COMPANY:
            if(direction === sortDirections.DESC) {
                return R.sort((a, b) => a.company > b.company ? -1 : 1, coffees || []);
            } else {
                return R.sort((a, b) => a.company < b.company ? -1 : 1, coffees || []);
            }
        default:
            return R.sort((a, b) => a.rating > b.rating ? -1 : 1, coffees || []);
    }
};

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(1)
    }
}));

const MyCoffees = () => {
    const coffees: CoffeeState = useSelector(state => state.coffees);
    const dispatch = useDispatch();
    const classes = useStyles();

    const [sortBy, setSortBy] = useState(sortableFields.RATING);
    const [sortDirection, setSortDirection] = useState(sortDirections.DESC);
    const [sortListOpen, setSortListOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchCoffeesFromDb(1));
        return () => dispatch(coffeesFetchReset())
    }, [dispatch]);
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    const sortedCoffees = sortCoffees(sortBy, sortDirection, coffees.coffees);
    const changeSortOrder = (newSort) => {
        if(newSort !== sortBy) {
            setSortBy(newSort);
            setSortDirection(sortDirections.DESC);
        } else {
            setSortDirection(sortDirection === sortDirections.DESC ? sortDirections.ASC : sortDirections.DESC);
        }
        sortCoffees();
        setSortListOpen(false);
    };

    return coffees.coffees && !coffees.isFetching
        ?
            <>
                <div align={'right'}>
                    <Button
                        variant={'text'}
                        onClick={() => setSortListOpen(true)}
                        endIcon={sortDirection === sortDirections.DESC ? <DownArrow/> : <UpArrow/>}
                    >
                        {sortBy}
                    </Button>
                </div>
                <List>
                    {sortedCoffees.map((coffee: Coffee, index) => (
                        <>
                            <ListItem key={index} className={classes.card}>
                                <ListItemIcon>
                                    <DeleteIcon onClick={() => dispatch(deleteCoffeeFromDb(coffee.id))}/>
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{color: 'textPrimary'}} primary={`${coffee.company} ${coffee.name}`} secondary={`${coffee.rating} stars`}/>
{/*                                <ListItemSecondaryAction>
                                    <EditIcon color={'secondary'}/>
                                </ListItemSecondaryAction>*/}
                            </ListItem>
                            <Divider variant='fullWidth' component='li' />
                        </>
                    ))}
                </List>
                <Drawer anchor={'bottom'} open={sortListOpen} onClose={() => setSortListOpen(false)}>
                    <List>
                        <ListItem unselectable={'on'}>
                            <ListItemIcon>{''}</ListItemIcon>
                            <ListItemText primary={<Typography>{'Sort by'}</Typography>}/>
                        </ListItem>
                        <Divider variant='fullWidth' component='li' />
                        {Object.values(sortableFields).map(field => (
                            <>
                                <ListItem key={field} selected={field === sortBy} onClick={() => changeSortOrder(field)}>
                                    {field === sortBy ?
                                        <ListItemIcon>
                                            {sortDirection === sortDirections.DESC ? <DownArrow/> : <UpArrow/>}
                                        </ListItemIcon>
                                        : <ListItemIcon>{''}</ListItemIcon>
                                    }
                                    <ListItemText primary={<Typography>{field}</Typography>}/>
                                </ListItem>
                            </>
                        ))}
                    </List>
                </Drawer>
            </>
        : <CircularProgress/>
};

export default MyCoffees;