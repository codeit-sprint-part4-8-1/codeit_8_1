import AuthContainer from "@/components/auth/AuthContainer";
import AuthLogo from "@/components/auth/authLogo";
import SignUpForm from "@/components/auth/SignUpForm";

const SignUp = ()=> {
  return(
  <AuthContainer>
    <AuthLogo />
    <SignUpForm />
  </AuthContainer>
  )
}

export default SignUp;