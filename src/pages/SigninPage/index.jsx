import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Form from '../../components/common/Form';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { postSigninApi } from '../../apis/userApi';
import { setUser } from '../../redux/slices/user.slice';
import { setCookie } from '../../utils/cookie';
// 로그인
const SigninPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async data => {
    const { email, password } = data;
    const loginReqData = { email, password };

    // 로그인 요청
    const result = await postSigninApi(loginReqData);

    // userData를 전역에 저장
    if (result) {
      // result의 토큰과 유저정보 받아오기
      const jwt = result.token;
      const userData = {
        userEmail: result.user.email,
        userId: result.user._id,
        userFullName: result.user.fullName,
      };
      // 쿠키에 jwt 저장
      setCookie('jwt', jwt, { path: '/' });

      // 사용자 정보를 redux에 저장
      dispatch(
        setUser({
          ...userData,
        }),
      );

      // 이전 페이지로 이동
      navigate(-1);
    }
  };

  const SigninInputs = getValues => {
    return {
      email: {
        attributes: {
          placeholder: '이메일을 입력해주세요',
          type: 'email',
        },
        validate: {
          required: {
            value: true,
            message: '이메일은 필수 입력항목입니다.',
          },
          pattern: {
            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
            message: '올바른 이메일 형식이 아닙니다.',
          },
        },
        options: {
          inputGuide: '@를 포함한 이메일 주소',
          label: '이메일',
        },
      },
      password: {
        attributes: {
          placeholder: '비밀번호를 입력해주세요.',
          type: 'password',
        },
        validate: {
          required: {
            value: true,
            message: '비밀번호는 필수 입력항목입니다.',
          },
          pattern: {
            value:
              /^(?=.*[a-zA-Z])(?=.*\d|.*[!@#$%^&*()_+={}|[\]\\:";'<>?,./])(?=.{8,16}$).*$|^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+={}|[\]\\:";'<>?,./])(?=.{8,16}$).*$|^(?=.*\d)(?=.*[!@#$%^&*()_+={}|[\]\\:";'<>?,./])(?=.{8,16}$).*$/,
            message: '올바른 비밀번호 형식이 아닙니다.',
          },
        },
        options: {
          inputGuide: '영문 대·소문자/숫자.특수문자 중 2가지 이상 조합, 8~16글자',
          label: '비밀번호',
        },
      },
    };
  };
  const formProps = {
    onSubmit: onSubmit,
    headerText: '로그인',
    guideText: '제주 한 달 살기 서비스를 이용하기 위해 로그인해주세요.',
    submitButtonText: '로그인 하기',
    inputs: SigninInputs,
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full">
        <Form {...formProps}>
          <Button className="w-full">
            <Link to="/auth/signup">회원가입</Link>
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SigninPage;
