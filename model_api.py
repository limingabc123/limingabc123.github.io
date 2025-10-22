from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

# 1. 初始化API应用
app = FastAPI(title="DeepSeek 7B 聊天API")

# 2. 关键：配置跨域（允许GitHub Pages域名访问，解决浏览器拦截）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://limingabc123.github.io"],  # 你的GitHub主页域名
    allow_credentials=True,  # 允许携带Cookie（多轮对话可能需要）
    allow_methods=["POST"],  # 仅开放POST请求（聊天用）
    allow_headers=["Content-Type"],  # 允许JSON格式请求
)

# 3. 加载本地DeepSeek模型（替换为你的模型实际路径）
#model_path = "./deepseek-llm-7b-chat"  # 本地模型文件夹路径
model_path = "C:\Users\dell\.ollama\models\manifests\registry.ollama.ai\library\deepseek-r1"  # Hugging Face模型名称
tokenizer = AutoTokenizer.from_pretrained(model_path, trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained(
    model_path,
    trust_remote_code=True,
    torch_dtype=torch.float16,  # 7B模型用float16节省显存（需GPU支持）
    device_map="auto",  # 自动分配GPU/CPU
    load_in_4bit=False  # 若显存不足，可改为True（需安装bitsandbytes）
)
model.eval()  # 推理模式，关闭训练层

# 4. 定义请求/响应格式（多轮对话需传历史记录）
class ChatRequest(BaseModel):
    message: str  # 用户输入消息
    history: list = []  # 聊天历史（格式：[(用户消息1, 助手回复1), ...]）

# 5. 核心聊天接口（前端调用此地址）
@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        # 构造DeepSeek格式的输入（含历史对话）
        inputs = tokenizer.build_chat_input(
            request.message,
            history=request.history,
            tokenize=True,
            return_tensors="pt"
        ).to(model.device)
        
        # 生成回复（控制长度和随机性，适配7B模型）
        with torch.no_grad():  # 禁用梯度计算，节省显存
            outputs = model.generate(
                **inputs,
                max_new_tokens=512,  # 最大回复长度
                temperature=0.7,     # 随机性（0.5-0.8较合适）
                do_sample=True,
                pad_token_id=tokenizer.eos_token_id  # 避免警告
            )
        
        # 解码回复（去掉输入部分，只保留新生成内容）
        reply = tokenizer.decode(
            outputs[0][len(inputs["input_ids"][0]):],
            skip_special_tokens=True
        )
        
        # 返回回复和更新后的历史
        return {
            "reply": reply,
            "history": request.history + [(request.message, reply)]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"模型调用失败：{str(e)}")

# 6. 启动服务（终端运行此脚本）
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")