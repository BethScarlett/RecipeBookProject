import { useNavigate } from "react-router-dom";
import LoginForm from "../../Components/LoginForm/LoginForm";
import Login from "../../Types/Login";
import "./LoginPage.scss";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (details: Login) => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });
      const result = await response.json();
      if (result == true) {
        navigate("/");
      } else console.log("No user found");
      console.log(result);
    } catch (Error) {
      console.log(Error);
    }
  };

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
