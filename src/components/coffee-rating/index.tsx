import React from 'react';
import {Rating} from "@material-ui/lab";
import {ReactComponent as CoffeeBeanIcon} from "../../img/coffee-bean.svg";
import {makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles<Theme, {beanWidth: number}>((theme: Theme) => ({
    bean: props => ({
        fill: theme.palette.primary.main,
        width: props.beanWidth
    }),
    beanDisabled: props => ({
        fill: theme.palette.action.disabled,
        width: props.beanWidth
    })
}));
interface Props {
    rating: number,
    onRatingChange: ((rating: number) => void) | null,
    readOnly?: boolean,
    beanWidth?: number
}
const CoffeeRating = ({rating, onRatingChange, readOnly = false, beanWidth = 30}: Props) => {
    const classes = useStyles({beanWidth});
    return (
        <Rating
            name={'Rating'}
            value={rating}
            onChange={(e, newValue) => onRatingChange ? onRatingChange(newValue) : null}
            emptyIcon={<CoffeeBeanIcon className={classes.beanDisabled}/>}
            icon={<CoffeeBeanIcon className={classes.bean}/>}
            readOnly={readOnly}
        />
    )
};

export default CoffeeRating;