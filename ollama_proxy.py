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

# 初始化FastAPI应用
app = FastAPI(title="Ollama DeepSeek 代理API")

# 配置跨域（允许你的GitHub主页域名访问）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["limingabc123.github.io"],  # 替换为你的GitHub Pages域名
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

# Ollama的API地址（固定）
OLLAMA_API_URL = "http://localhost:11434/api/chat"

# 定义聊天接口，转发请求到Ollama
@app.post("/chat")
async def chat(request: Request):
    try:
        # 解析前端请求体（用户消息+历史对话）
        data = await request.json()
        user_message = data["message"]
        chat_history = data["history"]  # 格式：[(用户消息1, 助手回复1), ...]

        # 构造Ollama需要的消息格式
        ollama_messages = []
        for user_msg, assistant_reply in chat_history:
            ollama_messages.append({"role": "user", "content": user_msg})
            ollama_messages.append({"role": "assistant", "content": assistant_reply})
        ollama_messages.append({"role": "user", "content": user_message})

        # 转发请求到Ollama
        async with httpx.AsyncClient() as client:
            response = await client.post(
                OLLAMA_API_URL,
                json={
                    "model": "deepseek-r1:7b",  # 你的模型名称
                    "messages": ollama_messages,
                    "stream": False  # 关闭流式输出，简化前端处理
                }
            )

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)

        # 提取Ollama的回复
        ollama_reply = response.json()["message"]["content"]
        # 更新聊天历史
        new_history = chat_history + [(user_message, ollama_reply)]
        
        return {"reply": ollama_reply, "history": new_history}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 启动服务（终端运行：python ollama_proxy.py）
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)