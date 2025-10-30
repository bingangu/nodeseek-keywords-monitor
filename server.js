/**
 * NodeSeek RSS 代理服务器
 * 用于解决前端跨域问题,直接从服务端获取RSS数据
 */

const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

// RSS 源地址
const RSS_URL = "https://rss.nodeseek.com/";

// 启用 CORS,允许所有来源访问
app.use(cors());

// 提供静态文件服务(前端页面)
app.use(
  express.static(__dirname, {
    index: "index.html",
    extensions: ["html"],
  })
);

// 添加请求日志
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

/**
 * RSS 代理端点
 * GET /api/rss - 获取 RSS XML 数据
 */
app.get("/api/rss", async (req, res) => {
  try {
    console.log("正在获取 RSS 数据...");

    // 从源站获取 RSS 数据
    const response = await fetch(RSS_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; NodeSeek-RSS-Proxy/1.0)",
      },
      timeout: 10000, // 10秒超时
    });

    if (!response.ok) {
      throw new Error(`HTTP 错误! 状态: ${response.status}`);
    }

    const xmlText = await response.text();
    console.log(`✓ 成功获取 RSS 数据 (${xmlText.length} 字符)`);

    // 设置响应头为 XML
    res.set("Content-Type", "application/xml; charset=utf-8");
    res.send(xmlText);
  } catch (error) {
    console.error("✗ 获取 RSS 失败:", error.message);
    res.status(500).json({
      error: "获取 RSS 数据失败",
      message: error.message,
    });
  }
});

/**
 * API 状态端点
 * GET /api - 返回 API 状态
 */
app.get("/api", (req, res) => {
  res.json({
    status: "ok",
    service: "NodeSeek RSS Proxy",
    version: "1.0.0",
    endpoints: {
      rss: "/api/rss",
      health: "/health",
    },
  });
});

/**
 * 健康检查端点(用于部署平台)
 * GET /health - 返回服务健康状态
 */
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// 404 处理(仅针对 API 路径)
app.use("/api/*", (req, res) => {
  res.status(404).json({
    error: "API 端点不存在",
    availableEndpoints: ["/api", "/api/rss", "/health"],
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error("服务器错误:", err);
  res.status(500).json({
    error: "服务器内部错误",
    message: err.message,
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log("╔════════════════════════════════════════════╗");
  console.log("║  NodeSeek RSS 代理服务器已启动             ║");
  console.log("╠════════════════════════════════════════════╣");
  console.log(`║  端口: ${PORT.toString().padEnd(38)}║`);
  console.log(`║  RSS API: http://localhost:${PORT}/api/rss`.padEnd(45) + "║");
  console.log("╚════════════════════════════════════════════╝");
});
