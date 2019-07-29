// types of action
const Types = {
  UPDATE_TOKEN: "UPDATE_TOKEN"
};
// actions
const updateToken = token => ({
  type: Types.UPDATE_TOKEN,
  payload: token
});

export default {
  updateToken,
  Types
};