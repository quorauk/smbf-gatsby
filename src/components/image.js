import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { Button } from "react-bootstrap"
import moment from "moment"
import BackgroundImage from "gatsby-background-image";

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const Gradient = styled(BackgroundImage)`
  display: flex;
  align-items: center;
  align-content: center;
  align-text: center;
  min-height: 95vh;
  bottom: 0;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  backdrop-filter: blur(4px);
`

const HeroTextContainer = styled.div`
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 1);
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  color: #FFFFFF;
  padding: 20px;
  font-family: 'Permanent Marker', cursive;
`

const HeroTitle = styled.p`
  margin: 0 auto;
  font-size: 72px;
`

const HeroSubTitle = styled.p`
  margin: 0 auto;
  font-size: 48px;
`

const CTAs = styled.div`
`

const EventCTA = styled(Button)`
  color: #FFFFFF;
  margin: 20px 10px;
  font-family: 'Roboto Condensed', sans-serif;
`

const Image = ({ name, nextEvent }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "event-hero.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)


  const nextEventUpcoming = () => {
    return moment().isBefore(moment(nextEvent.end_date))
  }

  const ctaLink = () => {
    if (nextEventUpcoming()) {
      const id = JSON.parse(nextEvent.internal.content).id
      return `https://facebook.com/events/${id}`
    } else {
      return "https://facebook.com/Superminerbattlefarm"
    }
  }

  const backgroundFluidImageStack = [
    data.placeholderImage.childImageSharp.fluid,
    `linear-gradient(180deg, rgba(0, 0, 0, 0.11) 0%, #000000 100%)`
  ].reverse()

  return (
    // <Gradient eventImage={data}>
    <Gradient fluid={backgroundFluidImageStack}>
      <HeroTextContainer>
        <HeroTitle className="d-none d-sm-block">Super Miner Battle Farm</HeroTitle>
        <HeroTitle className="d-blcok d-sm-none">SMBF</HeroTitle>
        <HeroSubTitle className="d-none d-sm-block">Southwest Fighting Game Community</HeroSubTitle>
        <HeroSubTitle className="d-blcok d-sm-none">Southwest FGC</HeroSubTitle>
        <CTAs>
          <EventCTA href={ctaLink()} variant="secondary">{ nextEventUpcoming() ?
            `Next Event: ${nextEvent.name}` :
            "Follow us for updates"}
          </EventCTA>
          <EventCTA href={"/events"} variant="dark">
            View Past events
          </EventCTA>
        </CTAs>
      </HeroTextContainer>
    </Gradient>
    // </Gradient>
  )
}

export default Image
