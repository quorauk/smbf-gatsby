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
    max-width: 900px;
`

const ComponentName = ({ data }) => {
    // const gameNodes = data.allChallongeTournament.group.flatMap ( (group) => { return { ...group.nodes[0], game: group.game } } ) 
    // gameNodes.sort((a, b) => moment(b.order_by).diff(a.order_by) )

    const description = `
        Bristols top 3 fighting game players, check out our players for all of our games.
    `

    return <Layout>
        <SEO title="Rankings" description={description}/>
        <StyledContainer>
            <Card bg="dark" text="light" style={{margin: "20px 0"}}>
                <Card.Body>
                    <Card.Title>
                        Rankings
                    </Card.Title>
                    <Card.Text>
                    {description}
                    </Card.Text>
                </Card.Body>
            </Card>
            {/* {
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
            } */}
        </StyledContainer>
    </Layout>
}

// export const query = graphql`
//   {
//     allChallongeTournament(sort: {fields: created_at, order: DESC}, limit: 30, filter: {completed_at: {ne: null}}) {
//       group(field: game_name, limit: 1) {
//         game: fieldValue
//         nodes {
//             order_by: created_at
//             created_at(fromNow: true)
//             participants {
//                 participant {
//                 final_rank
//                 name
//                 }
//             }
//         }
//       }
//     }
//   }
// `

export default ComponentName