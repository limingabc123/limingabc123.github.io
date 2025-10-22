"""
代理服务测试模块
提供代理服务的测试功能
"""

import json
import time
import threading
from flask import Flask, request, jsonify
import requests

class TestProxy:
    """测试代理类，用于测试和验证代理服务功能"""
    
    def __init__(self, target_url="http://localhost:5000"):
        self.target_url = target_url
        self.app = Flask(__name__)
        self.test_results = {}
        self.setup_routes()
    
    def setup_routes(self):
        """设置Flask路由"""
        
        @self.app.route('/api/test/health', methods=['GET'])
        def test_health():
            """测试健康检查"""
            test_name = "health_check"
            start_time = time.time()
            
            try:
                response = requests.get(f"{self.target_url}/api/health", timeout=5)
                response_time = time.time() - start_time
                
                result = {
                    "test_name": test_name,
                    "status": "passed" if response.status_code == 200 else "failed",
                    "response_time": response_time,
                    "status_code": response.status_code,
                    "response_data": response.json() if response.status_code == 200 else None,
                    "timestamp": time.time()
                }
                
                self.test_results[test_name] = result
                return jsonify(result)
                
            except Exception as e:
                result = {
                    "test_name": test_name,
                    "status": "failed",
                    "error": str(e),
                    "timestamp": time.time()
                }
                self.test_results[test_name] = result
                return jsonify(result), 500
        
        @self.app.route('/api/test/chat', methods=['POST'])
        def test_chat():
            """测试聊天功能"""
            test_name = "chat_functionality"
            start_time = time.time()
            
            try:
                request_data = request.get_json()
                test_message = request_data.get('message', 'Hello, this is a test message')
                
                # 准备测试数据
                test_payload = {
                    "model": "llama2",
                    "messages": [
                        {
                            "role": "user",
                            "content": test_message
                        }
                    ],
                    "stream": False
                }
                
                response = requests.post(
                    f"{self.target_url}/api/chat",
                    json=test_payload,
                    timeout=30
                )
                
                response_time = time.time() - start_time
                
                result = {
                    "test_name": test_name,
                    "status": "passed" if response.status_code == 200 else "failed",
                    "response_time": response_time,
                    "status_code": response.status_code,
                    "test_message": test_message,
                    "response_data": response.json() if response.status_code == 200 else None,
                    "timestamp": time.time()
                }
                
                self.test_results[test_name] = result
                return jsonify(result)
                
            except Exception as e:
                result = {
                    "test_name": test_name,
                    "status": "failed",
                    "error": str(e),
                    "timestamp": time.time()
                }
                self.test_results[test_name] = result
                return jsonify(result), 500
        
        @self.app.route('/api/test/models', methods=['GET'])
        def test_models():
            """测试模型列表功能"""
            test_name = "models_list"
            start_time = time.time()
            
            try:
                response = requests.get(f"{self.target_url}/api/models", timeout=10)
                response_time = time.time() - start_time
                
                result = {
                    "test_name": test_name,
                    "status": "passed" if response.status_code == 200 else "failed",
                    "response_time": response_time,
                    "status_code": response.status_code,
                    "models_count": len(response.json().get('models', [])) if response.status_code == 200 else 0,
                    "timestamp": time.time()
                }
                
                self.test_results[test_name] = result
                return jsonify(result)
                
            except Exception as e:
                result = {
                    "test_name": test_name,
                    "status": "failed",
                    "error": str(e),
                    "timestamp": time.time()
                }
                self.test_results[test_name] = result
                return jsonify(result), 500
        
        @self.app.route('/api/test/performance', methods=['POST'])
        def test_performance():
            """性能测试"""
            test_name = "performance_test"
            start_time = time.time()
            
            try:
                request_data = request.get_json()
                num_requests = request_data.get('num_requests', 5)
                concurrent = request_data.get('concurrent', False)
                
                test_results = []
                
                def single_request(i):
                    try:
                        payload = {
                            "model": "llama2",
                            "messages": [
                                {
                                    "role": "user",
                                    "content": f"Test message {i}: What is 2+2?"
                                }
                            ],
                            "stream": False
                        }
                        
                        req_start = time.time()
                        response = requests.post(
                            f"{self.target_url}/api/chat",
                            json=payload,
                            timeout=30
                        )
                        req_time = time.time() - req_start
                        
                        return {
                            "request_id": i,
                            "status_code": response.status_code,
                            "response_time": req_time,
                            "success": response.status_code == 200
                        }
                    except Exception as e:
                        return {
                            "request_id": i,
                            "error": str(e),
                            "success": False
                        }
                
                if concurrent:
                    # 并发测试
                    threads = []
                    results = []
                    
                    def worker(i):
                        result = single_request(i)
                        results.append(result)
                    
                    for i in range(num_requests):
                        thread = threading.Thread(target=worker, args=(i,))
                        threads.append(thread)
                        thread.start()
                    
                    for thread in threads:
                        thread.join()
                    
                    test_results = results
                else:
                    # 顺序测试
                    for i in range(num_requests):
                        result = single_request(i)
                        test_results.append(result)
                        time.sleep(0.5)  # 避免过于频繁的请求
                
                total_time = time.time() - start_time
                successful_requests = sum(1 for r in test_results if r.get('success', False))
                avg_response_time = sum(r.get('response_time', 0) for r in test_results if r.get('response_time')) / len(test_results)
                
                result = {
                    "test_name": test_name,
                    "status": "passed" if successful_requests > 0 else "failed",
                    "total_time": total_time,
                    "num_requests": num_requests,
                    "successful_requests": successful_requests,
                    "success_rate": successful_requests / num_requests,
                    "average_response_time": avg_response_time,
                    "concurrent": concurrent,
                    "detailed_results": test_results,
                    "timestamp": time.time()
                }
                
                self.test_results[test_name] = result
                return jsonify(result)
                
            except Exception as e:
                result = {
                    "test_name": test_name,
                    "status": "failed",
                    "error": str(e),
                    "timestamp": time.time()
                }
                self.test_results[test_name] = result
                return jsonify(result), 500
        
        @self.app.route('/api/test/results', methods=['GET'])
        def get_test_results():
            """获取所有测试结果"""
            return jsonify({
                "test_results": self.test_results,
                "summary": {
                    "total_tests": len(self.test_results),
                    "passed_tests": sum(1 for r in self.test_results.values() if r.get('status') == 'passed'),
                    "failed_tests": sum(1 for r in self.test_results.values() if r.get('status') == 'failed'),
                    "last_updated": time.time()
                }
            })
        
        @self.app.route('/api/test/clear', methods=['POST'])
        def clear_test_results():
            """清除测试结果"""
            self.test_results = {}
            return jsonify({"message": "测试结果已清除", "timestamp": time.time()})
    
    def run(self, host='0.0.0.0', port=5004, debug=True):
        """运行测试代理服务"""
        print(f"启动测试代理服务在 {host}:{port}")
        print(f"目标服务: {self.target_url}")
        self.app.run(host=host, port=port, debug=debug)

def main():
    """主函数"""
    proxy = TestProxy()
    proxy.run()

if __name__ == '__main__':
    main()
