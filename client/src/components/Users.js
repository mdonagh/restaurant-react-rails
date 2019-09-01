import React from 'react';
import { Link } from 'react-router-dom'
import { Table, Row, Container, FormLabel, Spinner, Button, Col } from "react-bootstrap";
import { Redirect } from 'react-router-dom'

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isLoaded: false, users: [] };
    this.getUsers = this.getUsers.bind(this);
    this.isAdmin = this.props.tokenAuthHeaders.role === 'admin' || this.props.tokenAuthHeaders.role === 'user_manager'
    this.getUsers();
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({'isLoaded' : true})
  }

 componentWillUnmount() {
    this._isMounted = false;
  }

  deleteUserRequest = async (user_id) => {
    const request = this.props.deleteRequest("/users/" + user_id);
    const response = await request;
    this.getUsers();
  }

  deleteUser(user_id){
    this.deleteUserRequest(user_id)
  }

  getUsers = async () => {
    const request = this.props.getRequest('/users');
    const response = await request;
    if (this._isMounted) {
      this.setState({users: response.data})
    }
  }

render () {
  if(this.state.isLoaded){
    return(
  <Container>
  <Row>
    <Col><Link to="/user"><Button variant="link">New User</Button></Link></Col>
    <Col>
          { this.isAdmin ? 
            <Link to="/users">
            <Button variant="link">
            Users
            </Button>
            </Link> : null }
    </Col>
  </Row>
  <Row className="justify-content-md-center">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Calorie Goal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.users.map(user => (
              <tr key={user.id} align="start">
              <td><Link to={"/user/" + user.id}>{user.id}</Link></td>
              <td>{user.uid}</td>
              <td>{user.calories}</td>
              <td>
              <Link to={"/user-edit/" + user.id}>
              <Button
                block
                bsize="small"
                variant="warning"
              >
              Edit
              </Button>
              </Link>
              <Button
                block
                bsize="small"
                variant="danger"
                onClick={() => this.deleteUser(user.id)}
              >
              Delete
              </Button>
            </td>
              </tr>
              ))
          }
        </tbody>
      </Table>
    </Row>
  </Container>
    )
  }
  else{
    if (!('role' in this.props.tokenAuthHeaders) || this.props.tokenAuthHeaders.role == 'user' )
    {
      return ( <Redirect to="/" /> )
    }
    else{
      return (
        <div>
         <Spinner animation="grow" variant="success" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
        </div>
        )
    }
  }
}
}

export default Users;
