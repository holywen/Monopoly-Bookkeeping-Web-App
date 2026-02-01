# Cloudflare Pages Functions 部署指南

## 🚀 部署步骤 (零配置方案)

### 1. 确保文件结构正确
```
Monopoly-Bookkeeper/
├── index.html
├── functions/
│   └── api/
│       └── llm.js          # LLM API代理函数
├── DEPLOYMENT.md
└── LLM_CONFIG.md
```

### 2. 推送代码到GitHub
```bash
git add .
git commit -m "Add Pages Functions for LLM proxy"
git push
```

### 3. Cloudflare Pages 自动部署
- 代码推送后，Cloudflare Pages自动检测 `functions/` 目录
- Functions自动构建和部署
- API端点自动在 `/api/llm` 可用

### 4. 无需额外配置
- ✅ 无需安装任何工具
- ✅ 无需手动部署
- ✅ 无需配置路由
- ✅ CORS头已设置好

## 🌐 API端点

### 语音纠错API
```
POST /api/llm
Content-Type: application/json

{
  "provider": "nvidia",
  "apiKey": "your-api-key",
  "prompt": "原始语音识别结果: \"伊森转给霍利100K\"\n\n请纠正语音识别错误",
  "max_tokens": 100,
  "temperature": 0.1
}
```

### 健康检查
```
GET /api/health
```

## 🔧 本地测试

### 使用本地服务器测试
```bash
python3 -m http.server 8000
```

### 测试API调用
```javascript
fetch('/api/llm', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    provider: 'nvidia',
    apiKey: 'test-key',
    prompt: '测试'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

## 📊 监控和日志

### 查看Function日志
1. 访问 Cloudflare Dashboard
2. 进入 Pages 项目
3. 查看 Functions 标签页
4. 检查请求日志和错误

### 性能监控
- 请求延迟
- 错误率统计
- API使用情况

## 🔒 安全特性

- **CORS处理**: 自动处理跨域请求
- **请求验证**: 验证必需字段
- **错误处理**: 统一的错误响应格式
- **API密钥保护**: 密钥通过服务端转发

## 🚨 故障排除

### 常见问题

1. **404错误**: 检查 `functions/api/llm.js` 文件是否存在
2. **CORS错误**: 确保Functions正确设置了CORS头
3. **API密钥错误**: 检查密钥格式和权限

### 调试步骤
1. 检查Cloudflare Pages构建日志
2. 测试健康检查端点
3. 验证API密钥有效性
4. 查看Function执行日志

## 💰 成本

### Cloudflare Pages Functions
- **免费额度**: 每天100,000次请求
- **付费计划**: $20/月起 (更多请求量)
- **零配置成本**: 无需额外工具或服务

这个方案完全免费且零配置，是解决CORS问题的最佳选择！

## 🔧 配置说明

### Worker 功能
- **CORS代理**: 解决浏览器跨域限制
- **API密钥保护**: 密钥通过服务端转发，不暴露在浏览器
- **多提供商支持**: NVIDIA、OpenRouter、Anthropic、OpenAI
- **统一响应格式**: 标准化所有LLM提供商的响应

### 安全特性
- **请求验证**: 验证必需字段
- **错误处理**: 统一的错误响应格式
- **日志记录**: 在 Cloudflare Dashboard 中查看日志

## 🌐 API端点

### 语音纠错API
```
POST /api/llm
Content-Type: application/json

{
  "provider": "nvidia",
  "apiKey": "your-api-key",
  "prompt": "原始语音识别结果: \"伊森转给霍利100K\"\n\n请纠正语音识别错误",
  "max_tokens": 100,
  "temperature": 0.1
}
```

### 健康检查
```
GET /api/health
```

## 📊 监控

### 查看日志
1. 访问 Cloudflare Dashboard
2. 进入 Workers & Pages
3. 选择你的 Worker
4. 查看 Analytics 和 Logs

### 性能监控
- 请求延迟
- 错误率
- API使用统计

## 🔒 安全注意事项

1. **API密钥**: 虽然通过服务端转发，但仍建议定期轮换
2. **速率限制**: 考虑在 Worker 中实现速率限制
3. **访问控制**: 可以添加身份验证机制

## 🚨 故障排除

### 常见问题

1. **CORS错误**: 确保Worker正确设置了CORS头
2. **API密钥错误**: 检查密钥格式和权限
3. **提供商限制**: 检查API使用限制和配额

### 调试步骤
1. 检查 Worker 日志
2. 测试健康检查端点
3. 验证API密钥有效性
4. 检查请求格式

## 📈 扩展功能

### 未来可以添加
- **API密钥加密存储**
- **用户身份验证**
- **请求缓存**
- **负载均衡**
- **A/B测试支持**

## 💰 成本

### Cloudflare Workers
- 免费额度: 每天100,000次请求
- 付费计划: $5/月起

### 总体成本
- Worker: 免费 (大多数情况)
- LLM API: 根据使用量计费
- 域名: 可选 (已有域名则免费)

这个方案完全解决了CORS问题，同时提供了更好的安全性和用户体验！