import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

export default function Feed() {
  const { token, user } = useAuth(); 
  const [posts, setPosts] = useState([]);

  const fetchPosts = useCallback(async () => {
  const res = await axios.get(
    "http://localhost:5000/api/posts",
    { headers: { Authorization: token } }
  );
  setPosts(res.data);
}, [token]);
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleLike = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/posts/like/${id}`,
        {},
        { headers: { Authorization: token } }
      );

      setPosts(posts.map(post =>
        post._id === id ? res.data : post
      ));
    } catch (err) {
      alert(err.response?.data || "Error");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 fw-bold">Feed</h2>

      {posts.map(post => {
        const isLiked = post.likes.includes(user?._id);

        return (
          <div
            key={post._id}
            className="card shadow-sm border-0 mb-4 rounded-4 overflow-hidden"
          >
            {post.image && (
  <img
    src={`http://localhost:5000${post.image}`}
    className="card-img-top"
    alt="Post"
    style={{ maxHeight: "400px", objectFit: "cover" }}
  />
)}

            <div className="card-body">
              <h5 className="card-title fw-bold">{post.title}</h5>
              <p className="card-text text-muted">{post.content}</p>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <small className="text-secondary">
                  By: {post.author?.name}
                </small>

                <div className="d-flex align-items-center gap-2">
                  <button
                    className={`btn btn-sm ${
                      isLiked ? "btn-danger" : "btn-outline-danger"
                    } rounded-pill px-3`}
                    onClick={() => handleLike(post._id)}
                  >
                    {isLiked ? "❤️ Liked" : "🤍 Like"}
                  </button>

                  <span className="fw-semibold">
                    {post.likes.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}