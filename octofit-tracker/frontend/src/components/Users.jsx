import { useEffect, useState } from 'react'
import { fetchCollectionFromUrl } from '../api/octofitApi'

const usersApiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollectionFromUrl(usersApiEndpoint)
      .then((data) => {
        setUsers(data)
        setStatus('ready')
      })
      .catch((requestError) => {
        setError(requestError.message)
        setStatus('error')
      })
  }, [])

  return (
    <section className="view-panel">
      <div className="view-header">
        <div>
          <h1>Users</h1>
          <p>{usersApiEndpoint}</p>
        </div>
        <span className="metric">{users.length}</span>
      </div>
      {status === 'loading' && <p className="state-text">Loading users...</p>}
      {status === 'error' && <p className="state-text error">Unable to load users: {error}</p>}
      {status === 'ready' && users.length === 0 && <p className="state-text">No users found.</p>}
      {status === 'ready' && users.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Team</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.username || user.email}>
                  <td>{user.displayName || user.name || 'Unknown'}</td>
                  <td>{user.username}</td>
                  <td>{user.teamName || user.teamId || 'Unassigned'}</td>
                  <td>{user.email || 'Not provided'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Users
