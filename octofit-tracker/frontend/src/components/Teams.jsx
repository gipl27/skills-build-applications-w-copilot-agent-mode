import { useEffect, useState } from 'react'
import { fetchCollectionFromUrl } from '../api/octofitApi'

const teamsApiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollectionFromUrl(teamsApiEndpoint)
      .then((data) => {
        setTeams(data)
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
          <h1>Teams</h1>
          <p>{teamsApiEndpoint}</p>
        </div>
        <span className="metric">{teams.length}</span>
      </div>
      {status === 'loading' && <p className="state-text">Loading teams...</p>}
      {status === 'error' && <p className="state-text error">Unable to load teams: {error}</p>}
      {status === 'ready' && teams.length === 0 && <p className="state-text">No teams found.</p>}
      {status === 'ready' && teams.length > 0 && (
        <div className="card-grid">
          {teams.map((team) => (
            <article className="data-card" key={team._id || team.name}>
              <h2>{team.name}</h2>
              <p>{team.description || 'No description available.'}</p>
              <dl>
                <div><dt>Captain</dt><dd>{team.captainUsername || 'Open'}</dd></div>
                <div><dt>Members</dt><dd>{team.memberUsernames?.length ?? team.memberCount ?? 0}</dd></div>
                <div><dt>Weekly goal</dt><dd>{team.weeklyGoalMinutes ?? 0} min</dd></div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams
