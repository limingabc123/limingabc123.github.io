@echo off
echo ========================================
echo   李茗个人小助手 - 简化版启动脚本
echo ========================================
echo.

echo 检查Ollama服务状态...
curl http://localhost:11434/api/tags >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误：Ollama服务未运行！
    echo 请先启动Ollama服务：ollama serve
    echo 然后重新运行此脚本
    pause
    exit /b 1
)

echo Ollama服务正在运行
echo 启动代理服务...
echo 服务地址：http://localhost:8000
echo 按 Ctrl+C 停止服务
echo.

python simple_proxy.py

pause
