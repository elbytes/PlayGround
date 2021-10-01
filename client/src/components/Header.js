import React, { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndent } from '@fortawesome/free-solid-svg-icons'
import logo from '../images/logo512.png'
import { Nav, Navbar, Button, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
const styles = {
  btn: { fontFamily: 'Prompt' },
  navItems: { display: 'flex' },
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
      <Navbar collapseOnSelect expand='lg' variant='light'>
        <Nav>
          {' '}
          <Navbar.Brand href='#home'>
            <img
              src={logo}
              width='30'
              height='30'
              className='d-inline-block align-top'
              alt='PlayGround logo'
            />
          </Navbar.Brand>
          <Navbar.Brand className='logo' href='/'>
            Welcome to PlayGround
          </Navbar.Brand>
        </Nav>

        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto'>
            {userInfo ? (
              <div style={styles.navItems} align={{ lg: 'end' }}>
                <NavDropdown
                  title={userInfo.name}
                  id='username'
                  align={{ lg: 'end' }}
                  style={{ marginRight: '5em' }}
                >
                  <NavDropdown.Item href='/home'>
                    {dashboardIcon} Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            ) : (
              <Nav.Link href='/login'>
                {' '}
                <Button
                  variant='warning'
                  className='text-black'
                  style={styles.btn}
                >
                  Sign In
                </Button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

export default Header
