"""
Ollama代理服务
提供与Ollama模型的代理连接
"""

import os
import json
import requests
from typing import Dict, Any, Optional
from flask import Flask, request, jsonify, Response


class OllamaProxy:
    """Ollama代理类"""
    
    def __init__(self, ollama_host: str = "localhost", ollama_port: int = 11434):
        self.ollama_base_url = f"http://{ollama_host}:{ollama_port}"
        self.app = Flask(__name__)
        self._setup_routes()
    
    def _setup_routes(self):
        """设置代理路由"""
        
        @self.app.route('/api/generate', methods=['POST'])
        def generate():
            """生成文本接口"""
            try:
                data = request.get_json()
                model = data.get('model', 'qwen2.5:7b')
                prompt = data.get('prompt', '')
                stream = data.get('stream', False)
                
                # 转发到Ollama
                ollama_response = self._call_ollama_generate(model, prompt, stream)
                
                if stream:
                    return Response(ollama_response.iter_content(chunk_size=1024),
                                  content_type='application/json')
                else:
                    return jsonify(ollama_response.json())
                    
            except Exception as e:
                return jsonify({"error": str(e)}), 500
        
        @self.app.route('/api/chat', methods=['POST'])
        def chat():
            """聊天接口"""
            try:
                data = request.get_json()
                model = data.get('model', 'qwen2.5:7b')
                messages = data.get('messages', [])
                
                # 转发到Ollama聊天接口
                response = self._call_ollama_chat(model, messages)
                return jsonify(response)
                
            except Exception as e:
                return jsonify({"error": str(e)}), 500
        
        @self.app.route('/api/tags', methods=['GET'])
        def list_models():
            """获取模型列表"""
            try:
                response = requests.get(f"{self.ollama_base_url}/api/tags")
                return jsonify(response.json())
            except Exception as e:
                return jsonify({"error": str(e)}), 500
        
        @self.app.route('/api/health', methods=['GET'])
        def health_check():
            """健康检查"""
            try:
                response = requests.get(f"{self.ollama_base_url}/api/tags")
                if response.status_code == 200:
                    return jsonify({"status": "healthy", "ollama": "connected"})
                else:
                    return jsonify({"status": "unhealthy", "ollama": "disconnected"}), 503
            except:
                return jsonify({"status": "unhealthy", "ollama": "disconnected"}), 503
    
    def _call_ollama_generate(self, model: str, prompt: str, stream: bool = False):
        """调用Ollama生成接口"""
        url = f"{self.ollama_base_url}/api/generate"
        payload = {
            "model": model,
            "prompt": prompt,
            "stream": stream
        }
        
        response = requests.post(url, json=payload, stream=stream)
        response.raise_for_status()
        return response
    
    def _call_ollama_chat(self, model: str, messages: list):
        """调用Ollama聊天接口"""
        url = f"{self.ollama_base_url}/api/chat"
        payload = {
            "model": model,
            "messages": messages,
            "stream": False
        }
        
        response = requests.post(url, json=payload)
        response.raise_for_status()
        return response.json()
    
    def run(self, host: str = "localhost", port: int = 8001, debug: bool = False):
        """运行代理服务"""
        self.app.run(host=host, port=port, debug=debug)


if __name__ == '__main__':
    proxy = OllamaProxy()
    proxy.run(debug=True)
