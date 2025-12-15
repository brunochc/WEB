#!/bin/bash

echo "🔄 ACTUALIZANDO REPOS URGENTES"
echo "=============================="

# Repos que necesitan pull (según el análisis)
repos_con_pull=(
    "apuntesejercicios"
    "frappe_docker"
    "Ultimatelumber"  # el que está en subdirectorio
    "LibreDTE"
    "react-cohorte21-gen"
    "client"  # restorant-landingpage
)

for repo in "${repos_con_pull[@]}"; do
    echo ""
    echo "📦 Buscando: $repo"
    
    # Buscar el repo en la estructura
    find ~/Pro/WEB -name ".git" -type d | while read gitdir; do
        repodir=$(dirname "$gitdir")
        if [[ "$repodir" =~ .*"$repo".* ]]; then
            echo "   📍 Encontrado en: $repodir"
            cd "$repodir"
            
            # Hacer pull si es repo nuestro
            if git remote -v 2>/dev/null | grep -q "github.com.*brunochc"; then
                echo "   🔄 Haciendo pull..."
                git pull --quiet
                echo "   ✅ Actualizado"
            else
                echo "   ⚠️  Es repo de terceros, guardando cambios primero..."
                git stash push -m "Cambios locales antes de pull" 2>/dev/null
                git pull --quiet
                echo "   ✅ Actualizado (cambios en stash)"
            fi
        fi
    done
done

echo ""
echo "🎉 Repos actualizados"
