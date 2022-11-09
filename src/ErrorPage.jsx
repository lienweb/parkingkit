import { useRouteError, Link } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <main style={{
      display: 'flex',
      'flex-direction': 'column',
      'align-items': 'center',
      width: '100%',
      height: '100vh',
      'padding-top': '5rem',
    }}
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/">go back to home page</Link>
    </main>
  );
}
