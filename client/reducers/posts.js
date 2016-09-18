const initialState = {
  posting: false,
  deleting: false,
  fetching: false,
  fetched: false,
  error: null,
  postsList: [],
  creating: false,
  editing: false,
  currentPost: {}
}

const postsReducer = (state = initialState, action) => {

  switch (action.type) {

    //FETCH POSTS LIST

    case 'FETCH_POSTS_LIST_PENDING': {
      return {
        ...state,
        fetching: true,
        fetched: false,
        creating: false,
        editing: false,
      }
      break
    }

    case 'FETCH_POSTS_LIST_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        postsList: action.payload.data
      }
      break
    }

    case 'FETCH_POSTS_LIST_REJECTED': {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.payload.message
      }
      break
    }

    //CREATE POST

    case 'CREATE_POST_PENDING': {
      return {
        ...state,
        posting: true,
      }
      break
    }

    case 'CREATE_POST_FULFILLED': {
      return {
        ...state,
        posting: false,
        creating: false,
        editing: false,
        postsList: state.postsList.concat(action.payload.data)
      }
      break
    }

    case 'CREATE_POST_REJECTED': {
      return {
        ...state,
        posting: false,
        error: action.payload.message
      }
      break
    }

    //FETCH_POST

    case 'FETCH_POST_PENDING': {
      return {
        ...state,
        fetching: true,
        fetched: false,
        creating: false,
        editing: false,
      }
      break
    }

    case 'FETCH_POST_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        currentPost: action.payload.data
      }
      break
    }

    case 'FETCH_POST_REJECTED': {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.payload.message
      }
      break
    }

    //UPDATE POST

    case 'UPDATE_POST_PENDING': {
      return {
        ...state,
        updating: true
      }
      break
    }

    case 'UPDATE_POST_FULFILLED': {
      return {
        ...state,
        currentPost: {...state.currentPost, title: JSON.parse(action.payload.config.data).title},
        updating: false,
        editing: false
      }
      break
    }

    case 'UPDATE_POST_REJECTED': {
      return {
        ...state,
        updating: false,
        editing: false,
        error: action.payload.message
      }
      break
    }

    //DELETE POST

    case 'DELETE_POST_PENDING': {
      return {
        ...state,
        deleting: true
      }
      break
    }

    case 'DELETE_POST_FULFILLED': {
      return {
        ...state,
        deleting: false,
        postsList: state.postsList.filter((post) => {
          return post.url !== action.payload.data
        })
      }
      break
    }

    case 'DELETE_POST_REJECTED': {
      return {
        ...state,
        deleting: false,
        error: action.payload.message
      }
      break
    }

    //EDITING POST

    case 'EDITING_POST': {
      return {
        ...state,
        editing: action.payload.editing
      }
      break
    }

    case 'CREATING_POST': {
      return {
        ...state,
        creating: action.payload.creating,
        editing: action.payload.editing,
        fetched: false,
        currentPost: {}
      }
      break
    }

    case 'CLEAR_POST': {
      return {
        ...state,
        currentPost: {}
      }
      break
    }

  }


  return state

}

export default postsReducer
