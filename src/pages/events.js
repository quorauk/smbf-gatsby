import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Event from "../components/event"
import { Container } from "react-bootstrap"
import { Card } from  "../components/cards"
import Tournament from  "../components/tournament"
import styled from "styled-components"
import { Button, Dropdown, Col, Row, Accordion } from "react-bootstrap"
import moment from "moment"

const EventPage = () => {
  const data = useStaticQuery(graphql`
    query EventsQuery{
      smashgg {
        upcoming: tournaments(query:{filter:{ownerId: 826903, upcoming: true}}) {
          nodes {
            id
            name
            url(relative: false)
            startAt
            endAt
            url(relative: false)
            images(type: "banner") {
              url
            }
            events {
              videogame {
                displayName
              }
              startAt
            }
          }
        }
        past: tournaments(query:{filter:{ownerId: 826903, past: true}, perPage: 10}) {
          nodes {
            id
            name
            startAt
            endAt
            url(relative: false)
            images(type: "banner") {
              url
            }
            events {
              videogame {
                displayName
              }
              startAt
              standings(query: {perPage: 3, page: 1}) {
                nodes {
                  placement
                  entrant {
                    name
                  }
                }
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
    The latest fighting game events in Bristol, check out our upcoming events and tournament results.
  `

  return <Layout>
    <SEO title="Events" description={description} />
    <Container>
      <StyledEventContainer>
        <Card bg="dark" text="light" border="secondary" style={{margin: "20px 0"}}>
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
          data.smashgg.upcoming.nodes.map((tournament) => {
            return <Tournament key={ tournament.id} tournament={tournament} />
          })
        }
        {
          data.smashgg.past.nodes.map((tournament) => {
            return <Tournament key={ tournament.id} tournament={tournament} past={true}/>
          })
        }
      </StyledEventContainer>
    </Container>
  </Layout>
}

export default EventPage
