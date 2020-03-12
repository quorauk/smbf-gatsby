import PropTypes from "prop-types"
import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDiscord, faTwitter, faFacebookSquare, faTwitch } from '@fortawesome/free-brands-svg-icons'

const DropShadowNavbar = styled(Navbar)`
  box-shadow: 3px 10px 41px -19px rgba(0,0,0,0.75);
`

const Header = ({ siteTitle }) => {


  return <>
    <DropShadowNavbar expand="sm" bg="dark" variant="dark">
      <Navbar.Brand href="/">{siteTitle}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/events">Events</Nav.Link>
          <Nav.Link href="/#about">About</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="https://discord.gg/ud6cAnU">
            <FontAwesomeIcon icon={faDiscord}></FontAwesomeIcon>
          </Nav.Link>
          <Nav.Link href="https://www.twitch.tv/sodiumshowdown">
            <FontAwesomeIcon icon={faTwitch}></FontAwesomeIcon>
          </Nav.Link>
          <Nav.Link href="https://www.facebook.com/pg/SuperMinerBattleFarm">
            <FontAwesomeIcon icon={faFacebookSquare}></FontAwesomeIcon>
          </Nav.Link>
          <Nav.Link href="https://twitter.com/sodiumshowdown">
            <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
          </Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </DropShadowNavbar>
    </>
  }

  Header.propTypes = {
    siteTitle: PropTypes.string,
  }

  Header.defaultProps = {
    siteTitle: ``,
  }

  export default Header
