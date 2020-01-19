import moment from 'moment'

export const humanizeTimeOfDay = (): string => {
    const currentHour = parseInt(moment().format('H'), 10);
    if (currentHour >= 16) {
        return 'Evening';
    }
    if (currentHour >= 12) {
        return 'Afternoon'
    }
    return 'Morning'
};