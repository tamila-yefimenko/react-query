import { Oval } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <Oval
      height={80}
      width={80}
      color="blue"
      strokeWidth={2}
      secondaryColor="dark-blue"
      wrapperClass={css.loader}
    />
  );
};

export default Loader;
