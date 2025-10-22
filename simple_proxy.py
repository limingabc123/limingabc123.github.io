"""
简单代理服务
提供简化的模型代理功能
"""

import os
import json
import requests
from flask import Flask, request, jsonify
from typing import Dict, Any


class SimpleProxy:
    """简单代理类"""
    
    def __init__(self):
        self.app = Flask(__name__)
        self._setup_routes()
        self.model_responses = {
            "qwen2.5:7b": "我是通义千问助手，很高兴为您服务！",
            "llama3.1:8b": "我是Llama助手，有什么可以帮助您的吗？",
            "gemma2:9b": "我是Gemma助手，随时为您提供帮助！"
        }
    
    def _setup_routes(self):
        """设置路由"""
        
        @self.app.route('/api/simple/chat', methods=['POST'])
        def simple_chat():
            """简化聊天接口"""
            try:
                data = request.get_json()
                prompt = data.get('prompt', '')
                model = data.get('model', 'qwen2.5:7b')
                
                # 生成简单响应
                response = self._generate_simple_response(prompt, model)
                
                return jsonify({
                    "response": response,
                    "model": model,
                    "success": True
                })
            except Exception as e:
                return jsonify({
                    "error": str(e),
                    "success": False
                }), 500
        
        @self.app.route('/api/simple/info', methods=['GET'])
        def simple_info():
            """获取服务信息"""
            return jsonify({
                "service": "Simple Proxy",
                "version": "1.0.0",
                "models": list(self.model_responses.keys()),
                "status": "running"
            })
        
        @self.app.route('/api/simple/health', methods=['GET'])
        def simple_health():
            """健康检查"""
            return jsonify({"status": "healthy"})
    
    def _generate_simple_response(self, prompt: str, model: str) -> str:
        """生成简单响应"""
        base_response = self.model_responses.get(
            model, 
            "我是AI助手，很高兴为您服务！"
        )
        
        # 根据提示词生成不同的响应
        if "你好" in prompt or "hello" in prompt.lower():
            return f"{base_response} 您好！"
        elif "帮助" in prompt or "help" in prompt.lower():
            return f"{base_response} 我可以回答问题、提供信息等。"
        elif "天气" in prompt:
            return f"{base_response} 我无法获取实时天气信息。"
        else:
            return f"{base_response} 您说：{prompt}"
    
    def run(self, host: str = "localhost", port: int = 8002, debug: bool = False):
        """运行服务"""
        self.app.run(host=host, port=port, debug=debug)


if __name__ == '__main__':
    proxy = SimpleProxy()
    proxy.run(debug=True)
