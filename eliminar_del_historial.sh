#!/bin/bash
cd ~/Pro/WEB
echo "🧹 Eliminando .env del historial completo..."
git filter-repo --force \
  --path-glob '*.env' \
  --path-glob '.env.*' \
  --path 'proyectos/LibreDTE/.env' \
  --path 'proyectos/www/LibreDTE/.env' \
  --path 'proyectos/RealServices/real-services/server/.env' \
  --path 'proyectos/RSC/server/.env' \
  --path 'backend/Clima-API/weather-app/.env' \
  --path 'frontend/weather-app/.env' \
  --invert-paths

echo "📤 Forzando push a GitHub..."
git push --force --all
git push --force --tags
echo "✅ Historial limpiado. Los .env ya no están en GitHub."
