@echo off
echo ========================================
echo   李茗个人小助手 - 服务启动脚本
echo ========================================
echo.

echo 检查Python环境...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误：未找到Python，请先安装Python
    pause
    exit /b 1
)

echo 检查依赖包...
pip list | findstr "fastapi" >nul
if %errorlevel% neq 0 (
    echo 安装FastAPI依赖...
    pip install fastapi uvicorn httpx
)

echo 启动代理API服务...
echo 服务将在 http://localhost:8000 启动
echo 按 Ctrl+C 停止服务
echo.

python ollama_proxy.py

pause
