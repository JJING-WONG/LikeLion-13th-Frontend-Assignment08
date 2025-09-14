import React from "react";
import styled from "styled-components";

const Wrap = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255,255,255,.7);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0,0,0,0.06);
`;

const Row = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  height: 72px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Brand = styled.a`
  font-weight: 800;
  font-size: 18px;
  text-decoration: none;
  color: #111111;
`;

const Nav = styled.nav`
  display: flex;
  gap: 36px;
`;

const NavItem = styled.a`
  position: relative;
  font-weight: 600;
  font-size: 15px;
  color: #333333;
  text-decoration: none;
  letter-spacing: 0.5px;
  transition: color 0.2s ease;

  &:hover {
    color: #7ebdf4;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0; right: 0;
    bottom: -6px;
    height: 2px;
    background: #7ebdf4;
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.25s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const DEFAULT_ITEMS = [
  { id: "profile", label: "ABOUT ME",  href: "#profile" },
  { id: "skill",   label: "SKILLS",      href: "#skill" },
  { id: "project", label: "PROJECTS",  href: "#project" },
];

export default function Navbar({ items }) {
  const list = items ?? DEFAULT_ITEMS;

  return (
    <Wrap>
      <Row>
        <Brand href="#home">Jinwon's Portfolio</Brand>
        <Nav>
          {list.map((it) => (
            <NavItem key={it.id} href={it.href}>
              {it.label}
            </NavItem>
          ))}
        </Nav>
      </Row>
    </Wrap>
  );
}