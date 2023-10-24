import { useState, useEffect } from "react";
import "./NavBar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function NavBar() {
  const [activeLinkId, setActiveLinkId] = useState(
    localStorage.getItem("activeLinkId") || "asociados"
  );

  useEffect(() => {
    localStorage.setItem("activeLinkId", activeLinkId);
  }, [activeLinkId]);

  const handleNavLinkClick = (linkId) => {
    setActiveLinkId(linkId);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <a href="/"><img
          src="/img/Logo-Fespa.png"
          className="d-inline-block align-top"
          alt="fespa"
        /></a>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="colab-asoc">
            <Nav.Link
              id="asociados"
              className={activeLinkId === "asociados" ? "active" : ""}
              onClick={() => handleNavLinkClick("asociados")}
              href="asociados"
            >
              ASOCIADOS
            </Nav.Link>
            <Nav.Link
              id="socio-colaboradores"
              className={activeLinkId === "socio-colaboradores" ? "active" : ""}
              onClick={() => handleNavLinkClick("socio-colaboradores")}
              href="socio-colaboradores"
            >
              SOCIOS COLABORADORES
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
