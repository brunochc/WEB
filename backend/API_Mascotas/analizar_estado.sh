#!/bin/bash

echo "🔍 ANALIZANDO ESTADO DE REPOS LOCALES"
echo "======================================"

BASE_DIR=~/Pro/WEB
echo "Directorio base: $BASE_DIR"
echo ""

# Función para verificar estado git
verificar_repo() {
    local dir=$1
    local nombre=$(basename "$dir")
    
    if [ -d "$dir/.git" ]; then
        cd "$dir" 2>/dev/null || return
        
        echo "📦 $nombre:"
        
        # Verificar si tiene remote
        if git remote -v 2>/dev/null | grep -q "origin"; then
            echo -n "  🔗 Conectado a GitHub: "
            git remote get-url origin 2>/dev/null | head -1
            
            # Verificar estado
            if git status --porcelain 2>/dev/null | grep -q "."; then
                echo "  ⚠️  Tiene cambios sin commit"
            else
                echo "  ✅ Sincronizado"
            fi
            
            # Verificar si está actualizado
            echo -n "  🔄 "
            git fetch --quiet 2>/dev/null
            LOCAL=$(git rev-parse @)
            REMOTE=$(git rev-parse @{u} 2>/dev/null)
            
            if [ "$LOCAL" = "$REMOTE" ]; then
                echo "Actualizado con GitHub"
            else
                echo "⚠️  Necesita pull (local: ${LOCAL:0:7} vs remote: ${REMOTE:0:7})"
            fi
        else
            echo "  ❌ Sin conexión a GitHub"
        fi
    else
        echo "📁 $nombre: No es un repositorio git"
    fi
    
    echo ""
}

# Analizar proyectos principales en WEB
echo "📂 ANALIZANDO PROYECTOS EN ~/Pro/WEB/:"
echo "--------------------------------------"

for proyecto in "$BASE_DIR"/*/; do
    if [ -d "$proyecto" ]; then
        verificar_repo "$proyecto"
    fi
done

# Analizar también dentro de subdirectorios importantes
echo "🔍 ANALIZANDO SUBDIRECTORIOS:"
echo "-----------------------------"

# Buscar otros .git en subdirectorios
find "$BASE_DIR" -name ".git" -type d | while read gitdir; do
    repodir=$(dirname "$gitdir")
    
    # Si no es un directorio ya analizado en primer nivel
    if [[ "$repodir" != "$BASE_DIR" ]] && [[ ! "$repodir" =~ "$BASE_DIR/[^/]*$" ]]; then
        echo ""
        echo "📂 Sub-repositorio encontrado:"
        verificar_repo "$repodir"
    fi
done

echo "📊 RESUMEN DE ESTADO:"
echo "-------------------"
echo "Revisa arriba para ver qué repos necesitan:"
echo "• 🔄 Pull desde GitHub"
echo "• 📤 Push a GitHub"
echo "• 🔗 Configurar remote"
echo "• 🗂️  Reorganizar"
