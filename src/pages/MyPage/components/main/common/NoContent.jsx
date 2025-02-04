import PropTypes from 'prop-types';

const NoContent = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full p-10 mt-16 border border-gray-6 border-dashed min-h-80px">
      <img src="/images/harbang.png" alt="한라봉 캐릭터 이미지" className="w-150" />
      <p className="text-gray-7">{children}</p>
    </div>
  );
};

export default NoContent;

NoContent.propTypes = {
  children: PropTypes.node,
};
