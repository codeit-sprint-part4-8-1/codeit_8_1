
const createValidations = (passwordValue : string)=> {
  return {
    email : {
      required: "이메일은 필수 입력입니다.",
      pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "이메일 형식에 맞지 않습니다."
      }
    },
    
    password : {
      required: "비밀번호는 필수 입력입니다.",
      minLength: {
      value: 8,
      message: "비밀번호는 8자 이상 입력해주세요."
      }
    },
  
    nickname : {
      required: "닉네임은 필수 입력입니다.",
      maxLength: {
      value: 10,
      message: "닉네임은 10자 이하로 입력해주세요."
      }
    },
  
    passwordRepeat : {
      required: "비밀번호를 한 번 더 입력해주세요.",
      validate : (value : string ) => value === passwordValue || "비밀번호가 일치하지 않습니다.",
    }
  }
}

export default createValidations;