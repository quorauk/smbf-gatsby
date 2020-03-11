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
            start_date: start_time(formatString: "MMM Do YYYY")
            start_time: start_time(formatString: "ha")
            end_time(formatString: "ha")
            cover { source }
            internal { content }
          }
        }
      }
      allYoutubeVideo {
        edges {
          node {
            id
            title
            videoId
          }
        }
      }
    }
  `)

  const StyledEventContainer = styled.div`
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  `

  const groupYoutube = () => (
    data.allYoutubeVideo.edges.reduce((acc, entry) => {
      console.log(acc)
      const nameRegex = /Waistman Weeklies #(\d+)/
      const result = nameRegex.exec(entry.node.title)
      if (result != null && result.length === 2) {
        var key = `${result[1]}`
        var entries = acc[key]
        if (entries === undefined) {
          entries = [entry.node]
        } else {
          entries.push(entry.node)
        }
        acc[key] = entries
      }
      return acc
    }, {})
  )

  const FBEvents = () => {
    return data.allFacebookEvents.edges.map((edgedata) => {
      const nameRegex = /Waistman Weeklies #(\d+)/
      const result = nameRegex.exec(edgedata.node.name)
      if (result.length === 2) {
        edgedata.node.number = result[1]
      }
      return edgedata.node
    })
  }

  const groupedYoutube = groupYoutube();

  return <Layout>
    <SEO title="Page two" />
    <Container>
      <StyledEventContainer>
        {
          FBEvents().map((event) =>
            <Event youtubeData={groupedYoutube[event.number]} eventData={event}/>
          )
        }
      </StyledEventContainer>
    </Container>
  </Layout>
}

export default SecondPage
