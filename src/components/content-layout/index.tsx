import React from 'react';
import * as R from 'ramda';
import Grid, {
    GridContentAlignment,
    GridDirection,
    GridItemsAlignment,
    GridJustification, GridSize, GridSpacing,
    GridWrap
} from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    breakpointSpacing: {
        marginBottom: 0,
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing(1)
        },
        [theme.breakpoints.up('md')]: {
            marginBottom: theme.spacing(2)
        },
        [theme.breakpoints.up('lg')]: {
            marginBottom: theme.spacing(2.5)
        },
        [theme.breakpoints.up('xl')]: {
            marginBottom: theme.spacing(3)
        }
    }
}));

/**
 * https://www.w3schools.com/cssref/pr_text_text-align.asp
 */
export type TextAlign = 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';

const waterfallValues = (defaultValue: GridSize, valueArray: GridSize[] = []): GridSize[] => {
    const len = valueArray.length;
    if (valueArray.length > 0) {
        const value = valueArray[0] || defaultValue;
        if (len > 1) {
            return [value, ...(waterfallValues(value, R.takeLast(len - 1, valueArray)))];
        }
        return [value];
    }
    return [];
};

const selectTruthyResults = (array: any[] | React.ReactNode) => {
    const list = ([] as any[]).concat(array);
    return R.reduce((acc, element): any => {
        const item = typeof element === 'function'
            ? element()
            : element;

        return item
            ? R.append(item, acc)
            : acc;
    }, [], list);
};

interface ContentLayoutProps {
    alignContent?: GridContentAlignment,
    alignItems?: GridItemsAlignment,
    children: React.ReactNode | React.ReactNodeArray,
    className?: string,
    containerClassName?: string,
    direction?: GridDirection,
    enableBreakpointSpacing?: boolean,
    justify?: GridJustification,
    spacing?: GridSpacing,
    textAlign?: TextAlign,
    wrap?: GridWrap,
    xs?: GridSize,
    sm?: GridSize,
    md?: GridSize,
    lg?: GridSize,
    xl?: GridSize
};

/**
 * @description wraps elements in the flex navigation as implemented by MaterialUI
 *   DEFINITIONS:
 *     container - wraps flexbox items in a flexbox container
 *     item(s) - wraps element(s) in a flexbox item
 *     element(s) - lowest level of the flexbox navigation; the children of this component
 *   RESOURCES:
 *      https://material-ui.com/api/grid/
 *      https://the-echoplex.net/flexyboxes/
 *      https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 * @param {GridContentAlignment} alignContent - defines alignment for item lines within the container
 * @param {GridItemsAlignment} alignItems - defines alignment perpendicular to the main axis
 * @param {Node} children - element(s), component(s)
 * @param {string} className - jss class on each item
 * @param {string} containerClassName - jss class on the container
 * @param {GridDirection} direction - the main axis; direction in which items will flow in a container
 * @param {boolean} enableBreakpointSpacing - if true, margins between items will scale with screen size
 * @param {GridJustification} justify - defines alignment along the main axis
 * @param {number} spacing - margin between items - ((0 thru 10) * theme spacing unit)px
 * @param {TextAlign} textAlign - element alignment within each item
 * @param {GridWrap} wrap - how to place items overflowing the container
 * @param {number} xs - (auto, 0-12) number of gutters per item at the given breakpoint
 * @param {number} sm - (auto, 0-12) number of gutters per item at the given breakpoint
 * @param {number} md - (auto, 0-12) number of gutters per item at the given breakpoint
 * @param {number} lg - (auto, 0-12) number of gutters per item at the given breakpoint
 * @param {number} xl - (auto, 0-12) number of gutters per item at the given breakpoint
 * @return {*} - jsx
 * @constructor
 */
const ContentLayout = (
    {
        alignContent = 'flex-start',
        alignItems = 'stretch',
        children,
        className,
        containerClassName,
        direction = 'column',
        enableBreakpointSpacing = false,
        justify = 'flex-start',
        spacing = 0,
        textAlign = 'center',
        wrap = 'nowrap',
        xs = 'auto',
        sm = 'auto',
        md= 'auto',
        lg= 'auto',
        xl = 'auto'
    }: ContentLayoutProps
) => {
    const classes = useStyles();
    const x = waterfallValues('auto', [xs, sm, md, lg, xl]);
    const [xsVal, smVal, mdVal, lgVal, xlVal] = x;
    const truthyChildren = selectTruthyResults(children);
    return (
        <Grid
            alignContent={alignContent}
            alignItems={alignItems}
            className={`${containerClassName ? containerClassName : ''}`}
            container={true}
            direction={direction}
            justify={justify}
            spacing={spacing}
            wrap={wrap}
        >
            {(truthyChildren || []).map((child, index) => (
                <Grid
                    className={`${enableBreakpointSpacing ? classes.breakpointSpacing : ''} ${className ? className : ''}`}
                    item={true}
                    key={index}
                    lg={lgVal}
                    md={mdVal}
                    sm={smVal}
                    style={{
                        textAlign: textAlign
                    }}
                    xl={xlVal}
                    xs={xsVal}
                >
                    {child}
                </Grid>
            ))}
        </Grid>
    );
};

export default ContentLayout;
