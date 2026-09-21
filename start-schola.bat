@echo off
setlocal
title Schola Launcher

cd /d "%~dp0schola-v2"

where docker >nul 2>&1
if errorlevel 1 (
    echo.
    echo Docker is not installed or is not available in PATH.
    echo Install Docker Desktop, then run this file again.
    echo.
    pause
    exit /b 1
)

docker info >nul 2>&1
if errorlevel 1 (
    echo.
    echo Docker Desktop is installed, but the Docker engine is not running.
    echo Open Docker Desktop and wait until it is ready, then run this file again.
    echo.
    pause
    exit /b 1
)

echo.
echo Starting Schola...
echo First launch may need to build the app image.
echo.

docker compose up --build -d
if errorlevel 1 (
    echo.
    echo Schola could not start. Showing container status:
    docker compose ps
    echo.
    pause
    exit /b 1
)

echo.
echo Schola is starting at http://localhost:8000
echo.

timeout /t 4 /nobreak >nul
start "" http://localhost:8000

echo If the browser opens before Schola is ready, refresh the page once.
echo To stop Schola, double-click stop-schola.bat.
echo.
pause
