import React from "react"

import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { Container } from "react-bootstrap"
import styled from "styled-components"

const FullscreenContainer = styled(Container)`
  max-width: 100%;
  width: 100%;
  padding: 0;
`

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query ClosestEventQuery {
      facebookEvents {
        name
        end_date: end_time
        start_date: start_time(formatString: "MMM Do YYYY")
        start_time: start_time(formatString: "ha")
        end_time(formatString: "ha")
        internal { content }
      }
    }
  `)
  return (<Layout>
    <FullscreenContainer>
      <SEO title="Home" />
      <Image nextEvent={data.facebookEvents}/>
    </FullscreenContainer>
  </Layout>)
}

export default IndexPage
