import { FaRegSadTear } from "react-icons/fa"
import './NoPost.css'

function NoPost() {
  return (
    <div className="no-post-container">
        <FaRegSadTear size={64} className="no-post-icon" />
      <p className="no-post-message">No posts available</p>
    </div>
  )
}

export default NoPost