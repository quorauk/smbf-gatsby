import React from "react"
import { Card, Button } from "react-bootstrap"
import styled from "styled-components"

const DropShadowCard = styled(Card)`
  box-shadow: 3px 10px 41px -19px rgba(0,0,0,0.75);
`

export default ({ eventData }) => {
    const id = JSON.parse(eventData.internal.content).id
    const url = `https://facebook.com/events/${id}`

    const filterName = () => {
        const nameRegex = /Waistman Weeklies #(\d+)/
        const result = nameRegex.exec(eventData.name)
        if (result.length === 2) {
            return `Waistman Weeklies #${result[1]}`
        }
        return eventData.name
    }

    return (<DropShadowCard bg="dark" border="secondary" text="light" style={{'margin-bottom': '20px', width: '18rem'}}>
    <Card.Img variant="top" src={eventData.cover.source} />
    <Card.Body>
        <Card.Title>{filterName()}</Card.Title>
            <Card.Text>
                {`${eventData.start_date} ${eventData.start_time} - ${eventData.end_time}`}
            </Card.Text>
            <Button variant="outline-secondary" href={url}>View Event</Button>
        </Card.Body>
    </DropShadowCard>)
}