import React, { Component } from "react";
import { Link } from "react-router-dom";
  import {
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarText,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown,
  } from "reactstrap";
  
import logo from "../logo/cover.png"

class Header extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <div>
        <Navbar  light expand="md" style={{backgroundColor:"#FAEAF0"}}>
          <NavbarBrand> <Link to="/"><img src={logo} alt="logo" style={{width:"30 px", height:"70px" }} /> </Link></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>  
              </NavItem>
              
              
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Categories
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Chocolate</DropdownItem>
                  <DropdownItem>Syrup</DropdownItem>
                  <DropdownItem>Biscuit</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>

            <NavbarText><Link to="/Register" style={{textDecoration:"none", color:"brown"}}> Register</Link></NavbarText>
            <NavbarText>&nbsp;| &nbsp;  </NavbarText>
            <NavbarText><Link to="/login" style={{textDecoration:"none", color:"brown"}}> Login</Link></NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
