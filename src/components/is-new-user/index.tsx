import React from "react";
import {useSelector} from 'react-redux';
import {isNewUser} from '../../workflow';
import {RootState} from "../../store";

interface Props {
    children: React.ReactNode
}
const IsNewUser = ({children}: Props) => {
    const user = useSelector((state: RootState) => state.user);
    const preferences = useSelector((state: RootState) => state.preferences);
    return isNewUser(user, preferences) ? <>{children}</> : null
};

export default IsNewUser;