import React, {SyntheticEvent} from 'react';
import ContentLayout from '../content-layout';
import {Button, makeStyles} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles(() => ({
    container: {
        marginTop: 50
    }
}));

type Props = {
    primaryButtonText?: string,
    primaryAction?: ((e: SyntheticEvent) => void) | null
}
const ActionButtons = ({primaryButtonText = 'Save', primaryAction = null}: Props) => {
    const history = useHistory();
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <ContentLayout direction={'row'} xs={6} alignContent={'center'}>
                <Button variant={'text'} onClick={() => history.goBack()}>
                    {'Back'}
                </Button>
                <Button color={'primary'} variant={'contained'} onClick={primaryAction || undefined}>
                    {primaryButtonText}
                </Button>
            </ContentLayout>
        </div>
    )
};

export default ActionButtons;