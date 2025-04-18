import { ClipLoader } from 'react-spinners';
import css from './Loader.module.css';

const Loader = ({ loading = true }) => {
  return (
    <div className={css.loaderWrapper}>
      <ClipLoader color="#36d7b7" loading={loading} size={50} aria-label="Loading Spinner" />
    </div>
  );
};

export default Loader;
