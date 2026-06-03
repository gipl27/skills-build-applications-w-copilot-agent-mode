import { useEffect, useState } from 'react'
import { fetchCollectionFromUrl } from '../api/octofitApi'

const workoutsApiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollectionFromUrl(workoutsApiEndpoint)
      .then((data) => {
        setWorkouts(data)
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
          <h1>Workouts</h1>
          <p>{workoutsApiEndpoint}</p>
        </div>
        <span className="metric">{workouts.length}</span>
      </div>
      {status === 'loading' && <p className="state-text">Loading workouts...</p>}
      {status === 'error' && <p className="state-text error">Unable to load workouts: {error}</p>}
      {status === 'ready' && workouts.length === 0 && <p className="state-text">No workouts found.</p>}
      {status === 'ready' && workouts.length > 0 && (
        <div className="card-grid">
          {workouts.map((workout) => (
            <article className="data-card" key={workout._id || workout.name}>
              <h2>{workout.name}</h2>
              <p>{workout.category || 'General'} · {workout.level || 'all levels'} · {workout.durationMinutes} min</p>
              <ul>
                {(workout.exercises || []).slice(0, 4).map((exercise) => (
                  <li key={exercise}>{exercise}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts
