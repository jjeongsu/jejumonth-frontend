import { useSelector } from 'react-redux';
import Form from '../../../../../components/common/Form';
import userUpdateInputs from './userUpdateInputs';

const UpdateUserSection = () => {
  const id = useSelector(state => state.user.userId);
  const fullName = useSelector(state => state.user.userFullName);

  // password, image, nickname
  const onSubmit = data => {
    // 데이터에 image값이 있으면
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
