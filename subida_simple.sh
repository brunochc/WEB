#!/bin/bash

echo "🚀 SUBIDA SIMPLE Y DIRECTA"
echo "=========================="

cd ~/Pro/WEB

echo "1️⃣  Inicializando git..."
git init

echo "2️⃣  Creando README básico..."
cat > README.md << 'EOREADME'
# 🎨 WEB - brunochc

Portafolio web organizado.

## 📂 Categorías
- **frontend/**: Proyectos de frontend
- **backend/**: Proyectos de backend  
- **landing/**: Landing pages
- **proyectos/**: Proyectos completos
- **ejercicios/**: Ejercicios y práctica
- **privados/**: Proyectos privados

---
🔄 Actualizado: $(date +"%Y-%m-%d")
👤 GitHub: [brunochc](https://github.com/brunochc)
EOREADME

echo "3️⃣  Agregando todo al commit..."
git add .

echo "4️⃣  Haciendo commit..."
git commit -m "🎉 WEB organizado - $(date +"%Y-%m-%d")"

echo "5️⃣  Configurando rama main..."
git branch -M main

echo "6️⃣  Verificando si el repo ya existe en GitHub..."
if gh repo view brunochc/WEB 2>/dev/null; then
    echo "   ✅ Repo existe, actualizando..."
    git remote add origin https://github.com/brunochc/WEB.git 2>/dev/null || true
    git push -u origin main --force
else
    echo "   🆕 Creando nuevo repo..."
    gh repo create brunochc/WEB --public --description "🎨 Portafolio web organizado" --source=. --remote=origin --push
fi

echo ""
echo "✅ ¡SUBIDA COMPLETADA!"
echo "🔗 https://github.com/brunochc/WEB"
