import ContainerCreator from "./ContainerCreator";
import Home from "../components/Home"
import Login from "../components/Login"
import Meal from "../components/Meal"
import Signup from "../components/Signup"
import Users from "../components/Users"

const HomeContainer = ContainerCreator(Home)
const LoginContainer = ContainerCreator(Login)
const MealContainer = ContainerCreator(Meal)
const SignupContainer = ContainerCreator(Signup)
const UsersContainer = ContainerCreator(Users)

export default SignupContainer
export {
  HomeContainer,
  LoginContainer,
  MealContainer,
  SignupContainer,
  UsersContainer
}
