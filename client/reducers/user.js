const initialState = {
  creating: false,
  deleting: false,
  updating: false,
  logging: false,
  logged: false,
  loading: false,
  username: '',
  error: null
}

const userReducer = (state = initialState, action) => {

  switch (action.type) {

    //GET LOGGED

    case 'GET_LOGGED_PENDING': {
      return {
        ...state,
        loading: true
      }
      break
    }

    case 'GET_LOGGED_FULFILLED': {
      if (action.payload.data != false) {
        return {
          ...state,
          loading: false,
          logged: true,
          username: action.payload.data
        }
      } else {
        return {
          ...state,
          loading: false,
          logged: false,
          username: ''
        }
      }
      break
    }

    //LOGIN

    case 'LOGIN_PENDING': {
      return {
        ...state,
        logging: true
      }
      break
    }

    case 'LOGIN_FULFILLED': {
      return {
        ...state,
        logging: false,
        logged: true,
        username: action.payload.data
      }
      break
    }

    case 'LOGIN_REJECTED': {
      return {
        ...state,
        logging: false,
        logged: false,
        error: action.payload.message
      }
      break
    }

    //LOGOUT

    case 'LOGOUT_PENDING': {
      return state
    }

    case 'LOGOUT_FULFILLED': {
      return {
        ...state,
        logged: false,
        username: ''
      }
    }

    case 'LOGOUT_REJECTED': {
      return state
    }

    //CREATE USER

    case 'CREATE_USER_PENDING': {
      return {
        ...state,
        creating: true
      }
    }

    case 'CREATE_USER_FULFILLED': {
      return {
        ...state,
        creating: false,
      }
    }

    case 'CREATE_USER_REJECTED': {
      return {
        ...state,
        creating: false,
        error: action.payload.message
      }
    }

    //DELETE USER

    case 'DELETE_USER_PENDING': {
      return {
        ...state,
        deleting: true,
      }
    }

    case 'DELETE_USER_FULFILLED': {
      if (action.payload.data === "delete-logged") {
        return {
          ...state,
          deleting: false,
          logged: false,
          username: ''
        }
      }

      return {
        ...state,
        deleting: false,
      }
    }

    case 'DELETE_USER_REJECTED': {
      return {
        ...state,
        deleting: false,
        error: action.payload.message
      }
    }

    //UPDATE PASSWORD

    case 'UPDATE_PASSWORD_PENDING': {
      return {
        ...state,
        updating: true,
      }
    }

    case 'UPDATE_PASSWORD_FULFILLED': {
      return {
        ...state,
        updating: false,
      }
    }

    case 'UPDATE_PASSWORD_REJECTED': {
      return {
        ...state,
        updating: false,
        error: action.payload.message
      }
    }

  }

  return state

}

export default userReducer
