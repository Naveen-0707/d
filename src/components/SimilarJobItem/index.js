import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similar-product-item">
      <div>
        <div>
          <img src={companyLogoUrl} alt="company" />
          <div>
            <h1>{title}</h1>
            <p>{rating}</p>
          </div>
        </div>
        <p>Description</p>
        <p>{jobDescription}</p>
        <div>
          <div>
            <p>{location}</p>
            <p>{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
