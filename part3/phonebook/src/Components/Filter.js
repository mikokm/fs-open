const Filter = (props) => {
  return (
    <>
      filter shown with <input value={props.filterText} onChange={props.handleFilterChange} />
    </>
  )
}

export default Filter
