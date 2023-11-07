const initialState = {
    favourites: {
        content: []
    }
}




const favsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVS':
            let updatedContent
            if (state.favourites.content.includes(action.payload)) {
                updatedContent = state.favourites.content
            } else {
                updatedContent = [...state.favourites.content, action.payload]
            }
            return {
                ...state,
                favourites: {
                    ...state.favourites,
                    content: updatedContent
                }
            }
        case 'REMOVE_FROM_FAVS':
            return {
                ...state,
                favourites: {
                    ...state.favourites,
                    content: state.favourites.content.filter(firm => firm !== action.payload)
                }
            }
        default: return state
    }
}

export default favsReducer