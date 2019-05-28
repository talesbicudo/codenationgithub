import BY from '../../redux/RepositoryData/ByTypes';

export default function dispatchReducer(by, selected) {
    switch (by) {
        case BY.YEARS:
            return { selectedMonth: null, by };
        case BY.MONTHS:
            return selected ? { by, selectedYear: selected } : { by };
        case BY.DAYS:
            return { by, selectedMonth: selected }
        default:
            throw new Error();
    }
}

