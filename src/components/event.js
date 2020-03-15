import React from "react"
import { Button, Dropdown, Col, Row, Accordion } from "react-bootstrap"
import { Card } from "./cards"
import styled from "styled-components"
import { rankToMedal } from "../utils"

const ButtonBody = styled(Card.Body)`
    display: flex;
    flex-direction: row;
`

const DropdownButton = styled(Dropdown)`
    margin-left: 10px;
`

export default ({ eventData, challongeData, youtubeData }) => {
    return (<Card className="flex-col flex-wrap" bg="dark" border="secondary" text="light" style={{'margin-bottom': '20px'}}>
        <Card.Header>{`Waistman Weeklies #${eventData.waistmansNumber}`}</Card.Header>
        <Card.Img variant="top" src={eventData.cover.source} />
        <Card.Title style={{"padding-left": "20px"}}>
            {`${eventData.start_date} ${eventData.start_time} - ${eventData.end_time}`}
        </Card.Title>
        <Card.Body style={{padding: "0"}}>
            <Row>
                <Col>
                    {challongeData.map ((tournament) => {
                        const participants = tournament.participants
                            .filter (({ participant }) => [1,2,3].includes(participant.final_rank))

                        participants
                            .sort((a, b) => a.participant.final_rank - b.participant.final_rank)

                        return <Accordion defaultActiveKey="-1">
                            <Card bg="dark" border="secondary" text="light">
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey={tournament.id}>
                                    {tournament.game_name}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={tournament.id}>
                                    <Card.Body>
                                    {
                                        participants.map (({ participant }) => <p>{rankToMedal(participant.final_rank)} {participant.name}</p> )
                                    }
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    })}
                </Col>
            </Row>
            <Row>
                <ButtonBody>
                    <Button variant="secondary" style={{"margin-left": "10px"}} href={eventData.facebookURL}>View Event</Button>
                    { youtubeData.length > 0 &&
                        <DropdownButton>
                            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                                Event Videos
                            </Dropdown.Toggle>
                            <Dropdown.Menu id="dropdown-basic-button" title="Dropdown button">
                                { youtubeData.map((video) =>
                                    <Dropdown.Item href={`https://www.youtube.com/watch?v=${video.videoId}`}>
                                    {video.title}
                                </Dropdown.Item>
                                ) }
                            </Dropdown.Menu>
                        </DropdownButton>
                    }
                </ButtonBody>
            </Row>
        </Card.Body>
    </Card>)
}