const initialState = {
    jobsList: []
}




const fetchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_JOBS':
            return {
                ...state,
                jobsList: action.payload
            }
        default: return state
    }
}

export default fetchReducer