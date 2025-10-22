#!/usr/bin/env python3
"""
李茗个人小助手 - 简化版代理服务
不需要安装外部依赖，使用标准库
"""

import http.server
import socketserver
import json
import urllib.request
import urllib.parse

class ChatProxyHandler(http.server.BaseHTTPRequestHandler):
    
    def do_OPTIONS(self):
        """处理预检请求"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_POST(self):
        """处理聊天请求"""
        if self.path != '/chat':
            self.send_error(404)
            return
            
        try:
            # 读取请求数据
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            request_data = json.loads(post_data.decode('utf-8'))
            
            user_message = request_data.get('message', '')
            chat_history = request_data.get('history', [])
            
            print(f"收到用户消息: {user_message[:50]}...")
            
            # 构造Ollama请求
            ollama_messages = []
            for user_msg, assistant_reply in chat_history:
                ollama_messages.append({"role": "user", "content": user_msg})
                ollama_messages.append({"role": "assistant", "content": assistant_reply})
            ollama_messages.append({"role": "user", "content": user_message})
            
            ollama_request = {
                "model": "qwen2.5:0.5b",  # 使用更轻量级的模型
                "messages": ollama_messages,
                "stream": False,
                "options": {
                    "temperature": 0.1,  # 极低温度确保直接输出，不显示思考过程
                    "top_p": 0.3,       # 降低top_p以加快推理并减少思考
                    "num_predict": 100, # 减少最大生成长度以加快响应
                    "num_thread": 8,    # 使用更多线程加速推理
                    "repeat_penalty": 1.2  # 增加重复惩罚避免冗余思考
                }
            }
            
            print("正在向Ollama发送请求...")
            
            # 发送请求到Ollama
            ollama_url = "http://localhost:11434/api/chat"
            req = urllib.request.Request(
                ollama_url,
                data=json.dumps(ollama_request).encode('utf-8'),
                headers={'Content-Type': 'application/json'}
            )
            
            try:
                with urllib.request.urlopen(req, timeout=60) as response:
                    ollama_response = json.loads(response.read().decode('utf-8'))
                    ollama_reply = ollama_response["message"]["content"]
                    
                    # 构造响应
                    response_data = {
                        "reply": ollama_reply,
                        "history": chat_history + [(user_message, ollama_reply)],
                        "status": "success"
                    }
                    
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps(response_data).encode('utf-8'))
                    
                    print(f"成功生成回复，长度: {len(ollama_reply)}")
                    
            except urllib.error.URLError as e:
                error_msg = f"无法连接到Ollama服务: {str(e)}"
                print(f"Ollama连接错误: {error_msg}")
                
                error_response = {
                    "reply": "无法连接到AI服务，请确保Ollama服务正在运行",
                    "history": chat_history,
                    "status": "error"
                }
                
                self.send_response(503)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps(error_response).encode('utf-8'))
                
        except Exception as e:
            error_msg = f"处理请求时出错: {str(e)}"
            print(f"代理服务错误: {error_msg}")
            
            error_response = {
                "reply": f"抱歉，服务暂时不可用: {str(e)}",
                "history": chat_history,
                "status": "error"
            }
            
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(error_response).encode('utf-8'))

def run_server():
    """启动代理服务器"""
    PORT = 8000
    with socketserver.TCPServer(("", PORT), ChatProxyHandler) as httpd:
        print(f"李茗个人小助手代理服务已启动")
        print(f"服务地址: http://localhost:{PORT}")
        print(f"Ollama地址: http://localhost:11434")
        print("按 Ctrl+C 停止服务")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n服务已停止")

if __name__ == "__main__":
    run_server()
