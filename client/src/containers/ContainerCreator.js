import { connect } from 'react-redux'
import { updateToken } from '../redux/actions'
import ACTIONS from "../redux/actions";
import axios from 'axios'

const mapStateToProps = (state, ownProps) => ({
  tokenAuthHeaders: state.tokenAuthHeaders,
  ownProps: ownProps
});

const mapDispatchToProps = dispatch => ({
  updateToken: token => dispatch(ACTIONS.updateToken(token))
});

const mergeProps = (state, actions) => ({
  ...state,
  ...actions,
  signIn: function(email, password) {
    axios.post('http://localhost:3001/auth/sign_in.json', {
      email: email,
      password: password
    }).then((response) => {
      this.updateToken({
        'client' : response.headers.client,
        'access-token' : response.headers['access-token'],
        'expiry' : response.headers.expiry,
        'uid' : response.headers.uid,
        'role' : response.data.data.role
      })
    })
    .catch((error) => {
      console.log(error);
    });
  },
  createAccount: function(user) {
    axios.post('http://localhost:3001/auth', user)
    .then((response) => {
      this.signIn(user.email, user.password)
      console.log(response);
})
    .catch(function (error) {
      console.log(error);
    });
  },
  apiRequest: function(url, method, body = {}){
    return axios({ method: method,
                   url: "http://localhost:3001" + url,
                   data: body,
                   headers: this.tokenAuthHeaders
                })
      .then((response) => {
        console.log(response.headers);
      if ('access-token' in response.headers && response.headers['access-token'].length > 0){
        this.updateToken({'access-token' : response.headers['access-token']});
      }
      console.log(response)
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  postRequest: function (url, body) {
    return this.apiRequest(url, 'post', body)
  },
  putRequest: function (url, body) {
    return this.apiRequest(url, 'put', body)
  },
  deleteRequest: function (url, body) {
    return this.apiRequest(url, 'delete', body)
  },
  getRequest: function (url) {
    return this.apiRequest(url, 'get')
  },
});

const ContainerCreator = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
  )

  export default ContainerCreator
  