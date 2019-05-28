import ActionTypes from './ActionTypes';
import ByTypes from './ByTypes';
const date = (new Date()).getFullYear() - 5;

export default (store = { data: [], error: null, selectedMonth: null, by: "YEARS", updateLoading: false, loading: true, selectedYear: date, range: { first: date, last: date + 6 } }, action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.SUCCESS:
            return {
                ...store,
                loading: false,
                updateLoading: false,
                ...payload
            };
        case ActionTypes.ERROR:
            return {
                ...store,
                error: payload.error
            }
        case ActionTypes.REQUEST:
            return { ...store, ...payload, loading: true }
        case ActionTypes.UPDATE:
            return { ...store, updateLoading: true }
        default: return store;
    }
}


function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    return days.map(day => ({ first: day }));
}

function getMonthsInYear(year) {
    var month = 0;
    var monthIntervals = [];
    while (month < 12) {
        monthIntervals.push({ first: new Date(year, month, 1), last: new Date(year, month + 1, 0) })
        month++
    }
    return monthIntervals;
}

function getYears(first, last) {
    return [...Array(last - first).keys()].map(i => {
        const dates = ({ first: new Date(first + i, 0, 1), last: new Date(first + i, 11, 31) })
        return dates;
    })
}

const twoDigits = number => ("0" + number).slice(-2);

export const gitIsoDate = date =>
    `${date.getFullYear()}-${twoDigits(date.getUTCMonth() + 1)}-${twoDigits(date.getUTCDate())}`

const getSearchQuery = (Profile) => ({ first, last }) => {
    const { name, type } = Profile;
    const [lowerName, lowerType] = [name && name.toLowerCase(), type && type.toLowerCase()];
    const withLast = last ? `..${gitIsoDate(last)}` : '';
    const withFirst = first ? ` created:${gitIsoDate(first)}` : '';
    const withProfile = lowerType ? `${lowerType}:${lowerName}` : ''
    return `${withProfile}${withFirst}${withLast}`;
}

export const getDateIntervalsQueries = (Profile, RepositoryData) => {
    const { by, selectedYear, selectedMonth, range: { first, last } } = RepositoryData;
    const getSearchQueries = (interval) =>
        ({ value: getSearchQuery(Profile)(interval), interval });
    switch (by) {
        case ByTypes.MONTHS:
            return getMonthsInYear(selectedYear).map(getSearchQueries);
        case ByTypes.YEARS:
            return getYears(first, last).map(getSearchQueries);
        case ByTypes.DAYS:
            return getDaysInMonth(selectedMonth, selectedYear).map(getSearchQueries);
        default:
            return null
    }
}
