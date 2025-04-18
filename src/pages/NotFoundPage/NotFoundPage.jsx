import { NavLink } from 'react-router-dom';
import oopsImage from '../../images/oops.jpg';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={css.NotFound}>
     <nav>
        <NavLink to="/" className={css.link}>
          Іди до Home
        </NavLink>
     </nav>
      <img src={oopsImage} alt="oops" width={500} height={400} />
    </div>
  );
};

export default NotFoundPage;
