import { LinkContainer, Link } from 'react-router-bootstrap'
import React, { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndent } from '@fortawesome/free-solid-svg-icons'
import logo from '../images/logo512.png'
import { Nav, Navbar, Button, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
const styles = {
  btn: { fontFamily: 'Prompt' },
}
const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const dashboardIcon = <FontAwesomeIcon icon={faIndent} />
  const logoutHandler = () => {
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

        <LinkContainer to='/'>
          <Navbar.Brand className='logo'>PlayGround</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' className='d-flex'>
          <Nav className='ml-auto p-2'>
            {userInfo && (
              <Nav.Link href='/home'>Go to Dashboard {dashboardIcon}</Nav.Link>
            )}
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username' className='mr-4'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link>
                  <Button
                    variant='warning'
                    className='text-black'
                    style={styles.btn}
                  >
                    Sign In
                  </Button>
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

export default Header
