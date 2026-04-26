import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

interface FormValues {
  query: string;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const initialValues: FormValues = {
    query: '',
  };

  const Schema = Yup.object().shape({
    query: Yup.string()
      .min(2, 'Search query must be at least 2 symbols')
      .max(15, 'Too long seqrch query')
      .required('Query is required'),
  });

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const value = values.query;

    onSubmit(value);

    actions.resetForm();
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <Formik
          initialValues={initialValues}
          validationSchema={Schema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <div className={css.wrapper}>
              <Field
                className={css.input}
                type="text"
                name="query"
                autoComplete="off"
                placeholder="Search movies..."
                autoFocus
              />
              <button className={css.button} type="submit">
                Search
              </button>
              <div className={css.errorWrapper}>
                <ErrorMessage
                  name="query"
                  component="span"
                  className={css.error}
                />
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </header>
  );
};

export default SearchBar;
