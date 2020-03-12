import React from "react"
import { Button, Dropdown } from "react-bootstrap"
import { Card } from "./cards"
import styled from "styled-components"

const ButtonBody = styled(Card.Body)`
    display: flex;
    flex-direction: row;
`

const DropdownButton = styled(Dropdown)`
    margin-left: 10px;
`

export default ({ eventData, youtubeData }) => {
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

    return (<Card bg="dark" border="secondary" text="light" style={{'margin-bottom': '20px', width: '18rem'}}>
    <Card.Img variant="top" src={eventData.cover.source} />
    <Card.Body>
        <Card.Title>{filterName()}</Card.Title>
        <Card.Text>
            {`${eventData.start_date} ${eventData.start_time} - ${eventData.end_time}`}
        </Card.Text>
        </Card.Body>
        <ButtonBody>
            <Button variant="secondary" href={url}>View Event</Button>
            { youtubeData && 
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
    </Card>)
}