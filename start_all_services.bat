@echo off
echo ========================================
echo   李茗个人小助手 - 一键启动服务
echo ========================================
echo.

echo 步骤1：检查Ollama服务...
tasklist | findstr "ollama" >nul
if %errorlevel% neq 0 (
    echo 启动Ollama服务...
    start "" "ollama" serve
    timeout /t 3 >nul
) else (
    echo Ollama服务已在运行
)

echo 步骤2：检查Python环境...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误：未找到Python，请先安装Python
    pause
    exit /b 1
)

echo 步骤3：检查依赖包...
pip list | findstr "fastapi" >nul
if %errorlevel% neq 0 (
    echo 安装FastAPI依赖...
    pip install fastapi uvicorn httpx
)

echo 步骤4：启动代理API服务...
echo 服务将在 http://localhost:8000 启动
echo 按 Ctrl+C 停止服务
echo.

echo 重要提示：
echo 1. 确保已安装Ollama并拉取模型：ollama pull deepseek-r1:7b
echo 2. 首次拉取模型需要较长时间（只需一次）
echo 3. 之后每次只需运行此脚本即可
echo.

python ollama_proxy.py

pause
