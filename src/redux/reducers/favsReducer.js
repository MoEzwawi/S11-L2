import { ADD_TO_FAVS, REMOVE_FROM_FAVS } from "../actions"

const initialState = {
    content: []
}




const favsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_FAVS:
            let updatedContent
            if (state.content.includes(action.payload)) {
                updatedContent = state.content
            } else {
                updatedContent = [...state.content, action.payload]
            }
            return {
                ...state,
                content: updatedContent
            }
        case REMOVE_FROM_FAVS:
            return {
                ...state,
                content: state.content.filter(firm => firm !== action.payload)
            }
        default: return state
    }
}

export default favsReducer