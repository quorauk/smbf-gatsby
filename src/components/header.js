import PropTypes from "prop-types"
import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import styled from "styled-components"

const Header = ({ siteTitle }) => {


  return <>
    <Navbar expand="sm" bg="dark" variant="dark">
      <Navbar.Brand href="/">{siteTitle}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/events">Events</Nav.Link>
          <Nav.Link href="https://discord.gg/ud6cAnU">Discord</Nav.Link>
          <Nav.Link href="https://www.facebook.com/pg/SuperMinerBattleFarm">Facebook</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </>
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
