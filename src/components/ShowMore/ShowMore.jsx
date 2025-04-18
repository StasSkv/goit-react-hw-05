import css from './ShowMore.module.css';
import { FaArrowAltCircleRight } from 'react-icons/fa';

const ShowMore = ({onClick}) => {
  return (
    <button className={css.btn} onClick={onClick}>
      <span>
        <FaArrowAltCircleRight className={css.icon} />
      </span>
      Show more
    </button>
  );
};

export default ShowMore;
