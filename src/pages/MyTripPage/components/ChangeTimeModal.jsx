import ButtonList from '../../AddPlanPage/components/ButtonList.jsx';
import Button from '../../../components/common/Button/index.jsx';

const ChangeTimeModal = ({ setTime, setIsOpenModal, onClick }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-600 h-550 p-6 rounded-lg grid items-center shadow-lg relative">
        <button
          onClick={() => setIsOpenModal(false)}
          className="absolute top-3 right-3 p-5 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <ButtonList setTime={setTime} />
        <div className="flex items-center justify-center py-10">
          <div className="w-150">
            <Button type={'submit'} label={'변경하기'} onClick={onClick} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangeTimeModal;