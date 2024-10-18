export const getValidation = (value: string, passwordValue?: string) => {
  switch (value) {
    case 'nickname':
      return { required: '닉네임을 입력해주세요' };
    case 'password':
      if (passwordValue) {
        return {
          minLength: {
            value: 8, // 최소 8자 이상이어야 함
            message: '비밀번호는 8자 이상이어야 합니다.',
          },
        };
      }
      break;
    case 'passwordCheck':
      return {
        validate: (value: string) => {
          // 비밀번호가 입력 안되어있고 재입력도 입력 안 되어있는 경우
          if (!passwordValue && !value) {
            return true;
          }
          // 비밀번호와 재입력이 일치하지 않는 경우
          return value === passwordValue || '비밀번호가 일치하지 않습니다.';
        },
      };
  }
};
