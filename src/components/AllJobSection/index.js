import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersJob from '../FiltersJob'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobSection extends Component {
  state = {
    jobList: [],
    apiStatus: apiStatusConstants.initial,
    activeSalaryId: '',
    activeTypeIds: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {activeSalaryId, activeTypeIds, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeTypeIds}&minimum_package=${activeSalaryId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSalaryby = activeSalaryId => {
    this.setState({activeSalaryId}, this.getJobs)
    console.log(activeSalaryId)
  }

  changeType = activeTypeIds => {
    this.setState({activeTypeIds}, this.getJobs)
    console.log(activeTypeIds)
  }

  enterSearchInput = () => {
    this.getJobs()
    console.log('enteres')
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
    console.log(searchInput)
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderjobListView = () => {
    const {jobList} = this.state
    console.log(jobList)
    const shouldShowjobList = jobList.length > 0

    return shouldShowjobList ? (
      <div className="all-products-container">
        <ul className="products-list">
          {jobList.map(job => (
            <JobCard jobData={job} key={job.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-products-img"
          alt="no jobs"
        />
        <h1 className="no-products-heading">No Jobs Found</h1>
        <p className="no-products-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderjobListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeTypeIds, searchInput, activeSalaryId} = this.state

    return (
      <div className="all-products-section">
        <FiltersJob
          searchInput={searchInput}
          changeSearchInput={this.changeSearchInput}
          enterSearchInput={this.enterSearchInput}
          typeOptions={employmentTypesList}
          salaryOptions={salaryRangesList}
          activeTypeIds={activeTypeIds}
          activeSalaryId={activeSalaryId}
          changeType={this.changeType}
          changeSalaryby={this.changeSalaryby}
        />
        {this.renderAllJobs()}
      </div>
    )
  }
}

export default AllJobSection
