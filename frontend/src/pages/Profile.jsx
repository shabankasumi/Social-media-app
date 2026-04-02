import { useEffect, useState, useCallback} from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

export default function Profile() {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);

  const fetchMyPosts = useCallback(async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/posts/my-posts",
      { headers: { Authorization: token } }
    );
    setPosts(res.data);
  } catch (err) {
    console.log(err);
  }
}, [token]);

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?"))
      return;

    try {
      await axios.delete(
        `http://localhost:5000/api/posts/${id}`,
        { headers: { Authorization: token } }
      );

      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      alert(err.response?.data || "Error deleting post");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 fw-bold"> My Posts</h2>

      {posts.map(post => (
        <div
          key={post._id}
          className="card shadow-sm border-0 mb-4 rounded-4 overflow-hidden"
        >
          {post.image && (
            <img
              src={`http://localhost:5000${post.image}`}
              alt="Post"
              className="card-img-top"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          )}

          <div className="card-body">
            <h5 className="fw-bold">{post.title}</h5>
            <p className="text-muted">{post.content}</p>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <span className="fw-semibold">
                ❤️ {post.likes.length}
              </span>

              <button
                className="btn btn-sm btn-outline-danger rounded-pill px-3"
                onClick={() => handleDelete(post._id)}
              >
                 Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}