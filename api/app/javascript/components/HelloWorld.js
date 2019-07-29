import React from "react"
import PropTypes from "prop-types"
class HelloWorld extends React.Component {

  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.signIn = this.signIn.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.makeRequest = this.makeRequest.bind(this);

    //this.createAccount("m@mail.com", "markaaa@mail.com");
    this.signIn("m@mail.com", "markaaa@mail.com");
    this.makeRequest()
  }

  signIn = (email, password) => {
    axios.post('http://localhost:3000/auth/sign_in.json', {
      email: email,
      password: password
    }).then((response) => {
      this.setState({client: response.headers.client});
      this.setState({'access-token' : response.headers['access-token']});
      this.setState({'expiry' : response.headers.expiry});
      this.setState({'uid' : response.headers.uid});

      console.log(response);
      console.log(this.state);
    })
    .catch((error) => {
      console.log(error);
    });
  }

createAccount = (email, password) => {
    axios.post('http://localhost:3000/auth', {
      email: email,
      password: password
    })
    .then((response) => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

makeRequest = () => {
    const axios_instance = axios.create({
      headers: { "access-token": this.state['access-token'],
                  "token-type":   "Bearer",
                  "client":       this.state.client,
                  "expiry":       this.state.expiry,
                  "uid":          this.state.uid  }
    });

    axios_instance.get('http://localhost:3000/restaurants')
    .then((response) => {
      if ('access-token' in response.headers){
        this.setState({'access-token' : response.headers['access-token']});
      }
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

render () {
  return (
    <React.Fragment>
    Greeting: {this.props.greeting}
    </React.Fragment>
    );
}
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};
export default HelloWorld
