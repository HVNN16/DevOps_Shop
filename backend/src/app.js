import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

// Routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/user_routes.js';
import orderRoutes from './routes/order_routes.js';
import cartRoutes from './routes/cart_routes.js';
import authRoutes from './routes/auth_routes.js';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Phone Store API",
      version: "1.0.0",
      description: "RESTful API cho hệ thống cửa hàng điện thoại",
    },
    servers: [{ url: "http://localhost:" + (process.env.PORT || 8081) }],
  },
  // 👉 quét cả route và docs
  apis: ["./src/routes/*.js", "./src/docs/*.js"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Mount routes
// Routes
app.use("/api/auth", authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
export default app;
