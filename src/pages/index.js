import React from "react"

import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { Container, Button } from "react-bootstrap"
import { Card } from "../components/cards"
import styled from "styled-components"
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
    query ClosestEventQuery {
      facebookEvents {
        name
        cover { source }
        end_date: end_time
        start_date: start_time(formatString: "MMM Do YYYY")
        start_time: start_time(formatString: "ha")
        end_time(formatString: "ha")
        internal { content }
      }
      listGames: allChallongeTournament(sort: {fields: created_at, order: DESC}, limit: 20) {
        games: distinct(field: game_name)
      }
    }
  `)

  const nextEventUpcoming = () => {
    return moment().isBefore(moment(data.facebookEvents.end_date))
  }

  const ctaLink = () => {
    const id = JSON.parse(data.facebookEvents.internal.content).id
    return `https://facebook.com/events/${id}`
  }

  return (<Layout>
    <FullscreenContainer>
      <SEO title="Home" />
      <Image eventUpcoming={nextEventUpcoming()} nextEvent={data.facebookEvents}/>
      {
        nextEventUpcoming() &&
          (<HomeCard id="next-event" bg="dark" border="secondary" text="light" style={{ 'max-width': '1000px' }}>
            <Card.Img variant="top" src={`${data.facebookEvents.cover.source}`} />
            <Card.Body style={{'text-align': 'center'}}>
              <Card.Title>Next Event: {`${data.facebookEvents.name}`}</Card.Title>
              <Button href={ctaLink()} variant="outline-light">View On Facebook</Button>
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
            <ul>{data.listGames.games.map ((game) => <li>{game}</li>)}</ul>
          </Card.Text>
        </Card.Body>
    </HomeCard>
  </FullscreenContainer>
</Layout>)
}

export default IndexPage
