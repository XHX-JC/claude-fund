@echo off
REM ROUTINE PUSH SCRIPT — called by Claude Code routines only
REM Pushes SESSION_BRIEF.md and OPPORTUNITY_SCAN.md to main
REM Does NOT stage journal files — those are committed via session-close.bat only

cd /d C:\Users\jcadb\claude-fund

REM Stage only the routine output files
git add state/SESSION_BRIEF.md
git add state/OPPORTUNITY_SCAN.md

REM Check if anything staged
git diff --cached --quiet
if %errorlevel% == 0 (
    echo No routine files changed — nothing to commit.
    exit /b 0
)

REM Commit with date stamp
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set DT=%%I
set DATESTR=%DT:~0,8%
git commit -m "auto: routine output %DATESTR%"

REM Push to main only — no branch creation
git push origin main

if %errorlevel% == 0 (
    echo Routine push successful.
) else (
    echo WARNING: Push failed. Files committed locally.
)
