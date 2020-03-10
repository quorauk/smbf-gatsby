import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Event from "../components/event"
import { Container } from "react-bootstrap"
import styled from "styled-components"

const SecondPage = () => {
  const data = useStaticQuery(graphql`
    query FacebookEventsQuery {
      allFacebookEvents(limit: 9) {
        edges {
          node {
            name
            start_time
            end_time
            cover { source }
            internal { content }
          }
        }
      }
    }
  `)

  const StyledEventContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 30px;
  `

  return <Layout>
    <SEO title="Page two" />
    <Container>
      <StyledEventContainer>
        {
          data.allFacebookEvents.edges && data.allFacebookEvents.edges.map((edgedata) =>
            <Event eventData={edgedata.node}/>
          )
        }
      </StyledEventContainer>
    </Container>
  </Layout>
}

export default SecondPage
