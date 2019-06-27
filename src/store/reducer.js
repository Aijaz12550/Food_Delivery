
const reducer = ( state = {}, action ) => {
    switch(action.type){
        case 'SETUSER':{
            return {
                ...state, user:action.data
            }
        }
        case 'REMOVEUSER':{
            return {
                user:null
            }
        }
        default:{
            return {
                state
            }
        }
    }
}

export default reducer;