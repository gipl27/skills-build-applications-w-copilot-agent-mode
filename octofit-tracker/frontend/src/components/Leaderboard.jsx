import { useEffect, useState } from 'react'
import { fetchCollectionFromUrl } from '../api/octofitApi'

const leaderboardApiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollectionFromUrl(leaderboardApiEndpoint)
      .then((data) => {
        setEntries(data)
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
          <h1>Leaderboard</h1>
          <p>{leaderboardApiEndpoint}</p>
        </div>
        <span className="metric">{entries.length}</span>
      </div>
      {status === 'loading' && <p className="state-text">Loading leaderboard...</p>}
      {status === 'error' && <p className="state-text error">Unable to load leaderboard: {error}</p>}
      {status === 'ready' && entries.length === 0 && <p className="state-text">No leaderboard entries found.</p>}
      {status === 'ready' && entries.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Member</th>
                <th>Team</th>
                <th>Points</th>
                <th>Minutes</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id || entry.username || entry.rank}>
                  <td>{entry.rank}</td>
                  <td>{entry.displayName || entry.username}</td>
                  <td>{entry.teamName || 'Independent'}</td>
                  <td>{entry.points}</td>
                  <td>{entry.totalMinutes ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Leaderboard
