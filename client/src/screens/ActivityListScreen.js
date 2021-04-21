import { Row, Col, Container, Card } from 'react-bootstrap'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Activity from '../components/Activity'
import { listActivities } from '../actions/activityActions'

const ActivityListScreen = () => {
  const dispatch = useDispatch()

  const activityList = useSelector((state) => state.activityList)
  const { loading, error, activities } = activityList

  useEffect(() => {
    dispatch(listActivities())
  }, [dispatch])

  return (
    <>
      <h1>ActivityListScreen</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Card>
          Test
          <Container className='container-full-width'>
            <Row>
              {console.log(activities)}
              {activities.map((activity) => (
                <Col key={activity.name} sm={12} md={6} ls={4} xl={3}>
                  <Activity activity={activity} />
                </Col>
              ))}
            </Row>
          </Container>
        </Card>
      )}
    </>
  )
}

export default ActivityListScreen
