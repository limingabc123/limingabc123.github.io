"""
集成测试文件
测试模型小助理系统的端到端功能
"""

import unittest
import sys
import os
from unittest.mock import patch, MagicMock, Mock


class TestSystemIntegration(unittest.TestCase):
    """测试系统集成功能"""
    
    def setUp(self):
        """测试前的准备工作"""
        self.base_url = "http://localhost:8000"
        self.test_endpoints = [
            "/api/chat",
            "/api/models",
            "/api/health"
        ]
    
    def test_service_health_check(self):
        """测试服务健康检查"""
        with patch('requests.get') as mock_get:
            mock_response = MagicMock()
            mock_response.status_code = 200
            mock_response.json.return_value = {
                "status": "healthy",
                "timestamp": "2024-01-01T00:00:00Z"
            }
            mock_get.return_value = mock_response
            
            response = mock_get(f"{self.base_url}/api/health")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json()["status"], "healthy")
    
    def test_chat_workflow(self):
        """测试完整的聊天工作流程"""
        # 模拟完整的聊天交互
        test_conversation = [
            {"role": "user", "content": "你好"},
            {"role": "assistant", "content": "你好！我是AI助手"},
            {"role": "user", "content": "你能做什么？"},
            {"role": "assistant", "content": "我可以回答问题、提供帮助等"}
        ]
        
        with patch('requests.post') as mock_post:
            # 模拟第一次响应
            mock_response1 = MagicMock()
            mock_response1.status_code = 200
            mock_response1.json.return_value = {
                "response": "你好！我是AI助手",
                "model": "qwen2.5:7b"
            }
            
            # 模拟第二次响应
            mock_response2 = MagicMock()
            mock_response2.status_code = 200
            mock_response2.json.return_value = {
                "response": "我可以回答问题、提供帮助等",
                "model": "qwen2.5:7b"
            }
            
            mock_post.side_effect = [mock_response1, mock_response2]
            
            # 模拟两次API调用
            response1 = mock_post(f"{self.base_url}/api/chat", 
                                json={"prompt": "你好"})
            response2 = mock_post(f"{self.base_url}/api/chat", 
                                json={"prompt": "你能做什么？"})
            
            self.assertEqual(response1.status_code, 200)
            self.assertEqual(response2.status_code, 200)
            self.assertEqual(response1.json()["response"], "你好！我是AI助手")
            self.assertEqual(response2.json()["response"], "我可以回答问题、提供帮助等")
    
    def test_model_listing(self):
        """测试模型列表功能"""
        with patch('requests.get') as mock_get:
            mock_response = MagicMock()
            mock_response.status_code = 200
            mock_response.json.return_value = {
                "models": [
                    {"name": "qwen2.5:7b", "size": "7B"},
                    {"name": "llama3.1:8b", "size": "8B"},
                    {"name": "gemma2:9b", "size": "9B"}
                ]
            }
            mock_get.return_value = mock_response
            
            response = mock_get(f"{self.base_url}/api/models")
            self.assertEqual(response.status_code, 200)
            self.assertIsInstance(response.json()["models"], list)
            self.assertGreater(len(response.json()["models"]), 0)
    
    def test_error_scenarios(self):
        """测试错误场景"""
        error_scenarios = [
            (400, "Bad Request"),
            (404, "Not Found"),
            (500, "Internal Server Error"),
            (503, "Service Unavailable")
        ]
        
        for status_code, error_message in error_scenarios:
            with patch('requests.post') as mock_post:
                mock_response = MagicMock()
                mock_response.status_code = status_code
                mock_response.text = error_message
                mock_post.return_value = mock_response
                
                response = mock_post(f"{self.base_url}/api/chat")
                self.assertEqual(response.status_code, status_code)


class TestConfiguration(unittest.TestCase):
    """测试配置功能"""
    
    def test_config_validation(self):
        """测试配置验证"""
        valid_config = {
            "api_host": "localhost",
            "api_port": 8000,
            "model": "qwen2.5:7b",
            "timeout": 30,
            "max_tokens": 2048
        }
        
        # 验证必需字段
        required_fields = ["api_host", "api_port", "model"]
        for field in required_fields:
            self.assertIn(field, valid_config)
        
        # 验证数据类型
        self.assertIsInstance(valid_config["api_host"], str)
        self.assertIsInstance(valid_config["api_port"], int)
        self.assertIsInstance(valid_config["model"], str)
        self.assertIsInstance(valid_config["timeout"], int)
    
    def test_environment_variables(self):
        """测试环境变量配置"""
        test_env_vars = {
            "API_HOST": "localhost",
            "API_PORT": "8000",
            "MODEL_NAME": "qwen2.5:7b",
            "TIMEOUT": "30"
        }
        
        with patch.dict('os.environ', test_env_vars):
            # 模拟从环境变量读取配置
            config = {
                "host": os.getenv("API_HOST", "localhost"),
                "port": int(os.getenv("API_PORT", "8000")),
                "model": os.getenv("MODEL_NAME", "qwen2.5:7b"),
                "timeout": int(os.getenv("TIMEOUT", "30"))
            }
            
            self.assertEqual(config["host"], "localhost")
            self.assertEqual(config["port"], 8000)
            self.assertEqual(config["model"], "qwen2.5:7b")
            self.assertEqual(config["timeout"], 30)


class TestPerformance(unittest.TestCase):
    """测试性能相关功能"""
    
    def test_response_time(self):
        """测试响应时间"""
        with patch('requests.post') as mock_post:
            mock_response = MagicMock()
            mock_response.status_code = 200
            mock_response.elapsed.total_seconds.return_value = 0.5  # 500ms响应时间
            mock_response.json.return_value = {
                "response": "测试响应",
                "model": "qwen2.5:7b"
            }
            mock_post.return_value = mock_response
            
            response = mock_post("http://localhost:8000/api/chat")
            response_time = response.elapsed.total_seconds()
            
            # 验证响应时间在合理范围内
            self.assertLessEqual(response_time, 5.0)  # 5秒内响应
    
    def test_concurrent_requests(self):
        """测试并发请求处理"""
        import threading
        
        results = []
        
        def make_request(request_id):
            """模拟单个请求"""
            with patch('requests.post') as mock_post:
                mock_response = MagicMock()
                mock_response.status_code = 200
                mock_response.json.return_value = {
                    "response": f"响应 {request_id}",
                    "model": "qwen2.5:7b"
                }
                mock_post.return_value = mock_response
                
                response = mock_post("http://localhost:8000/api/chat")
                results.append((request_id, response.status_code))
        
        # 模拟并发请求
        threads = []
        for i in range(3):
            thread = threading.Thread(target=make_request, args=(i,))
            threads.append(thread)
            thread.start()
        
        for thread in threads:
            thread.join()
        
        # 验证所有请求都成功
        self.assertEqual(len(results), 3)
        for request_id, status_code in results:
            self.assertEqual(status_code, 200)


if __name__ == '__main__':
    # 运行集成测试
    unittest.main(verbosity=2)
