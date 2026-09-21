@echo off
setlocal
title Stop Schola

cd /d "%~dp0schola-v2"

where docker >nul 2>&1
if errorlevel 1 (
    echo Docker is not installed or is not available in PATH.
    pause
    exit /b 1
)

echo.
echo Stopping Schola...
docker compose down

echo.
echo Schola has been stopped.
echo Your MySQL data is kept in the Docker volume.
echo.
pause
