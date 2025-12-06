# Script PowerShell para ejecutar tests
# Maneja correctamente caracteres especiales en el nombre del directorio

$ErrorActionPreference = "Stop"

# Obtener el directorio del script
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptDir

# Cambiar al directorio del proyecto
Set-Location $projectRoot

# Ejecutar Jest
npx jest

exit $LASTEXITCODE

