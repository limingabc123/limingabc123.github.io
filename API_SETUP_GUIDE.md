# 李茗个人小助手 - API部署指南

## 方案选择

**推荐使用：ollama_proxy.py**
- ✅ 轻量级代理服务
- ✅ 易于部署和维护
- ✅ 前端已配置为使用此方案
- ✅ 不需要直接加载大模型

**不推荐：model_api.py**
- ❌ 需要直接加载DeepSeek 7B模型
- ❌ 硬件要求高（需要大量GPU内存）
- ❌ 模型路径配置有问题

## 部署步骤

### 1. 安装和配置Ollama

```bash
# 下载并安装Ollama
# 访问：https://ollama.ai/download

# 拉取DeepSeek模型
ollama pull deepseek-r1:7b

# 验证模型是否可用
ollama list
```

### 2. 启动Ollama服务

```bash
# 启动Ollama服务（默认端口11434）
ollama serve
```

### 3. 启动代理API服务

```bash
# 进入项目目录
cd limingabc123.github.io

# 安装依赖
pip install fastapi uvicorn httpx

# 启动代理服务
python ollama_proxy.py
```

服务将在 `http://localhost:8000` 启动

### 4. 验证服务状态

```bash
# 检查代理服务
curl http://localhost:8000/

# 检查Ollama服务
curl http://localhost:11434/api/tags
```

## 前端配置

前端已正确配置为使用本地代理服务：
```javascript
const apiUrl = "http://localhost:8000/chat";
```

## 故障排除

### 常见问题

1. **无法连接到Ollama服务**
   - 确保Ollama已安装并运行：`ollama serve`
   - 检查端口11434是否被占用

2. **模型未找到**
   - 确保已拉取模型：`ollama pull deepseek-r1:7b`
   - 验证模型列表：`ollama list`

3. **跨域错误**
   - 代理服务已配置CORS，支持GitHub Pages域名
   - 如果仍有问题，检查浏览器控制台错误信息

4. **响应超时**
   - 首次使用模型可能需要较长时间加载
   - 确保有足够的系统资源（内存、GPU）

### 测试聊天功能

1. 访问您的GitHub Pages网站
2. 点击右下角的"助手"按钮
3. 输入问题测试聊天功能

## 服务管理

### 启动脚本（Windows）
创建 `start_assistant.bat`：
```batch
@echo off
echo 启动李茗个人小助手服务...
cd /d "c:\homepag\limingabc123.github.io"
python ollama_proxy.py
pause
```

### 停止服务
- 在终端中按 `Ctrl+C` 停止代理服务
- 停止Ollama服务：关闭Ollama窗口或进程

## 性能优化

- **内存优化**：如果内存不足，考虑使用更小的模型
- **响应时间**：首次请求较慢，后续请求会更快
- **并发处理**：当前配置支持单用户，如需多用户需优化

## 安全注意事项

- 代理服务仅在本地运行，不暴露到公网
- 确保Ollama服务仅本地访问
- 定期更新Ollama和模型版本

---

**技术支持**：如有问题，请检查日志文件或联系开发者。
