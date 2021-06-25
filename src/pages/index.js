import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'

class RootIndex extends React.Component {
  render() {
    const primaryNavigation = get(this, 'props.data.contentfulNavigationList')

    return (
    <Layout>
      <Seo title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <StaticImage
        src="../images/gatsby-astronaut.png"
        width={300}
        quality={95}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt="A Gatsby astronaut"
        style={{ marginBottom: `1.45rem` }}
      />
      <p>
        <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
      </p>
      <ul>
      {primaryNavigation.navigationItems.map(element => {
        return (
          <li>
            { element.linkText }
          </li>
        )
      })}
      </ul>
    </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
 query primaryNavigation ( $nodeLocale: String ) {
  contentfulNavigationList(name: {eq: "Primary"}, node_locale: {eq: $nodeLocale}) {
    node_locale
    name
    navigationItems {
      node_locale
      linkText
      childNavigationItems {
        node_locale
        linkText
      }
    }
  }
}
`