import { Link } from 'react-router';
import "../Pages.css";

function NotFound() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ marginTop: "40px" }}>404 — Pagina nu există</h2>
      <button className="btn_Home">
        <Link to="/" className="link_Home">Home</Link>
      </button>
    </div>
  );
}

export default NotFound;