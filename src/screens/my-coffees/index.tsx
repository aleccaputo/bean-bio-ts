import React, {useEffect, useState} from 'react';
import {Coffee, CoffeeState} from '../../ducks/coffeesDuck';
import {useDispatch, useSelector} from 'react-redux';
import {CircularProgress, makeStyles, Typography, List, ListItem, ListItemText, Divider, ListItemSecondaryAction, ListItemIcon, Button, Drawer, Box} from '@material-ui/core';
import {coffeesFetchReset, fetchCoffeesFromDb, deleteCoffeeFromDb} from '../../ducks/coffeesDuck';
import ReactGA from 'react-ga';
import * as R from 'ramda';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DownArrow from '@material-ui/icons/ArrowDownward';
import UpArrow from '@material-ui/icons/ArrowUpward';
import CoffeeRating from "../../components/coffee-rating";
import {RootState} from "../../store";
import ContentLayout from "../../components/content-layout";

enum sortableFields {
    DEFAULT = 'Default',
    RATING = 'Rating',
    COMPANY = 'Company'
}

enum sortDirections {
    ASC = 'ASC',
    DESC = 'DESC'
}

const sortCoffees = (field: sortableFields, direction: sortDirections, coffees?: Array<Coffee>) => {
    switch (field) {
        case sortableFields.RATING:
            if(direction === sortDirections.DESC) {
                return R.sort((a, b) => a.rating > b.rating ? -1 : 1, coffees || []);
            } else {
                return R.sort((a, b) => a.rating < b.rating ? -1 : 1, coffees || []);
            }
        case sortableFields.COMPANY:
            if(direction === sortDirections.DESC) {
                return R.sort((a, b) => (a?.company || '') > (b?.company || '') ? -1 : 1, coffees || []);
            } else {
                return R.sort((a, b) => (a.company || '') < (b.company || '') ? -1 : 1, coffees || []);
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
    const coffees = useSelector((state: RootState) => state.coffees);
    const dispatch = useDispatch();
    const classes = useStyles();

    const [sortBy, setSortBy] = useState(sortableFields.RATING);
    const [sortDirection, setSortDirection] = useState(sortDirections.DESC);
    const [sortListOpen, setSortListOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchCoffeesFromDb(1));
        return () => {
            dispatch(coffeesFetchReset());
            return;
        }
    }, [dispatch]);
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    const sortedCoffees = sortCoffees(sortBy, sortDirection, coffees.coffees);
    const changeSortOrder = (newSort: sortableFields) => {
        if(newSort !== sortBy) {
            setSortBy(newSort);
            setSortDirection(sortDirections.DESC);
        } else {
            setSortDirection(sortDirection === sortDirections.DESC ? sortDirections.ASC : sortDirections.DESC);
        }
        sortCoffees(sortableFields.DEFAULT, sortDirections.DESC);
        setSortListOpen(false);
    };

    return coffees.coffees && !coffees.isFetching
        ?
            <>
                <ContentLayout direction={'row-reverse'}>
                    <Button
                        variant={'text'}
                        onClick={() => setSortListOpen(true)}
                        endIcon={sortDirection === sortDirections.DESC ? <DownArrow/> : <UpArrow/>}
                    >
                        {sortBy}
                    </Button>
                </ContentLayout>
                <List>
                    {sortedCoffees.map((coffee: Coffee, index) => (
                        <>
                            <ListItem key={index} className={classes.card}>
                                <ListItemIcon>
                                    <DeleteIcon onClick={() => coffee.id ? dispatch(deleteCoffeeFromDb(coffee.id)) : null}/>
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{color: 'textPrimary'}} primary={coffee.name} secondary={coffee.company}/>
                               <ListItemSecondaryAction>
                                    <CoffeeRating rating={coffee.rating} onRatingChange={null} readOnly={true} beanWidth={20}/>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider variant='fullWidth' component='li' />
                        </>
                    ))}
                </List>
                <Drawer anchor={'bottom'} open={sortListOpen} onClose={() => setSortListOpen(false)}>
                    <List>
                        <ListItem unselectable={'on'}>
                            <ListItemIcon><i>{''}</i></ListItemIcon>
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
                                        : <ListItemIcon><i>{''}</i></ListItemIcon>
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