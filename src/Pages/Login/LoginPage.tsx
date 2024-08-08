import LoginForm from "../../Components/LoginForm/LoginForm";
import Login from "../../Types/Login";
import "./LoginPage.scss";

type LoginPageProps = {
  handleLogin: (details: Login) => void;
};

const LoginPage = ({ handleLogin }: LoginPageProps) => {
  return (
    <div className="loginpage">
      <LoginForm
        handleLogin={handleLogin}
        userNotFound={false}
        formType="login"
      />
    </div>
  );
};

export default LoginPage;
