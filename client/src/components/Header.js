import { LinkContainer, Image } from 'react-router-bootstrap'
import React, { useDispatch, useSelector } from 'react-redux'
import logo from '../images/logo512.png'
import { Nav, Navbar, Button, Container, NavDropdown , Col} from 'react-bootstrap'
import {logout} from '../actions/userActions'


const Header = () => {
  const dispatch = useDispatch()
  const userLogin =  useSelector((state) => state.userLogin)
  const {userInfo} = userLogin

  const logoutHandler = () =>{
    dispatch(logout())
  }
  
  return (
    <header>
      <Navbar variant='light' expand='lg' collapseOnSelect>

        <LinkContainer to='/'>
          <Navbar.Brand>
            <img
              src={logo}
              width='30'
              height='30'
              className='d-inline-block align-top'
              alt='PlayGround logo'
            />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <LinkContainer to='/'>
          <Navbar.Brand className='logo'>PlayGround</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />

        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            {userInfo ?(
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>{userInfo.name}'s profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ): <LinkContainer to='/login'>
            <Nav.Link>
              <Button variant='warning' className='text-black'>Sign In</Button>
            </Nav.Link>
          </LinkContainer>}

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

export default Header
