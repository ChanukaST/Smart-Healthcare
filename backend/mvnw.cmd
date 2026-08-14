@REM ----------------------------------------------------------------------------
@REM Maven Wrapper startup batch script
@REM ----------------------------------------------------------------------------
@echo off
set "NETBEANS_MVN=C:\Program Files\NetBeans-25\netbeans\java\maven\bin\mvn.cmd"
if exist "%NETBEANS_MVN%" (
    "%NETBEANS_MVN%" %*
) else (
    mvn %*
)
