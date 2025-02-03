import { createPortal } from 'react-dom';

const Dialog = ({ children }) => {
  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">{children}</div>
    </div>,
    document.getElementById('modal'),
  );
};

export default Dialog;
