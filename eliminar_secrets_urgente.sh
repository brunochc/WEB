#!/bin/bash

echo "🚨 ELIMINACIÓN DE EMERGENCIA DE SECRETS"
echo "======================================"

cd ~/Pro/WEB

echo "⚠️  IMPORTANTE: Si estos .env contienen API keys reales,"
echo "   DEBES ROTARLAS primero (cambiarlas en los servicios)"
echo ""

# 1. Agregar TODOS los .env al .gitignore
echo "📝 Actualizando .gitignore..."
cat >> .gitignore << 'EOGITIGNORE'

# ============================================
# SECRETS ENCONTRADOS - NO SUBIR NUNCA
# ============================================
# Archivos .env REALES (ya comprometidos)
proyectos/LibreDTE/.env
proyectos/www/LibreDTE/.env
proyectos/RealServices/real-services/server/.env
proyectos/frappe_docker/example.env
proyectos/frappe_docker/frappe_docker/example.env
proyectos/RSC/server/.env
backend/Clima-API/weather-app/.env
frontend/weather-app/.env

# Patrones generales para .env
.env
.env.local
.env.*
!.env.example
EOGITIGNORE

# 2. Eliminar del staging area actual
echo "🗑️  Eliminando del staging area..."
git rm --cached --ignore-unmatch \
  proyectos/LibreDTE/.env \
  proyectos/www/LibreDTE/.env \
  proyectos/RealServices/real-services/server/.env \
  proyectos/frappe_docker/example.env \
  proyectos/frappe_docker/frappe_docker/example.env \
  proyectos/RSC/server/.env \
  backend/Clima-API/weather-app/.env \
  frontend/weather-app/.env 2>/dev/null || true

# 3. Verificar si YA ESTÁN en el historial de Git
echo ""
echo "🔍 Verificando commits con .env..."
HISTORY_OUTPUT=$(git log --oneline --all -- "**/.env" 2>/dev/null | head -5)
if [ -n "$HISTORY_OUTPUT" ]; then
    echo "❌❌❌ CRÍTICO: Secrets encontrados en historial de Git"
    echo ""
    echo "Commits que contienen .env:"
    echo "$HISTORY_OUTPUT"
    echo ""
    echo "🚨 DEBES ELIMINARLOS DEL HISTORIAL COMPLETO"
    echo ""
    echo "📋 OPCIONES:"
    echo "   A) Si son proyectos de PRUEBA/SIN datos reales:"
    echo "      Continuar con eliminación del historial"
    echo ""
    echo "   B) Si tienen API KEYS/DB PASSWORDS REALES:"
    echo "      1. ROTAR CLAVES PRIMERO (en servicios)"
    echo "      2. Luego eliminar del historial"
    echo ""
    echo "¿Contienen datos REALES críticos? (s/n)"
    read -r respuesta
    if [ "$respuesta" = "s" ] || [ "$respuesta" = "S" ]; then
        echo "🔄 ROTA TUS CLAVES PRIMERO en:"
        echo "   - Servicios de API"
        echo "   - Bases de datos"
        echo "   - Servicios en la nube"
        echo ""
        echo "Luego ejecuta: ./eliminar_del_historial.sh"
    else
        echo "✅ Procediendo con eliminación del historial..."
        ./eliminar_del_historial.sh
    fi
else
    echo "✅ No se encontraron .env en el historial de commits"
    echo "   (puede que no se hayan commiteado aún)"
fi

# 4. Crear .env.example de plantilla para cada .env encontrado
echo ""
echo "📄 Creando plantillas .env.example..."
for envfile in proyectos/LibreDTE/.env \
               proyectos/RealServices/real-services/server/.env \
               proyectos/RSC/server/.env \
               backend/Clima-API/weather-app/.env \
               frontend/weather-app/.env; do
    if [ -f "$envfile" ]; then
        dir=$(dirname "$envfile")
        example_file="$dir/.env.example"
        
        echo "  📝 Creando $example_file"
        
        # Crear plantilla basada en el .env real
        cat > "$example_file" << 'EOEXAMPLE'
# ============================================
# CONFIGURACIÓN DE ENTORNO - PLANTILLA
# COPIA ESTE ARCHIVO A .env Y COMPLETA
# ============================================

# ⚠️  NUNCA subas el .env real al repositorio
# ⚠️  Agrega .env a .gitignore

# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nombre_base_datos
DB_USER=usuario
DB_PASSWORD=contraseña_segura

# API Keys (obtén las tuyas en los servicios correspondientes)
API_KEY=tu_api_key_aqui
SECRET_KEY=clave_secreta_larga_y_compleja

# URLs y configuraciones
API_URL=http://localhost:3000
FRONTEND_URL=http://localhost:8080
DEBUG=true

# Servicios externos
STRIPE_SECRET_KEY=sk_test_...
SENDGRID_API_KEY=SG...
AWS_ACCESS_KEY=AKIA...
AWS_SECRET_KEY=...
EOEXAMPLE
    fi
done

echo ""
echo "📋 RESUMEN DE ACCIONES:"
echo "   1. 💾 Backup de .env en ~/secrets_backup_emergencia/"
echo "   2. 📝 .gitignore actualizado"
echo "   3. 🗑️  .env eliminados del staging"
echo "   4. 📄 Plantillas .env.example creadas"
echo ""
echo "⚠️  PASO FINAL CRÍTICO:"
echo "   Si los .env YA ESTÁN en GitHub, DEBES:"
echo "   1. Eliminarlos del historial con git-filter-repo"
echo "   2. Hacer git push --force"
echo ""
echo "¿Quieres proceder con la eliminación del historial? (s/n)"
read -r proceder
if [ "$proceder" = "s" ] || [ "$proceder" = "S" ]; then
    echo "🔧 Instalando git-filter-repo si es necesario..."
    sudo apt update && sudo apt install git-filter-repo -y
    cat > eliminar_del_historial.sh << 'EOF2'
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
EOF2
    chmod +x eliminar_del_historial.sh
    ./eliminar_del_historial.sh
fi
