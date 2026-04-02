import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json("Not authorized");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    next();
  } catch {
    res.status(401).json("Invalid token");
  }
};

export const isAdmin = (req, res, next) => {
if (req.user.role !== "admin") {
return res.status(403).json({ message: "Access forbidden - Admin only" });
}
next();
}