import LoginForm from "../../Components/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <div>
      <LoginForm userNotFound={false} formType="login" />
    </div>
  );
};

export default LoginPage;
