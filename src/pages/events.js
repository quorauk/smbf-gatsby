import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Event from "../components/event"
import { Container } from "react-bootstrap"
import { Card } from  "../components/cards"
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
    flex-direction: column;
    justify-content: center;
    max-width: 900px;
    margin: 0 auto;
  `
  const description = `
    The latest fighting game events in Bristol, check out our events, tournament results and videos.
  `

  return <Layout>
    <SEO title="Events" description={description} />
    <Container>
      <StyledEventContainer>
        <Card bg="dark" text="light" style={{margin: "20px 0"}}>
          <Card.Body>
            <Card.Title>
              Events
            </Card.Title>
            <Card.Text>
              {description}
            </Card.Text>
          </Card.Body>
        </Card>
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
