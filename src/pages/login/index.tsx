import AuthContainer from "@/components/auth/AuthContainer";
import AuthLogo from "@/components/auth/AuthLogo";
import LoginForm from "@/components/auth/LoginForm";

const Login = ()=> {
  return(
    <AuthContainer>
    <AuthLogo />
    <LoginForm />
    </AuthContainer>
  )
}

export default Login;