import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/api.slice.login";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
} from "reactstrap";


export default function NavBarCustom() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const qty = useSelector((state: RootState) => state.count);
  const toggle = () => setIsOpen(!isOpen);
  
  const { isAdmin } = useSelector((state: RootState) => state.apiLogin);
  const dispatch = useDispatch();

  function Logout() {
    dispatch(logout());
    navigate("/");
  }
  return (
    <div>
      <Navbar
        
        style={{ position: "sticky", top: "0", backgroundColor: "lightgray" }}
      >
        <NavbarBrand className="mr-auto">Loja Online</NavbarBrand>

        <NavItem onClick={() => navigate("/home")}>
          <NavLink>Produtos</NavLink>
        </NavItem>
         

        <Nav navbar>

        {/* SE USUARIO ISADMIN MOSTRA OPÇÃO DO CARRINHO */}
        {!isAdmin ? (
          <NavItem onClick={() => navigate("/cart")}>
            <NavLink>Carrinho ({qty.value})</NavLink>
          </NavItem>
        ) : null}

        <NavItem onClick={() => Logout()}>
          <NavLink>Logout</NavLink>
        </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}
