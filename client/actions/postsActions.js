import axios from 'axios'

export function fetchPostsList() {
  return {
    type: 'FETCH_POSTS_LIST',
    payload: axios.get('/api/main')
  }
}

export function fetchUserPosts(name) {
  return {
    type: 'FETCH_USER_POSTS',
    payload: axios.get('/api/users/' + name)
  }
}

export function createPost(title, meta, content) {
  return {
    type: 'CREATE_POST',
    payload: axios.post('/api/post', {
      title,
      content,
      meta
    })
  }
}

export function fetchPost(url, withContent=true) {
  return {
    type: 'FETCH_POST',
    payload: axios.get('/api/post/' + url + (withContent ? '/1' : '/0'))
  }
}

export function updatePost(url, title, meta, content) {
  return {
    type: 'UPDATE_POST',
    payload: axios.put('/api/post/' + url, {
      title,
      content,
      meta
    })
  }
}

export function deletePost(url) {
  return {
    type: 'DELETE_POST',
    payload: axios.delete('/api/post/' + url)
  }
}

export function editingPost(editing) {
  return {
    type: 'EDITING_POST',
    payload: {
      editing
    }
  }
}

export function creatingPost(creating) {
  return {
    type: 'CREATING_POST',
    payload: {
      creating,
      editing: creating
    }
  }
}

export function clearPost() {
  return {
    type: 'CLEAR_POST'
  }
}
