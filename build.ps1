$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
Set-Location "D:\dev\Hobbymoto"
& "C:\Program Files\nodejs\npm.cmd" run build 2>&1
