import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import ActivityListScreen from './screens/ActivityListScreen'
import LandingScreen from './screens/LandingScreen'
import HomeScreen from './screens/HomeScreen'
import ActivityScreen from './screens/ActivityScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/' component={LandingScreen} exact />
            <Route path='/activity/:name' component={ActivityScreen} />
            <Route path='/activity' component={ActivityListScreen} exact />
            <Route path='/home' component={HomeScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/search:keyword' component={HomeScreen} exact />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
