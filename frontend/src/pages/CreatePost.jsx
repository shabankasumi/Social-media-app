import { useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    image: ""
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("image", form.image);

    await axios.post(
      "http://localhost:5000/api/posts",
      formData,
      {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    navigate("/feed");

  } catch (err) {
    console.log(err.response?.data);
    alert("Post failed");
  }
};

  return (
    <div className="container mt-5" style={{ paddingBottom: "80px" }}>
      <div className="card shadow p-4">
        <h3 className="mb-4 text-center">Create Post</h3>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
          />

          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="What's on your mind?"
            value={form.content}
            onChange={(e) =>
              setForm({ ...form, content: e.target.value })
            }
            required
          />

          <input
            className="form-control mb-4"
            placeholder="Image URL (optional)"
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setForm({ ...form, image: file });
            }}
          />

          <button className="btn btn-primary w-100">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}