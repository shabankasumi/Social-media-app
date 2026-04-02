import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

export default function Login() {
  const { login, error } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <h2 className="text-center mb-4 fw-bold text-primary">
                  Kyçuni
                </h2>

                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <input
                    className="form-control mb-3"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />

                  <input
                    className="form-control mb-4"
                    type="password"
                    placeholder="Fjalëkalimi"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                  />

                  <button className="btn btn-primary w-100 fw-bold">
                    Kyçu
                  </button>
                </form>

                <div className="text-center mt-3">
                  <Link
                    to="/forgot-password"
                    className="text-muted small"
                  >
                    Ke harruar fjalëkalimin?
                  </Link>
                  <br />
                  <Link
                    to="/register"
                    className="text-primary"
                  >
                    Regjistrohu këtu
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}