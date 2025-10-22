# from fastapi import FastAPI, HTTPException, Request
# from fastapi.middleware.cors import CORSMiddleware
# import httpx

# # 初始化FastAPI应用
# app = FastAPI(title="Ollama DeepSeek 代理API")

# # 配置跨域（替换为你的GitHub Pages域名）
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["https://limingabc123.github.io"],  # 你的GitHub主页域名
#     allow_credentials=True,
#     allow_methods=["POST"],
#     allow_headers=["Content-Type"],
# )

# # Ollama API地址与模型名称
# OLLAMA_API_URL = "http://localhost:11434/api/chat"
# MODEL_NAME = "deepseek-r1:7b"  # Ollama中运行的模型名称


# @app.post("/chat")
# async def chat(request: Request):
#     try:
#         # 解析前端请求数据
#         data = await request.json()
#         user_msg = data.get("message", "")
#         chat_history = data.get("history", [])  # 格式: [(用户消息1, 助手回复1), ...]

#         # 构造Ollama所需的messages格式
#         ollama_msgs = []
#         for u_msg, a_reply in chat_history:
#             ollama_msgs.append({"role": "user", "content": u_msg})
#             ollama_msgs.append({"role": "assistant", "content": a_reply})
#         ollama_msgs.append({"role": "user", "content": user_msg})

#         # 转发请求到Ollama
#         async with httpx.AsyncClient() as client:
#             response = await client.post(
#                 OLLAMA_API_URL,
#                 json={
#                     "model": MODEL_NAME,
#                     "messages": ollama_msgs,
#                     "stream": False  # 关闭流式输出，简化前端处理
#                 }
#             )

#         # 处理Ollama响应
#         if response.status_code != 200:
#             raise HTTPException(status_code=response.status_code, detail=response.text)
        
#         ollama_reply = response.json()["message"]["content"]
#         new_history = chat_history + [(user_msg, ollama_reply)]
        
#         return {"reply": ollama_reply, "history": new_history}

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))


# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import httpx
import logging

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 初始化FastAPI应用
app = FastAPI(title="李茗的个人小助手API")

# 配置跨域（允许GitHub Pages和本地开发访问）
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://limingabc123.github.io",  # GitHub Pages域名
        "http://localhost:8000",           # 本地开发
        "http://127.0.0.1:8000"            # 本地开发
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ollama API配置
OLLAMA_API_URL = "http://localhost:11434/api/chat"
MODEL_NAME = "deepseek-r1:7b"  # 确保Ollama中有这个模型

@app.get("/")
async def root():
    """健康检查端点"""
    return {"status": "running", "service": "李茗的个人小助手API"}

@app.post("/chat")
async def chat(request: Request):
    """聊天接口 - 转发请求到本地Ollama服务"""
    try:
        # 解析前端请求
        data = await request.json()
        user_message = data.get("message", "").strip()
        chat_history = data.get("history", [])
        
        # 验证输入
        if not user_message:
            raise HTTPException(status_code=400, detail="消息内容不能为空")
        
        logger.info(f"收到用户消息: {user_message[:50]}...")

        # 构造Ollama消息格式
        ollama_messages = []
        for user_msg, assistant_reply in chat_history:
            ollama_messages.append({"role": "user", "content": user_msg})
            ollama_messages.append({"role": "assistant", "content": assistant_reply})
        ollama_messages.append({"role": "user", "content": user_message})

        # 转发请求到Ollama
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                OLLAMA_API_URL,
                json={
                    "model": MODEL_NAME,
                    "messages": ollama_messages,
                    "stream": False,
                    "options": {
                        "temperature": 0.7,
                        "top_p": 0.9,
                        "num_predict": 512
                    }
                }
            )

        if response.status_code != 200:
            error_detail = f"Ollama服务错误: {response.status_code} - {response.text}"
            logger.error(error_detail)
            raise HTTPException(status_code=500, detail=error_detail)

        # 处理响应
        ollama_response = response.json()
        ollama_reply = ollama_response["message"]["content"]
        
        # 更新聊天历史
        new_history = chat_history + [(user_message, ollama_reply)]
        
        logger.info(f"成功生成回复，长度: {len(ollama_reply)}")
        return {
            "reply": ollama_reply,
            "history": new_history,
            "status": "success"
        }
        
    except httpx.ConnectError:
        error_msg = "无法连接到Ollama服务，请确保Ollama已启动并在端口11434运行"
        logger.error(error_msg)
        raise HTTPException(status_code=503, detail=error_msg)
    except httpx.TimeoutException:
        error_msg = "Ollama服务响应超时，请稍后重试"
        logger.error(error_msg)
        raise HTTPException(status_code=504, detail=error_msg)
    except Exception as e:
        error_msg = f"服务器内部错误: {str(e)}"
        logger.error(error_msg)
        raise HTTPException(status_code=500, detail=error_msg)

# 启动服务
if __name__ == "__main__":
    import uvicorn
    logger.info("启动李茗的个人小助手API服务...")
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
