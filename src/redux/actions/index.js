export const ADD_TO_FAVS = 'ADD_TO_FAVS'
export const REMOVE_FROM_FAVS = 'REMOVE_FROM_FAVS'

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