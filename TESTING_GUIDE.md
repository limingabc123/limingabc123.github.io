# 模型小助理测试指南

本文档介绍如何运行和使用模型小助理项目的测试套件。

## 测试文件概览

项目包含以下测试文件：

- `test_model_api.py` - 单元测试，测试核心API功能
- `test_integration.py` - 集成测试，测试端到端系统功能
- `run_tests.py` - 测试运行脚本，提供灵活的测试执行选项
- `test_config.py` - 测试配置文件，管理测试环境和参数

## 快速开始

### 1. 运行所有测试

```bash
python run_tests.py
```

### 2. 只运行单元测试

```bash
python run_tests.py --unit
```

### 3. 只运行集成测试

```bash
python run_tests.py --integration
```

### 4. 运行特定测试文件

```bash
python run_tests.py --specific test_model_api
```

### 5. 显示测试覆盖信息

```bash
python run_tests.py --coverage
```

## 测试覆盖范围

### 单元测试 (`test_model_api.py`)

- ✅ **API端点可用性测试** - 验证API端点是否可访问
- ✅ **聊天完成结构测试** - 验证响应数据结构
- ✅ **错误处理测试** - 测试各种错误场景
- ✅ **模型选择测试** - 验证模型切换功能
- ✅ **代理初始化测试** - 测试代理服务初始化
- ✅ **请求转发测试** - 验证请求转发机制

### 集成测试 (`test_integration.py`)

- ✅ **服务健康检查测试** - 验证系统健康状态
- ✅ **完整聊天工作流程测试** - 测试多轮对话
- ✅ **模型列表功能测试** - 验证可用模型列表
- ✅ **错误场景测试** - 测试各种HTTP错误状态
- ✅ **配置验证测试** - 验证配置参数
- ✅ **环境变量配置测试** - 测试环境变量覆盖
- ✅ **响应时间测试** - 监控API响应性能
- ✅ **并发请求处理测试** - 测试系统并发能力

### 性能测试

- ✅ **响应时间监控** - 确保响应时间在合理范围内
- ✅ **并发处理能力** - 验证系统处理并发请求的能力
- ✅ **错误恢复能力** - 测试系统在错误情况下的恢复能力

## 配置测试环境

### 环境变量配置

可以通过环境变量自定义测试配置：

```bash
# 设置测试API主机和端口
export TEST_API_HOST="localhost"
export TEST_API_PORT="8000"

# 设置默认模型
export TEST_DEFAULT_MODEL="qwen2.5:7b"

# 设置超时和性能参数
export TEST_TIMEOUT="30"
export TEST_MAX_RESPONSE_TIME="5.0"
export TEST_CONCURRENT_REQUESTS="3"
```

### 配置文件使用

测试配置在 `test_config.py` 中管理，支持：

```python
from test_config import get_test_config, update_test_config

# 获取当前配置
config = get_test_config()
print(f"API地址: {config.base_url}")

# 更新配置
update_test_config(
    api_host="127.0.0.1",
    api_port=8080,
    timeout=60
)
```

## 测试数据

### 预定义测试提示词

系统包含多种预定义的测试提示词：

- "你好，请介绍一下你自己"
- "你能做什么？"
- "今天的天气怎么样？"
- "请写一首关于AI的诗"
- "解释一下机器学习的基本概念"

### 对话历史测试

支持多轮对话测试：

```python
from test_config import TestDataGenerator

# 生成3轮对话历史
conversation = TestDataGenerator.generate_conversation_history(3)
```

## 模拟响应

测试使用模拟响应来避免依赖真实API：

```python
from test_config import MockResponseConfig

# 获取成功响应模板
success_response = MockResponseConfig.get_success_response("测试消息")

# 获取错误响应模板
error_response = MockResponseConfig.get_error_response(500)
```

## 运行测试的最佳实践

### 1. 开发阶段

```bash
# 快速运行单元测试
python run_tests.py --unit

# 运行特定功能测试
python run_tests.py --specific test_model_api --class TestModelAPI --method test_api_endpoint_availability
```

### 2. 集成测试阶段

```bash
# 运行完整集成测试
python run_tests.py --integration

# 检查测试覆盖
python run_tests.py --coverage
```

### 3. 持续集成

```bash
# 运行所有测试并返回退出码
python run_tests.py
echo $?  # 检查退出码 (0表示成功)
```

## 故障排除

### 常见问题

1. **导入错误**
   - 确保所有测试文件在同一目录
   - 检查Python路径设置

2. **模拟测试失败**
   - 验证mock对象的设置
   - 检查响应数据结构

3. **配置问题**
   - 检查环境变量设置
   - 验证配置文件路径

### 调试技巧

```python
# 启用详细输出
python -m unittest test_model_api -v

# 运行单个测试方法
python -m unittest test_model_api.TestModelAPI.test_api_endpoint_availability
```

## 扩展测试

要添加新的测试：

1. 在现有测试文件中添加新的测试类或方法
2. 或者创建新的测试文件
3. 更新 `run_tests.py` 中的测试套件
4. 在配置文件中添加相应的测试数据

## 贡献指南

- 遵循现有的测试代码风格
- 为新的功能添加相应的测试
- 确保测试覆盖关键业务逻辑
- 提供清晰的测试文档

---

**注意**: 当前测试使用模拟数据，当实际API服务可用时，可以修改测试配置连接到真实服务进行测试。
