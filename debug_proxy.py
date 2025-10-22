#!/usr/bin/env python3
"""
详细调试代理服务
"""

import urllib.request
import json
import urllib.error

def debug_proxy():
    """详细调试代理服务"""
    try:
        # 构造测试请求
        test_data = {
            "message": "你好，请简单介绍一下你自己",
            "history": []
        }
        
        print("正在测试代理服务...")
        
        # 发送请求到代理服务
        req = urllib.request.Request(
            "http://localhost:8000/chat",
            data=json.dumps(test_data).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        
        print("发送请求到代理服务...")
        
        try:
            with urllib.request.urlopen(req, timeout=30) as response:
                print(f"收到响应，状态码: {response.status}")
                result = json.loads(response.read().decode('utf-8'))
                print("✅ 代理服务测试成功！")
                print(f"状态: {result.get('status', 'unknown')}")
                print(f"回复长度: {len(result.get('reply', ''))} 字符")
                print(f"回复预览: {result.get('reply', '')[:100]}...")
                
        except urllib.error.HTTPError as e:
            print(f"❌ HTTP错误: {e.code} - {e.reason}")
            print(f"错误详情: {e.read().decode('utf-8')}")
            
        except urllib.error.URLError as e:
            print(f"❌ URL错误: {e.reason}")
            
    except Exception as e:
        print(f"❌ 代理服务测试失败: {str(e)}")
        print("请检查:")
        print("1. 代理服务是否正在运行 (端口8000)")
        print("2. Ollama服务是否正在运行 (端口11434)")
        print("3. 网络连接是否正常")

if __name__ == "__main__":
    debug_proxy()
