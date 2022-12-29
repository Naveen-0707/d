import {Link} from 'react-router-dom'

import './index.css'

const JobCard = props => {
  const {jobData} = props

  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobData

  return (
    <li className="product-item">
      <Link to={`/products/${id}`} className="link-item">
        <div>
          <div>
            <img src={companyLogoUrl} alt="company logo" />
            <div>
              <h1>{title}</h1>
              <p>{rating}</p>
            </div>
          </div>
          <div>
            <div>
              <p>{location}</p>
              <p>{employmentType}</p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div>
            <h1>Description</h1>
            <p>{jobDescription}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default JobCard
