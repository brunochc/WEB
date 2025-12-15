#!/bin/bash

echo "💾 GUARDANDO CAMBIOS LOCALES"
echo "============================"

BASE_DIR=~/Pro/WEB

guardar_cambios_repo() {
    local dir=$1
    local nombre=$(basename "$dir")
    
    if [ -d "$dir/.git" ]; then
        cd "$dir" 2>/dev/null || return
        
        # Verificar si hay cambios
        if git status --porcelain 2>/dev/null | grep -q "."; then
            echo "📦 $nombre: Tiene cambios"
            
            # Verificar si es repo de terceros (como frappe_docker)
            if git remote -v 2>/dev/null | grep -q "frappe/frappe_docker\|LibreDTE/LibreDTE\|mouredev/hello-javascript\|JoseGermanx/react-cohorte21-gen"; then
                echo "   ⚠️  Es fork/clone de terceros, guardando stash"
                git stash push -m "Cambios locales antes de reorganizar"
            else
                echo "   💾 Haciendo commit local"
                git add .
                git commit -m "💾 Cambios locales antes de reorganización" --quiet
            fi
        fi
    fi
}

echo "🔍 Buscando repos con cambios..."
find "$BASE_DIR" -name ".git" -type d | while read gitdir; do
    repodir=$(dirname "$gitdir")
    guardar_cambios_repo "$repodir"
done

echo ""
echo "✅ Cambios locales guardados"
