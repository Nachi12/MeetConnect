// new code
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db');
const admin = require('./firebaseAdmin');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs'); 
const authRoutes = require('./routes/auth');
const interviewRoutes = require('./routes/interviews');
const userRoutes = require('./routes/users');
const resourceRoutes = require('./routes/resources');
const uri = process.env.MONGO_URI;
const app = express();
const swaggerDocument = YAML.load(path.join( 'swagger.yaml'));
// ===== Logger Middleware (Only in non-test) =====
if (process.env.NODE_ENV !== 'test') {
  app.use((req, res, next) => {
    console.log('\n🌐 ========================================');
    console.log(`📨 ${req.method} ${req.url}`);
    console.log('🔍 Headers:', req.headers);
    console.log('========================================\n');
    next();
  });
}

// ===== CORS Setup =====
const allowedOrigins = [
  'http://localhost:5173',
  'https://connect-frontend1.netlify.app', // ✅ Netlify frontend
   // (optional if backend calls itself)
];

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow requests with no origin (e.g. mobile apps, curl)
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      console.warn(`❌ Blocked by CORS: ${origin}`);
      return cb(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// ✅ Handle preflight OPTIONS requests globally
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  return res.sendStatus(200);
});

// ===== Body Parsers =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files from /public (like favicon.ico)
app.use(express.static(path.join(__dirname, 'public')));

// ===== Routes =====
app.get('/', (req, res) => {
  res.json({ message: 'API is running', timestamp: new Date() });
});

app.post('/api/interviews/test', (req, res) => {
  res.json({ message: 'Test route working', body: req.body });
});
// used for warming the backend
app.get('/ping', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/resources', resourceRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// ===== Start Server =====
const startServer = async () => {
  try {
    if (process.env.NODE_ENV !== 'test') {
      await connectDB();
      console.log('✅ MongoDB connected successfully');
      const PORT = process.env.PORT || 5001;
      app.listen(PORT, "0.0.0.0", () => {
        console.log(`✅ Server running on port ${PORT}`);
        // console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
        console.log(`Swagger UI:https://meetconnect-1.onrender.com/api-docs`);
        console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      });
    }
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};


if (require.main === module) {
  startServer();
}

module.exports = app;
