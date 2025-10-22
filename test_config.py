"""
测试配置文件
管理模型小助理项目的测试配置
"""

import os
from dataclasses import dataclass
from typing import Dict, List, Optional


@dataclass
class TestConfig:
    """测试配置类"""
    
    # API配置
    api_host: str = "localhost"
    api_port: int = 8000
    base_url: str = "http://localhost:8000"
    
    # 模型配置
    default_model: str = "qwen2.5:7b"
    available_models: List[str] = None
    
    # 测试数据配置
    test_prompts: List[str] = None
    test_conversations: List[Dict] = None
    
    # 性能配置
    timeout: int = 30
    max_response_time: float = 5.0  # 最大响应时间（秒）
    concurrent_requests: int = 3
    
    # 错误配置
    error_status_codes: List[int] = None
    
    def __post_init__(self):
        """初始化后处理"""
        if self.available_models is None:
            self.available_models = [
                "qwen2.5:7b",
                "llama3.1:8b", 
                "gemma2:9b"
            ]
        
        if self.test_prompts is None:
            self.test_prompts = [
                "你好，请介绍一下你自己",
                "你能做什么？",
                "今天的天气怎么样？",
                "请写一首关于AI的诗",
                "解释一下机器学习的基本概念"
            ]
        
        if self.test_conversations is None:
            self.test_conversations = [
                [
                    {"role": "user", "content": "你好"},
                    {"role": "assistant", "content": "你好！我是AI助手"}
                ],
                [
                    {"role": "user", "content": "你能做什么？"},
                    {"role": "assistant", "content": "我可以回答问题、提供帮助等"}
                ],
                [
                    {"role": "user", "content": "今天的天气怎么样？"},
                    {"role": "assistant", "content": "我无法获取实时天气信息，请查看天气预报应用"}
                ]
            ]
        
        if self.error_status_codes is None:
            self.error_status_codes = [400, 404, 500, 503]
        
        # 从环境变量覆盖配置
        self._load_from_env()
    
    def _load_from_env(self):
        """从环境变量加载配置"""
        # API配置
        if os.getenv("TEST_API_HOST"):
            self.api_host = os.getenv("TEST_API_HOST")
        if os.getenv("TEST_API_PORT"):
            self.api_port = int(os.getenv("TEST_API_PORT"))
        
        # 更新base_url
        self.base_url = f"http://{self.api_host}:{self.api_port}"
        
        # 模型配置
        if os.getenv("TEST_DEFAULT_MODEL"):
            self.default_model = os.getenv("TEST_DEFAULT_MODEL")
        
        # 性能配置
        if os.getenv("TEST_TIMEOUT"):
            self.timeout = int(os.getenv("TEST_TIMEOUT"))
        if os.getenv("TEST_MAX_RESPONSE_TIME"):
            self.max_response_time = float(os.getenv("TEST_MAX_RESPONSE_TIME"))
        if os.getenv("TEST_CONCURRENT_REQUESTS"):
            self.concurrent_requests = int(os.getenv("TEST_CONCURRENT_REQUESTS"))


class MockResponseConfig:
    """模拟响应配置"""
    
    @staticmethod
    def get_success_response(prompt: str, model: str = "qwen2.5:7b") -> Dict:
        """获取成功响应模板"""
        return {
            "response": f"这是对'{prompt}'的模拟响应",
            "model": model,
            "timestamp": "2024-01-01T00:00:00Z"
        }
    
    @staticmethod
    def get_error_response(status_code: int) -> Dict:
        """获取错误响应模板"""
        error_messages = {
            400: "Bad Request",
            404: "Not Found", 
            500: "Internal Server Error",
            503: "Service Unavailable"
        }
        
        return {
            "error": error_messages.get(status_code, "Unknown Error"),
            "status_code": status_code
        }
    
    @staticmethod
    def get_health_response() -> Dict:
        """获取健康检查响应模板"""
        return {
            "status": "healthy",
            "timestamp": "2024-01-01T00:00:00Z",
            "version": "1.0.0"
        }
    
    @staticmethod
    def get_models_response() -> Dict:
        """获取模型列表响应模板"""
        return {
            "models": [
                {"name": "qwen2.5:7b", "size": "7B", "description": "通义千问2.5 7B模型"},
                {"name": "llama3.1:8b", "size": "8B", "description": "Llama 3.1 8B模型"},
                {"name": "gemma2:9b", "size": "9B", "description": "Gemma 2 9B模型"}
            ]
        }


class TestDataGenerator:
    """测试数据生成器"""
    
    @staticmethod
    def generate_test_prompts(count: int = 10) -> List[str]:
        """生成测试提示词"""
        base_prompts = [
            "你好，请介绍一下你自己",
            "你能做什么？",
            "今天的天气怎么样？",
            "请写一首关于AI的诗",
            "解释一下机器学习的基本概念",
            "Python和JavaScript有什么区别？",
            "如何学习编程？",
            "推荐一些好的学习资源",
            "什么是神经网络？",
            "帮我制定一个学习计划"
        ]
        
        return base_prompts[:count]
    
    @staticmethod
    def generate_conversation_history(turns: int = 3) -> List[Dict]:
        """生成对话历史"""
        conversation = []
        user_messages = [
            "你好",
            "你能做什么？", 
            "今天的天气怎么样？",
            "请介绍一下你自己",
            "你有什么特别的功能吗？"
        ]
        
        assistant_responses = [
            "你好！我是AI助手，很高兴为您服务",
            "我可以回答问题、提供信息、协助解决问题等",
            "我无法获取实时天气信息，请查看天气预报应用",
            "我是基于大型语言模型的AI助手，可以处理各种文本任务",
            "我支持多轮对话、上下文理解和多种任务处理"
        ]
        
        for i in range(min(turns, len(user_messages))):
            conversation.append({
                "role": "user", 
                "content": user_messages[i]
            })
            conversation.append({
                "role": "assistant",
                "content": assistant_responses[i]
            })
        
        return conversation


# 全局测试配置实例
test_config = TestConfig()


def get_test_config() -> TestConfig:
    """获取测试配置实例"""
    return test_config


def update_test_config(**kwargs):
    """更新测试配置"""
    global test_config
    for key, value in kwargs.items():
        if hasattr(test_config, key):
            setattr(test_config, key, value)
    
    # 重新初始化
    test_config.__post_init__()


# 环境变量配置示例
"""
# 测试环境变量配置示例
export TEST_API_HOST="localhost"
export TEST_API_PORT="8000"
export TEST_DEFAULT_MODEL="qwen2.5:7b"
export TEST_TIMEOUT="30"
export TEST_MAX_RESPONSE_TIME="5.0"
export TEST_CONCURRENT_REQUESTS="3"
"""
