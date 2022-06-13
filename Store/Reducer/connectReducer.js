const initialState = {user : []}

function connected(state = initialState, action){

    let nextState;
    switch(action.type){
        case "CONNECT_USER":
            console.log("here");
                nextState = { user : action.value};
            return nextState || state;
        case "DISCONNECT_USER":
        nextState = {
            user : []
        };
            return nextState || state;
        default:
            return state;
    }
}

export default connected;