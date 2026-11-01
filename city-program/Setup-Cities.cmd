@echo off
cd /d "%~dp0"
node setup.mjs
if errorlevel 1 goto failed
call Start-Cities.cmd
exit /b 0
:failed
pause
exit /b 1
