export const ADD_TO_FAVS = 'ADD_TO_FAVS'
export const REMOVE_FROM_FAVS = 'REMOVE_FROM_FAVS'
export const FETCH_JOBS = 'FETCH_JOBS'

export const addToFavs = (company) => {
    return {
        type: ADD_TO_FAVS,
        payload: company,
    }
}


export const removeFromFavs = (company) => {
    return {
        type: REMOVE_FROM_FAVS,
        payload: company,
    }
}

export const fetchJobs = (info) => {
    const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?search=";
    return async (dispatch) => {
        try {
            const response = await fetch(baseEndpoint + info);
            if (response.ok) {
                const { data } = await response.json();
                dispatch({
                    type: FETCH_JOBS,
                    payload: data
                });
            } else {
                alert("Error fetching results");
            }
        } catch (error) {
            console.log(error);
        }
    }
}