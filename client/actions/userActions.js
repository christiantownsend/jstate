import axios from 'axios'

export function getLogged() {
  return {
    type: 'GET_LOGGED',
    payload: axios.get('/api/logged')
  }
}

export function login(name, password) {
  return {
    type: 'LOGIN',
    payload: axios.post('/api/login', {
      name,
      password
    })
  }
}

export function logout() {
  return {
    type: 'LOGOUT',
    payload: axios.post('/api/logout', {})
  }
}

export function createUser(name, password) {
  return {
    type: 'CREATE_USER',
    payload: axios.post('/api/user', {
      name,
      password
    })
  }
}

export function deleteUser(name, password) {
  return {
    type: 'DELETE_USER',
    payload: axios.post('/api/user/delete', {
      name,
      password
    })
  }
}

export function updatePassword(name, oldPassword, newPassword) {
  return {
    type: 'UPDATE_PASSWORD',
    payload: axios.put('/api/user', {
      name,
      old_pass: oldPassword,
      new_pass: newPassword
    })
  }
}
