$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $projectRoot
$bundleFiles = @('miniprogram','server','src','scripts','tests','docs','content','public','package.json','package-lock.json','project.config.json','index.html','vite.config.mjs','README.md','.env.example','.gitignore','Dockerfile','.dockerignore')
$bundleFiles += (Get-ChildItem -LiteralPath $projectRoot -Filter '*.cmd' -File).Name
New-Item -ItemType Directory -Force -Path 'output' | Out-Null
$bundlePath = Join-Path $projectRoot 'output\jingzhi-beijing-source.zip'
Compress-Archive -LiteralPath $bundleFiles -DestinationPath $bundlePath -Force
Write-Output $bundlePath
