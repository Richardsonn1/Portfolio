import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function PageChanged() {
  const history = useNavigate()
  const { pathname } = useLocation()

  React.useEffect(() => {}, [pathname])

  return <></>
}
