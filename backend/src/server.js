import './config/env.js';
import { connectDB } from './config/db.js';
import app from './app.js';

const PORT = process.env.PORT || 8081;
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📚 Swagger UI: http://localhost:${PORT}/api-docs`);
});
