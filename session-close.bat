@echo off
cd /d C:\Users\jcadb\claude-fund

echo ============================================
echo   CLAUDE FUND — SESSION CLOSE COMMIT
echo ============================================
echo.

REM Stage all changes
git add .

REM Check if there's anything to commit
git diff --cached --quiet
if %errorlevel% == 0 (
    echo No changes to commit — repo already up to date.
    goto push
)

REM Commit with timestamp
set DATETIME=%date% %time%
git commit -m "Session close — %DATETIME%"

echo.
echo Committed successfully.

:push
REM Push to GitHub
echo.
echo Pushing to GitHub...
git push origin main

if %errorlevel% == 0 (
    echo.
    echo ============================================
    echo   DONE — Journal backed up to GitHub
    echo ============================================
) else (
    echo.
    echo WARNING: Push failed. Check internet connection.
    echo Changes are committed locally — push manually via GitHub Desktop.
)

echo.
pause
