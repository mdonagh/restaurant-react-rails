import ContainerCreator from "./ContainerCreator";
import Meals from "../components/Meals"
import Login from "../components/Login"
import Meal from "../components/Meal"
import Signup from "../components/Signup"
import Users from "../components/Users"
import User from "../components/User"
import ShowUser from "../components/ShowUser"

const MealsContainer = ContainerCreator(Meals)
const LoginContainer = ContainerCreator(Login)
const MealContainer = ContainerCreator(Meal)
const SignupContainer = ContainerCreator(Signup)
const UsersContainer = ContainerCreator(Users)
const UserContainer = ContainerCreator(User)
const ShowUserContainer = ContainerCreator(ShowUser)

export default SignupContainer
export {
  MealsContainer,
  LoginContainer,
  MealContainer,
  SignupContainer,
  UsersContainer,
  UserContainer,
  ShowUserContainer
}
