import useRepositoriesWithSearch from './useRepositoriesWithSearch';
const twoDigits = number => ("0" + number).slice(-2);
const gitIsoDate = date => `${date.getFullYear()}-${twoDigits(date.getUTCMonth() + 1)}-${twoDigits(date.getUTCDate())}`

const useRepositoriesByDateInterval = ({
    first = new Date(2018, 0, 1),
    last = new Date(2018, 0, 2),
    ownerType = "",
    ownerName = "",
    fetchProps = `id`
}) => {
    const dots = ownerType ? ":" : "";
    const search =
        `${ownerType}${dots}${ownerName} created:${gitIsoDate(first)}..${gitIsoDate(last)}`
        console.log(search);
    return useRepositoriesWithSearch({ search });
}

export default useRepositoriesByDateInterval