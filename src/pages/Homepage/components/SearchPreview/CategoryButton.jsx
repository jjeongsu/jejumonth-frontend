import PropTypes from 'prop-types';

const CategoryButton = ({ category, onClick }) => {
  return (
    <button onClick={onClick} className="w-75 h-37 bg-gray-4 rounded-30 text-gray-8 text-14">
      {category}
    </button>
  )
}

CategoryButton.propTypes = {
  category: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default CategoryButton;