import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import Form from '../../components/common/Form';
import { postSignupApi } from '../../apis/userApi';
import { setUser } from '../../redux/slices/user.slice';
import { setCookie } from '../../utils/cookie';

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async data => {
    const { email, nickname, password } = data;
    const signUpReqData = {
      email,
      nickname,
      password,
    };
    // 회원가입 요청
    const result = await postSignupApi(signUpReqData);

    // userData를 전역에 저장
    if (result) {
      // result 의 토큰과 유저정보 받아오기
      const jwt = result.token;
      const userData = {
        userEmail: result.user.email,
        userId: result.user._id,
        userFullName: result.user.fullName,
      };

      //쿠키에 jwt 저장
      setCookie('jwt', jwt, { path: '/' });

      // 사용자 정보를 redux에 저장
      dispatch(
        setUser({
          ...userData,
        }),
      );

      // 메인 화면으로 이동
      navigate('/');
    }
  };

  const SignupInputs = getValues => {
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
          type: 'text',
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
      confirmPassword: {
        attributes: {
          placeholder: '비밀번호를 입력해주세요',
          type: 'text',
        },
        validate: {
          required: {
            value: true,
            message: '비밀번호 확인은 필수 입니다.',
          },
          validate: value => {
            const password = getValues('password');
            return password === value || '비밀번호가 일치하지 않습니다.';
          },
        },
        options: {
          label: '비밀번호 확인',
        },
      },
      nickname: {
        attributes: {
          placeholder: '닉네임을 입력해주세요',
          type: 'text',
        },
        validate: {
          required: {
            value: true,
            message: '닉네임은 필수 입력항목입니다.',
          },
          minLength: {
            value: 3,
            message: '닉네임은 3글자 이상 입력해주십시오',
          },
          maxLength: {
            value: 10,
            message: '닉네임은 10글자를 초과할 수 없습니다.',
          },
        },
        options: {
          inputGuide: '3글자 이상 10글자 이하',
          label: '닉네임',
        },
      },
    };
  };

  const formProps = {
    onSubmit: onSubmit,
    headerText: '회원가입',
    guideText: '회원가입에 필요한 정보를 작성해주세요.',
    submitButtonText: '가입하기',
    inputs: SignupInputs,
    watchTarget: 'password',
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full">
        <Form {...formProps}>
          <Button className="w-full">
            <Link to="/">이전으로 돌아가기</Link>
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;
