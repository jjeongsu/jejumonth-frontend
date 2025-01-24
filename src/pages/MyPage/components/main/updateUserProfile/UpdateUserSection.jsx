import { useSelector } from 'react-redux';
import Form from '@components/common/Form';
import userUpdateInputs from './userUpdateInputs';
import { putUserFullname, putUserPassword, postProfileImage } from '@/apis/user';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slices/user.slice';

const UpdateUserSection = () => {
  const fullName = useSelector(state => state.user.userFullName);
  const dispatch = useDispatch();

  // password, image, nickname
  const onSubmit = async data => {
    console.log('data', data);
    const { nickname, password, image } = data;
    // 데이터에 값이 있냐에 따라 다르게 요청
    if (nickname) {
      const result = await putUserFullname({ fullName: nickname });
      const userData = {
        userEmail: result.email,
        userId: result._id,
        userFullName: result.fullName,
      };

      dispatch(
        setUser({
          ...userData,
        }),
      );
    }
    if (password) {
      const result = await putUserPassword({ password: password });
      //console.log('비밀번호 수정 응답', result);
    }
    if (image) {
      const formData = new FormData();
      formData.append('isCover', false);
      formData.append('image', image[0]);
      const result = await postProfileImage(formData);
      //console.log('image 보내기 응답', result);
    }
  };

  const formProps = {
    onSubmit: onSubmit,
    submitButtonText: '수정하기',
    inputs: userUpdateInputs,
    watchTarget: 'password',
  };

  return (
    <div className=" w-full">
      <h1 className="text-24 font-semibold">{fullName || '유저'}님의 회원정보</h1>
      <div className="w-316">
        <Form {...formProps}></Form>
      </div>
    </div>
  );
};

export default UpdateUserSection;
