import { useEffect, useState } from 'react'
import { buildApiUrl, fetchCollection } from '../api/octofitApi'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities')
      .then((data) => {
        setActivities(data)
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
          <h1>Activities</h1>
          <p>{buildApiUrl('activities')}</p>
        </div>
        <span className="metric">{activities.length}</span>
      </div>
      {status === 'loading' && <p className="state-text">Loading activities...</p>}
      {status === 'error' && <p className="state-text error">Unable to load activities: {error}</p>}
      {status === 'ready' && activities.length === 0 && <p className="state-text">No activities found.</p>}
      {status === 'ready' && activities.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Member</th>
                <th>Activity</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Distance</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || `${activity.username}-${activity.activityDate}`}>
                  <td>{activity.username || activity.userId}</td>
                  <td>{activity.activityType || activity.type}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>{activity.distanceMiles ?? 0} mi</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities
