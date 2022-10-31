export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://playlist-backend.vercel.app"
    : "http://localhost:5000";
