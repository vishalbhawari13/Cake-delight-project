const express = require("express");

const {
  createProxyMiddleware,
} = require("http-proxy-middleware");

const services = require("../config/services");

const router = express.Router();


// ===============================
// Catalog Service
// ===============================

router.use(
  "/catalog",
  createProxyMiddleware({
    target: services.catalog,
    changeOrigin: true,

    pathRewrite: (path) => {
      return `/api/catalog${path}`;
    },

    on: {
      proxyReq: (proxyReq, req) => {
        console.log(
          `Gateway → Catalog: ${req.method} ${req.originalUrl}`
        );
      },

      error: (error, req, res) => {
        console.error(
          "Catalog Service Error:",
          error.message
        );
      },
    },
  })
);


// ===============================
// Order Service
// ===============================

router.use(
  "/orders",
  createProxyMiddleware({
    target: services.order,
    changeOrigin: true,

    pathRewrite: (path) => {
      return `/api/orders${path}`;
    },

    on: {
      proxyReq: (proxyReq, req) => {
        console.log(
          `Gateway → Order: ${req.method} ${req.originalUrl}`
        );
      },

      error: (error, req, res) => {
        console.error(
          "Order Service Error:",
          error.message
        );
      },
    },
  })
);


// ===============================
// Rating Service
// ===============================

router.use(
  "/ratings",
  createProxyMiddleware({
    target: services.rating,
    changeOrigin: true,

    pathRewrite: (path) => {
      return `/api/ratings${path}`;
    },

    on: {
      proxyReq: (proxyReq, req) => {
        console.log(
          `Gateway → Rating: ${req.method} ${req.originalUrl}`
        );
      },

      error: (error, req, res) => {
        console.error(
          "Rating Service Error:",
          error.message
        );
      },
    },
  })
);


// ===============================
// Notification Service
// ===============================

router.use(
  "/notifications",
  createProxyMiddleware({
    target: services.notification,
    changeOrigin: true,

    on: {
      proxyReq: (proxyReq, req) => {
        console.log(
          `Gateway → Notification: ${req.method} ${req.originalUrl}`
        );
      },

      error: (error, req, res) => {
        console.error(
          "Notification Service Error:",
          error.message
        );
      },
    },
  })
);


module.exports = router;