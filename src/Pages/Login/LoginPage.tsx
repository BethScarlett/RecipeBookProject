import LoginForm from "../../Components/LoginForm/LoginForm";
import "./LoginPage.scss";

const LoginPage = () => {
  return (
    <div className="loginpage">
      <LoginForm userNotFound={false} formType="login" />
    </div>
  );
};

export default LoginPage;
