import LoginForm from "../../Components/LoginForm/LoginForm";
import Navbar from "../../Components/Navbar/Navbar";
import "./LoginPage.scss";

const LoginPage = () => {
  return (
    <div className="loginpage">
      <Navbar heading="Recipe Book" drawMenu={false} />
      <LoginForm userNotFound={false} formType="login" />
    </div>
  );
};

export default LoginPage;
