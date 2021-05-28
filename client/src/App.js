import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import LandingScreen from './screens/LandingScreen'
import HomeScreen from './screens/HomeScreen'
import About from './screens/About'
import Legal from './screens/Legal'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import VideoCallDashboard from './components/Videocall/VideoCallDashboard'
import NotFound from './screens/NotFound'
const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/' component={LandingScreen} exact />
            <Route path='/home' component={HomeScreen} />
            <Route path='/about' component={About} />
            <Route path='/legal' component={Legal} />
            <Route path='/dashboard' component={VideoCallDashboard} exact />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='*' component={NotFound} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
