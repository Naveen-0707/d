import {BsSearch} from 'react-icons/bs'

import './index.css'

const FiltersJob = props => {
  const renderSalaryList = () => {
    const {salaryOptions} = props

    return salaryOptions.map(each => {
      const {changeSalaryby} = props
      const onClickSalaryItem = () => changeSalaryby(each.salaryRangeId)
      return (
        <li
          className="category-item"
          key={each.salaryRangeId}
          onClick={onClickSalaryItem}
        >
          <input
            type="radio"
            id={each.salaryRangeId}
            name="salary"
            value={each.salaryRangeId}
          />
          <label htmlFor={each.salaryRangeId}>{each.label}</label>
          <br />
        </li>
      )
    })
  }
  const renderTypeList = () => {
    const {typeOptions, activeTypeIds} = props

    return typeOptions.map(each => {
      const {changeType} = props
      const typeList = activeTypeIds
      const onClickTypeItem = event => {
        if (event.target.checked) {
          typeList.push(event.target.value)
          changeType(typeList)
        } else {
          const typeList1 = typeList.filter(eachType => {
            if (eachType !== event.target.value) {
              return eachType
            }
            return null
          })
          changeType(typeList1)
        }
      }

      return (
        <li className="category-item" key={each.employmentTypeId}>
          <input
            type="checkbox"
            id={each.employmentTypeId}
            name={each.label}
            value={each.employmentTypeId}
            onClick={onClickTypeItem}
          />
          <label htmlFor={each.employmentTypeId}>{each.label}</label>
          <br />
        </li>
      )
    })
  }

  const renderSalaryRange = () => (
    <>
      <h1 className="category-heading">Salary Range</h1>
      <ul className="categories-list">{renderSalaryList()}</ul>
    </>
  )

  const renderJobType = () => (
    <>
      <h1 className="category-heading">Type of Employment</h1>
      <ul className="categories-list">{renderTypeList()}</ul>
    </>
  )

  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const renderSearchInput = () => {
    const {searchInput} = props
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button type="button">
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      {renderJobType()}
      {renderSalaryRange()}
    </div>
  )
}

export default FiltersJob
