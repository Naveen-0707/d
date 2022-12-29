import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarjobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getjobData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.amployment_type,
    id: data.id,
    jobDescription: data.job_description,
    skills: data.skills,
    lifeAtCompany: data.life_at_company,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  getFormattedData1 = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.amployment_type,
    id: data.id,
    jobDescription: data.job_description,
    skills: data.skills,
    lifeAtCompany: data.life_at_company,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  getjobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const data = {
        jobDetails: fetchedData.job_details,
        similarJobs: fetchedData.similar_jobs,
      }
      const updatedData = this.getFormattedData(data.jobDetails)
      console.log(updatedData)
      const updatedsimilarjobsData = data.similarJobs.map(eachSimilarJob =>
        this.getFormattedData1(eachSimilarJob),
      )
      console.log(updatedsimilarjobsData)
      this.setState({
        jobData: updatedData,
        similarjobsData: updatedsimilarjobsData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  skill = details => {
    const data = {imageUrl: details.image_url, name: details.name}
    const {imageUrl, name} = data
    return (
      <li>
        <img src={imageUrl} alt={name} />
        <p>{name}</p>
      </li>
    )
  }

  renderFailureView = () => (
    <div className="product-details-failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  renderjobDetailsView = () => {
    const {jobData, similarjobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobData

    return (
      <div className="product-details-success-view">
        <div>
          <div>
            <img src={companyLogoUrl} alt="company" />
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
        </div>
        <hr />
        <div>
          <div>
            <h1>Description</h1>
            <a href={companyWebsiteUrl}>Visit</a>
          </div>
          <p>{jobDescription}</p>
          <h1>Skills</h1>
          <ul>{skills.map(each => this.skill(each))}</ul>
        </div>
        <div>
          <h1>Life at Company</h1>
          <div>
            <p>{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.image_url} alt="company" />
          </div>
        </div>
        <h1 className="similar-products-heading">Similar Products</h1>
        <ul className="similar-products-list">
          {similarjobsData.map(eachSimilarJob => (
            <SimilarJobItem
              jobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderjobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderjobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderjobDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
