// @flow
import moment from 'moment'

export const humanizeTimeOfDay = (): string => {
    const currentHour = moment().format('H');
    if (currentHour >= 16) {
        return 'Evening';
    }
    if (currentHour >= 12) {
        return 'Afternoon'
    }
    return 'Morning'
};