import React from "react";
import { Card } from  "../components/cards"
import moment from "moment"
import { Button, Dropdown, Col, Row, Accordion } from "react-bootstrap"
import { rankToMedal } from "../utils";
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"


const GameResult = styled.div`
  margin-bottom: 10px;
`

const TournamentCard = styled(Card)`
  margin-bottom: 20px;
`

export default ({ tournament, past}) => {
  return (<TournamentCard className="flex-row flex-wrap" key={tournament.id} bg="dark" border="secondary" text="light">
    <Card.Header>
      {tournament.name}
      {" - "}
      {moment.unix(tournament.startAt).format("MMMM Do HH:mm")}
      -
      {moment.unix(tournament.endAt).format("HH:mm")}
    </Card.Header>
    <Card.Img src={ tournament.images[0].url} />
    <Card.Body>
      { past && tournament.events &&
        tournament.events.map((event) => {
          return <GameResult>
            <Card.Title>
              {event.videogame.displayName}
            </Card.Title>
            {event.standings && event.standings.nodes.map((standing) => {
                return <div>{rankToMedal(standing.placement)} {standing.entrant.name}</div>
              }
            )}
          </GameResult>
        })
      }
      <Row>
        <Col>
          {!past && tournament.events && tournament.events.map((event) =>
            <Card.Title>
              {event.videogame.displayName}
              {" - "}
              {moment.unix(event.startAt).format("HH:mm")}
            </Card.Title>
          )}
        </Col>
      </Row>
      <Button href={tournament.url} variant="outline-light">View On Smash.GG</Button>
    </Card.Body>
  </TournamentCard>)
}