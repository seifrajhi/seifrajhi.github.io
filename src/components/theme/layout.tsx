import * as React from "react"
import { ReactElement } from "react"
import PropTypes from "prop-types"

import "./theme.css"
import "./general.css"

type Props = {
  children?: ReactElement
}

const Layout = ({ children }: Props): JSX.Element => {
  return <div>{children}</div>
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Layout
