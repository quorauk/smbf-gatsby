import React from "react"
import PropTypes from "prop-types"
import { Card, Button } from "react-bootstrap"
import moment from "moment"
import styled from "styled-components"

export default ({ eventData }) => {
    const id = JSON.parse(eventData.internal.content).id
    const url = `https://facebook.com/events/${id}`

    return (<Card style={{'margin-bottom': '20px', width: '18rem'}}>
    <Card.Img variant="top" src={eventData.cover.source} />
    <Card.Body>
        <Card.Title>{eventData.name}</Card.Title>
            <Card.Text>
                {moment(eventData.start_time).format("MMM Do YYYY - ha")}
                - {moment(eventData.end_time).format("ha")}
            </Card.Text>
            <Button variant="primary" href={url}>View Event</Button>
        </Card.Body>
    </Card>)
}