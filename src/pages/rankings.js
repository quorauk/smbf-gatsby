import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container } from "react-bootstrap"
import { Card } from "../components/cards"
import styled from "styled-components"
import moment from "moment"
import { rankToMedal } from "../utils"

const StyledContainer = styled(Container)`
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
`

const ComponentName = ({ data }) => {
    const gameNodes = data.allChallongeTournament.group.flatMap ( (group) => { return { ...group.nodes[0], game: group.game } } ) 
    gameNodes.sort((a, b) => moment(b.order_by).diff(a.order_by) )
    return <Layout>
        <SEO title="Rankings" />
        <StyledContainer>
            {
                gameNodes.map ( (node) => {
                        const filteredParticipants = node.participants.filter(({ participant }) => [1,2,3].includes(participant.final_rank))
                        filteredParticipants.sort(((a, b)  => a.participant.final_rank - b.participant.final_rank))
                        return <Card bg="dark" text="light" style={{ margin: "20px 0" }}>
                            <Card.Header text="light">{node.game}</Card.Header>
                            <Card.Body>                        {
                                filteredParticipants.map(({ participant }) =>
                                    <div>{ rankToMedal(participant.final_rank) } { participant.name }</div>
                                )
                            }
                            </Card.Body>
                            <Card.Footer text="light">last updated: {node.created_at}</Card.Footer>
                        </Card>
                })
            }
        </StyledContainer>
    </Layout>
}

export const query = graphql`
  {
    allChallongeTournament(sort: {fields: created_at, order: DESC}, limit: 30) {
      group(field: game_name, limit: 1) {
        game: fieldValue
        nodes {
            order_by: created_at
            created_at(fromNow: true)
            participants {
                participant {
                final_rank
                name
                }
            }
        }
      }
    }
  }
`

export default ComponentName