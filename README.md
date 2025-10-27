![Github Forks](https://img.shields.io/github/forks/senli1073/senli1073.github.io?style=flat)
![Github Stars](https://img.shields.io/github/stars/senli1073/senli1073.github.io?style=flat)
![License](https://img.shields.io/github/license/senli1073/senli1073.github.io)
![Last Commit](https://img.shields.io/github/last-commit/senli1073/senli1073.github.io)

# 个人学术网站与AI助手集成项目

## 项目预览
[![网站截图](https://raw.githubusercontent.com/limingabc123/limingabc123.github.io/blob/main/static/assets/Yangshi.jpg)](https://limingabc123.github.io)

## 项目介绍

这是一个基于 [Bootstrap](https://github.com/StartBootstrap/startbootstrap-new-age) 的个人学术网站模板，集成了本地AI模型助手功能。

### 主要特性

- **学术网站功能**：基于Markdown的内容管理，支持LaTeX公式渲染
- **AI助手集成**：集成本地Ollama模型，提供智能对话服务
- **模块化设计**：CSS样式与内容分离，代码结构清晰
- **完整测试**：包含单元测试和集成测试，确保代码质量
- **响应式设计**：适配各种设备屏幕

## 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/limingabc123/limingabc123.github.io.git
cd limingabc123.github.io
```

### 2. 安装依赖
```bash
pip install flask requests
```

### 3. 启动服务
```bash
# 启动完整服务（包含AI助手）
start_all_services.bat

# 或单独启动AI助手
start_assistant.bat

# 或启动简化版助手
start_simple_assistant.bat
```

### 4. 访问网站
- 主网站：http://localhost:5000
- AI助手演示：http://localhost:5000/assistant_demo.html

## 项目结构

```
limingabc123.github.io/
├── contents/                    # Markdown内容文件
│   ├── home.md                 # 首页内容
│   ├── awards.md               # 奖项内容
│   └── config.yml              # 网站配置
├── static/                     # 静态资源
│   ├── css/
│   │   ├── main.css           # 主样式文件（模块化CSS）
│   │   └── styles.css         # 基础样式
│   ├── js/
│   │   ├── scripts.js         # 主JavaScript文件
│   │   └── tex-svg.js         # LaTeX渲染
│   └── assets/                # 图片资源
├── index.html                 # 主页面（集成AI助手）
├── assistant_demo.html        # AI助手演示页面
├── model_api.py              # AI模型API服务
├── ollama_proxy.py           # Ollama代理服务
├── simple_proxy.py           # 简化版代理
└── 测试文件/
    ├── test_model_api.py     # API单元测试
    ├── test_integration.py   # 集成测试
    ├── test_config.py        # 配置测试
    └── run_tests.py          # 测试运行器
```

## AI助手功能

### 功能特性
- **智能对话**：基于本地Ollama模型的自然语言对话
- **多模型支持**：支持多种AI模型切换
- **实时响应**：流式响应，提供更好的用户体验
- **错误处理**：完善的错误处理和用户提示

### 使用方法
1. 确保已安装并运行Ollama服务
2. 启动项目中的AI助手服务
3. 访问主页面或演示页面与助手交互

## 开发指南

### 代码规范
- CSS样式已模块化到 `static/css/main.css`
- JavaScript功能模块化组织
- Python代码遵循PEP8规范

### 测试运行
```bash
python run_tests.py
```

### 部署说明
- 静态网站可直接部署到GitHub Pages
- AI助手功能需要本地服务器环境

## 技术栈

### 前端技术
- HTML5 + CSS3
- Bootstrap 5
- JavaScript (ES6+)
- jQuery
- MathJax (LaTeX渲染)

### 后端技术
- Python 3
- Flask Web框架
- Ollama本地AI模型
- RESTful API设计

### 开发工具
- 单元测试：unittest
- 集成测试：requests
- 代码质量：PEP8规范

## 许可证

Copyright Sen Li, 2023. Licensed under an MIT license. 您可以复制和修改此模板。

## 贡献

欢迎提交Issue和Pull Request来改进项目！

## 联系方式

如有问题，请通过GitHub Issues联系我们。
