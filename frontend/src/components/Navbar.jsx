import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-3">
      <div className="container">
        
        <Link className="navbar-brand fw-bold fs-4" to="/">
          Socialmedia
        </Link>

        <div className="d-flex align-items-center gap-2">
          {!token ? (
            <>
              <Link className="btn btn-outline-light rounded-pill px-4" to="/login">
                Login
              </Link>
              <Link className="btn btn-light rounded-pill px-4 text-primary fw-semibold" to="/register">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light rounded-pill px-4" to="/feed">
                Feed
              </Link>
              <Link className="btn btn-outline-light rounded-pill px-4" to="/profile">
                Profile
              </Link>
              <button
                onClick={logout}
                className="btn btn-light text-danger rounded-pill px-4 fw-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}