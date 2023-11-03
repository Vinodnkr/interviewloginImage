import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="co center">
    <img
      src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      alt="not found"
      style={{width: '50vw'}}
    />
    <h1>Page Not Found</h1>
    <p>We are sorry, the page you requested could not be found.</p>
    <p>Error 404</p>
    <div style={{fontSize: '50px'}}>
      <Link to="/">Home</Link>
    </div>
  </div>
)
export default NotFound
