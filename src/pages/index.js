import React from "react"

import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { Container, Button } from "react-bootstrap"
import { Card } from "../components/cards"
import styled from "styled-components"
import Twitch from "../components/twitch"
import moment from "moment"

const FullscreenContainer = styled(Container)`
  max-width: 100%;
  width: 100%;
  padding: 0;
`

const HomeCard = styled(Card)`
  margin: 20px auto;
`

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query UpcomingEventsQuery {
      smashgg {
        upcoming: tournaments(query:{filter:{ownerId: 826903, upcoming: true}}) {
          nodes {
            name
            url(relative: false)
            images(type: "banner") {
              url
            }
          }
        },
        games: tournaments(query: {filter: {ownerId: 826903} perPage: 10}) {
           nodes {
            events {
              videogame {
                displayName,
                id
              }
            }
          }
        }
      }
    }
  `)

  const nextEventUpcoming = () => {
    return data.smashgg.upcoming.nodes.length > 0
  }

  const nextEvent = () => {
    console.log(data)
    return data.smashgg.upcoming.nodes[0]
  }

  const currentlyPlayingGameNames = () => {
    var events = data.smashgg.games.nodes.flatMap((tournament) => tournament.events)
    console.log(events)
    var games = events.filter((event) => event != null).map((event) => event.videogame.displayName)
    console.log(games)
    return [...new Set(games)];
  }

  currentlyPlayingGameNames()

  return (<Layout>
    <FullscreenContainer>
      <SEO title="Home" />
      <Twitch/>
      <Image eventUpcoming={nextEventUpcoming()} nextEvent={nextEvent()}/>
      {
        nextEventUpcoming() &&
          (<HomeCard id="next-event" bg="dark" border="secondary" text="light" style={{ 'max-width': '1000px' }}>
            <Card.Img variant="top" src={nextEvent().images[0].url} />
            <Card.Body style={{'text-align': 'center'}}>
              <Card.Title>Next Event: {nextEvent().name}</Card.Title>
              <Button href={nextEvent().url} variant="outline-light">View On Smash.GG</Button>
            </Card.Body>
          </HomeCard>) 
      }
      <HomeCard id="about" bg="dark" border="secondary" text="light" style={{ 'max-width': '1000px' }}>
        <Card.Body>
          <Card.Title>About Us</Card.Title>
          <Card.Text>
            Super Miner Battle Farm is a community of fighting game players based in South West England and Wales.
            We are a friendly and welcoming group of people with a good sense of humour and a desire to improve and support the offline scene in the UK.
            We host weekly sessions and monthly tournaments in Bristol, as well as other events in the Wales area.
          </Card.Text>
          <Card.Text>
            <p>We are currently playing:</p>
            <ul>{currentlyPlayingGameNames().map ((game) => <li>{game}</li>)}</ul>
          </Card.Text>
        </Card.Body>
    </HomeCard>
  </FullscreenContainer>
</Layout>)
}

export default IndexPage
