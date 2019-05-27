import ActionTypes from './ActionTypes';
import ByTypes from './ByTypes';
const date = (new Date()).getFullYear() - 6;

export default (store = { data: [], by: "YEARS", updateLoading: false, loading: true, selected: date, range: { first: date, last: date + 5 }, parents: { month: null, year: null } }, action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.SUCCESS:
            return {
                ...store,
                loading: false,
                updateLoading: false,
                ...payload
            };
        case ActionTypes.REQUEST:
            return { ...store, loading: true }
        case ActionTypes.UPDATE:
            return { ...store, updateLoading: true }
        default:
            return store;
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

const gitIsoDate = date =>
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
    const { by, parents: { month, year }, range: { first, last } } = RepositoryData;
    const getSearchQueries = (interval) =>
        ({ value: getSearchQuery(Profile)(interval), interval });
    switch (by) {
        case ByTypes.DAYS:
            return getDaysInMonth(month, year).map(getSearchQueries)
        case ByTypes.MONTHS:
            return getMonthsInYear(year).map(getSearchQueries);
        case ByTypes.YEARS:
            return getYears(first, last).map(getSearchQueries);
        default:
            return null
    }
}

export const getSelectedQuery = (Profile, RepositoryData) => {
    const searchQuery = getSearchQuery(Profile);
    const totalSearchQuery = getSearchQuery({ name: null, type: null });
    const { by, selected, parents: { month, year } } = RepositoryData;
    let interval = null;
    switch (by) {
        case ByTypes.DAYS:
            interval = { first: new Date(year, month, selected) };
            break;
        case ByTypes.MONTHS:
            interval = { first: new Date(year, selected, 1), last: new Date(year, selected + 1, 0) };
            break;
        case ByTypes.YEARS:
            interval = { first: new Date(selected, 0, 1), last: new Date(selected, 11, 31) };
            break;
        default:
            interval = { first: null, last: null };
            break;
    }
    return { selected: searchQuery(interval), all: totalSearchQuery(interval) };
}

export const getParents = ({RepositoryData}) => RepositoryData.parents;