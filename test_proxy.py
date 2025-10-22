#!/usr/bin/env python3
"""
测试代理服务是否正常工作
"""

import urllib.request
import json

def test_proxy():
    """测试代理服务"""
    try:
        # 构造测试请求
        test_data = {
            "message": "你好，请简单介绍一下你自己",
            "history": []
        }
        
        # 发送请求到代理服务
        req = urllib.request.Request(
            "http://localhost:8000/chat",
            data=json.dumps(test_data).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        
        print("正在测试代理服务...")
        with urllib.request.urlopen(req, timeout=30) as response:
            result = json.loads(response.read().decode('utf-8'))
            print("✅ 代理服务测试成功！")
            print(f"状态: {result.get('status', 'unknown')}")
            print(f"回复长度: {len(result.get('reply', ''))} 字符")
            print(f"回复预览: {result.get('reply', '')[:100]}...")
            
    except Exception as e:
        print(f"❌ 代理服务测试失败: {str(e)}")
        print("请检查:")
        print("1. 代理服务是否正在运行 (端口8000)")
        print("2. Ollama服务是否正在运行 (端口11434)")
        print("3. 网络连接是否正常")

if __name__ == "__main__":
    test_proxy()
