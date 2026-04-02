import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Register() {
  const { register, error } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    birthday: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body p-5">
                <h2 className="text-center mb-4">
                  Regjistrohu
                </h2>

                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <input
                    className="form-control mb-3"
                    placeholder="Emri"
                    onChange={e =>
                      setForm({ ...form, name: e.target.value })
                    }
                    required
                  />

                  <input
                    className="form-control mb-3"
                    type="email"
                    placeholder="Email"
                    onChange={e =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />

                  <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Fjalëkalimi"
                    onChange={e =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                  />

                  <input
                    className="form-control mb-4"
                    type="date"
                    onChange={e =>
                      setForm({ ...form, birthday: e.target.value })
                    }
                  />

                  <button className="btn btn-primary w-100">
                    Regjistrohu
                  </button>
                </form>

                <p className="text-center mt-3">
                  Ke llogari? <Link to="/login">Kyçu këtu</Link>
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}