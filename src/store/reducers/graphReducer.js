import initialState from "../initialState";


const graphReducer = (currentState, action) => {

    const state = currentState || initialState?.graphData

    switch(action.type) {

        case "REQUEST_GRAPH_DATA": 
        return{
            ...state,
            loadingState: "LOADING"
        }

        case "RECEIVE_GRAPH_DATA":
            return {
                ...state,
                loadingState: "LOADED",
                graphData: action.payload || []
            }

        default: return state
    }
}

export default graphReducer;