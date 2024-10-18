import AuthContainer from "@/components/auth/AuthContainer";
import AuthLogo from "@/components/auth/AuthLogo";
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
