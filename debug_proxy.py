"""
调试代理服务
提供调试和监控功能的代理服务
"""

import json
import logging
import time
from flask import Flask, request, jsonify
import requests

# 配置日志
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('debug_proxy.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

class DebugProxy:
    """调试代理类，提供详细的调试信息"""
    
    def __init__(self, target_url="http://localhost:11434"):
        self.target_url = target_url
        self.app = Flask(__name__)
        self.request_count = 0
        self.error_count = 0
        self.response_times = []
        
        # 设置路由
        self.setup_routes()
    
    def setup_routes(self):
        """设置Flask路由"""
        
        @self.app.route('/api/debug/chat', methods=['POST'])
        def debug_chat():
            """调试聊天接口"""
            start_time = time.time()
            self.request_count += 1
            
            try:
                # 记录请求信息
                request_data = request.get_json()
                logger.info(f"收到调试请求: {json.dumps(request_data, ensure_ascii=False)}")
                
                # 转发到目标服务
                response = requests.post(
                    f"{self.target_url}/api/chat",
                    json=request_data,
                    timeout=30
                )
                
                # 计算响应时间
                response_time = time.time() - start_time
                self.response_times.append(response_time)
                
                # 记录响应信息
                logger.info(f"请求完成 - 响应时间: {response_time:.2f}s - 状态码: {response.status_code}")
                
                return jsonify({
                    "success": True,
                    "response": response.json(),
                    "debug_info": {
                        "request_id": self.request_count,
                        "response_time": response_time,
                        "target_url": self.target_url,
                        "timestamp": time.time()
                    }
                })
                
            except Exception as e:
                self.error_count += 1
                logger.error(f"调试请求失败: {str(e)}")
                return jsonify({
                    "success": False,
                    "error": str(e),
                    "debug_info": {
                        "request_id": self.request_count,
                        "error_count": self.error_count,
                        "timestamp": time.time()
                    }
                }), 500
        
        @self.app.route('/api/debug/stats', methods=['GET'])
        def get_stats():
            """获取统计信息"""
            stats = {
                "request_count": self.request_count,
                "error_count": self.error_count,
                "average_response_time": sum(self.response_times) / len(self.response_times) if self.response_times else 0,
                "max_response_time": max(self.response_times) if self.response_times else 0,
                "min_response_time": min(self.response_times) if self.response_times else 0,
                "target_url": self.target_url,
                "timestamp": time.time()
            }
            return jsonify(stats)
        
        @self.app.route('/api/debug/logs', methods=['GET'])
        def get_logs():
            """获取最近的日志（简化版本）"""
            logs = {
                "recent_requests": self.request_count,
                "recent_errors": self.error_count,
                "status": "running"
            }
            return jsonify(logs)
        
        @self.app.route('/api/debug/health', methods=['GET'])
        def health_check():
            """健康检查"""
            try:
                # 检查目标服务是否可用
                response = requests.get(f"{self.target_url}/api/tags", timeout=5)
                target_status = "healthy" if response.status_code == 200 else "unhealthy"
            except:
                target_status = "unreachable"
            
            return jsonify({
                "status": "healthy",
                "debug_proxy": {
                    "request_count": self.request_count,
                    "error_count": self.error_count,
                    "uptime": "running"
                },
                "target_service": {
                    "status": target_status,
                    "url": self.target_url
                }
            })
    
    def run(self, host='0.0.0.0', port=5003, debug=True):
        """运行调试代理服务"""
        logger.info(f"启动调试代理服务在 {host}:{port}")
        logger.info(f"目标服务: {self.target_url}")
        self.app.run(host=host, port=port, debug=debug)

def main():
    """主函数"""
    proxy = DebugProxy()
    proxy.run()

if __name__ == '__main__':
    main()
