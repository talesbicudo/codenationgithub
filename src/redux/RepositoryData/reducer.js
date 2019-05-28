import ActionTypes from './ActionTypes';
import ByTypes from './ByTypes';
const date = (new Date()).getFullYear() - 6;

export default (store = { data: [], by: "YEARS", updateLoading: false, loading: true, selectedYear: date, range: { first: date, last: date + 5 } }, action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.SUCCESS:
            return {
                ...store,
                loading: false,
                updateLoading: false,
                ...payload
            };
        case ActionTypes.REQUEST_ASYNC:
            return {
                ...store,
                ...payload
            }
        case ActionTypes.REQUEST:
            return { ...store, loading: true }
        case ActionTypes.UPDATE:
            return { ...store, updateLoading: true }
        default:
            return store;
    }
}


function getDaysInYear(year, gap = 5) {
    var monthIntervals = [];
    var i = 0;
    do {
        monthIntervals.push({ first: new Date(year, 0, gap * i), last: new Date(year, 0, gap + gap * i) })
        i++
    }
    while ([...monthIntervals].pop().last.getFullYear() === year)
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
    const { by, selectedYear, range: { first, last } } = RepositoryData;
    const getSearchQueries = (interval) =>
        ({ value: getSearchQuery(Profile)(interval), interval });
    switch (by) {
        case ByTypes.MONTHS:
            return getDaysInYear(selectedYear).map(getSearchQueries);
        case ByTypes.YEARS:
            return getYears(first, last).map(getSearchQueries);
        default:
            return null
    }
}
