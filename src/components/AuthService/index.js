// AuthService.js

const users = [
  {email: 'user1@example.com', password: 'password', username: 'User 1'},
  {email: 'user2@example.com', password: 'password', username: 'User 2'},
  {email: 'user3@example.com', password: 'password', username: 'User 3'},
  // Add more users as needed
]
const getUsersFromLocalStorage = () => {
  const usersJson = localStorage.getItem('userq')
  return usersJson ? JSON.parse(usersJson) : []
}

const AuthenticateUser = (email, password) => {
  const users1 = getUsersFromLocalStorage()
  const user = users.find(u => u.email === email && u.password === password)
  const user1 = users1.find(u => u.email === email && u.password === password)

  if (user || user1) {
    return user // Authentication successful
  }

  return null // Authentication failed
}

export default AuthenticateUser
