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
        nodes {
          facebookURL
          waistmansNumber
          name
          group_date: start_time(formatString: "YYYY-MM-DD")
          start_date: start_time(formatString: "MMM Do YYYY")
          start_time: start_time(formatString: "ha")
          end_time(formatString: "ha")
          cover { source }
        }
      }
      allYoutubeVideo {
        group(field: group_date) {
          fieldValue
          nodes {
            id
            title
            videoId
            group_date
          }
        }
      }
      allChallongeTournament {
        group(field: group_date) {
          fieldValue
          nodes {
            name
            game_name
            group_date
            participants {
              participant {
                name
                final_rank
              }
            }
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

  return <Layout>
    <SEO title="Events" />
    <Container>
      <StyledEventContainer>
        {
          data.allFacebookEvents.nodes.map((event) => {
            var challongeData = data.allChallongeTournament.group.find((group) => group.fieldValue === event.group_date)
            var youtubeData = data.allYoutubeVideo.group.find((group) => group.fieldValue === event.group_date)
            return <Event
              challongeData={challongeData === undefined ? [] : challongeData.nodes}
              youtubeData={youtubeData === undefined ? [] : youtubeData.nodes}
              eventData={event}
            />
          })
        }
      </StyledEventContainer>
    </Container>
  </Layout>
}

export default SecondPage
