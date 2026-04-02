import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function BottomBar() {
  const { token } = useAuth();

  if (!token) return null;

  return (
    <div className="position-fixed bottom-0 start-0 w-100 bg-white border-top shadow-lg py-3">
      <div className="d-flex justify-content-center position-relative">
        
        <Link
          to="/create-post"
          className="btn btn-primary rounded-circle shadow-lg d-flex align-items-center justify-content-center"
          style={{
            width: "70px",
            height: "70px",
            fontSize: "30px",
            marginTop: "-40px"
          }}
        >
          +
        </Link>

      </div>
    </div>
  );
}