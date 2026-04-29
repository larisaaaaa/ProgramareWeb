import { Link } from 'react-router';

function NotFound() {
  return (
    <>
      <h2>404 — Pagina nu există</h2>
      <Link to="/">Home</Link>
    </>
  );
}

export default NotFound;