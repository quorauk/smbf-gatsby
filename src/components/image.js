import React, { div } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import {Image as BootstrapImage} from "react-bootstrap"
import BackgroundImage from 'gatsby-background-image'

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

const Image = ({ name }) => {
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

  // Watch out for CSS's stacking order, especially when styling the individual
  // positions! The lowermost image comes last!
  const StyledInnerWrapper = styled(Img)`
    position: absolute;
    height: 95vh;
    min-height: 95vh;
    top: 58px;
    width: 100%;
  `

  const Gradient = styled.div`
    position: absolute;
    height: 95vh;
    min-height: 95vh;
    top: 58px;
    width: 100%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.11) 0%, #000000 100%), url(${data.placeholderImage.childImageSharp.fluid.src});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    backdrop-filter: blur(4px);
  `

  const HeroTextContainer = styled.div`
    position: absolute;
    width: 100%;
    top: 30vh;
  `

  const HeroTitle = styled.p`
    font-size: 72px;
    text-align: center;
    color: #FFFFFF;
    font-family: 'Permanent Marker', cursive;
  `

  const HeroSubTitle = styled.p`
    font-size: 48px;
    text-align: center;
    color: #FFFFFF;
    font-family: 'Permanent Marker', cursive;
  `
  
  return (
    <>
      <Gradient>
        <HeroTextContainer>
          <HeroTitle>Super Miner Battle Farm</HeroTitle>
          <HeroSubTitle>Southwest Fighting Game Community</HeroSubTitle>
        </HeroTextContainer>
      </Gradient>
    </>
  )

  // return (
  //   <BackgroundImage
  //     id={`test`}
  //     fluid={backgroundFluidImageStack}
  //     height={"1000px"}
  //   >
  //     <StyledInnerWrapper>
  //       <h2>
  //         This is a test of multiple background images.
  //       </h2>
  //     </StyledInnerWrapper>
  //   </BackgroundImage>
  // )

  // return <Img fluid={data.placeholderImage.childImageSharp.fluid}>
  //   <GradientBackground></GradientBackground>
  // </Img>
}

export default Image
