import Button from './Button';

const ButtonWrapper = () => {
  const logoutProps = {
    borderColor: 'gray-5',
    textColor: 'red-500',
    label: '로그아웃',
    onClick: () => {
      console.log('logout 클릭');
    },
  };

  const withdrawalProps = {
    borderColor: 'gray-5',
    textColor: 'gray-5',
    label: '회원 탈퇴',
    onClick: () => {
      console.log('탈퇴 클릭');
    },
  };

  return (
    <div className="flex gap-6 items-center justify-center mt-14 pt-25 border-t border-solid border-t-gray-5">
      <Button {...logoutProps} />
      <Button {...withdrawalProps} />
    </div>
  );
};
export default ButtonWrapper;
