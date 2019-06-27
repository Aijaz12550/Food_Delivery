
const updateUser = ( user ) => {
    return {
        type:'UPDATEUSER',
        data:user
    }
}

const removeUser = ()=>{
    return {
        type:'REMOVEUSER'
    }
}

export {
   updateUser,removeUser
}