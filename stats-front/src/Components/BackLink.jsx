import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

const BackLink = forwardRef((props, ref) => {
  const to = props.to || '..'
  return <Link {...props} to={to} ref={ref} />
})

export default BackLink
