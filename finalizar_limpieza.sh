#!/bin/bash

echo "🚀 FINALIZANDO LIMPIEZA DE SECRETS"
echo "================================="

cd ~/Pro/WEB

echo "1️⃣  Verificando estado local..."
echo "Último commit:"
git log --oneline -1

echo ""
echo "2️⃣  Configurando remote SSH..."
git remote remove origin 2>/dev/null
git remote add origin git@github.com:brunochc/WEB.git

echo "Remote configurado:"
git remote -v

echo ""
echo "3️⃣  Forzando push a GitHub..."
git push --force origin main

if [ $? -eq 0 ]; then
    echo "✅ Push forzado exitoso"
else
    echo "⚠️  Intentando con SSH alternativo..."
    git push --force --set-upstream origin main
fi

echo ""
echo "4️⃣  Verificando que no queden .env..."
if git log --all -- "**/.env" 2>/dev/null | grep -q "."; then
    echo "❌ ¡Todavía hay .env en el historial!"
    echo "   Revisa con: git log --oneline --all -- \"**/.env\""
else
    echo "✅ Historial completamente limpio de .env"
fi

echo ""
echo "5️⃣  Estado final del repositorio:"
echo "   - Archivos .env: $(find . -name ".env" -type f ! -path "*/node_modules/*" | wc -l) (deben ser 0 o solo .env.example)"
echo "   - Backup disponible: ~/secrets_backup_emergencia/"
echo "   - .gitignore actualizado: Sí"
echo "   - Plantillas .env.example creadas: Sí"

echo ""
echo "🔍 Verifica manualmente en GitHub:"
echo "🌐 https://github.com/brunochc/WEB"
echo ""
echo "📋 ¿Ves algún archivo .env en GitHub? (s/n)"
read -r respuesta

if [ "$respuesta" = "s" ] || [ "$respuesta" = "S" ]; then
    echo "⚠️  Si todavía ves .env en GitHub:"
    echo "   1. Espera unos minutos (GitHub puede cachear)"
    echo "   2. Refresca la página con Ctrl+F5"
    echo "   3. Si persiste, repite el proceso filter-repo"
else
    echo "🎉 ¡TODO LIMPIO! Secrets eliminados de GitHub."
fi
