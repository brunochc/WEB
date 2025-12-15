#!/bin/bash

echo "🏗️  ORGANIZACIÓN DIRECTA"
echo "======================="

# Crear estructura final
FINAL_DIR=~/github_final_directo
mkdir -p "$FINAL_DIR"
cd "$FINAL_DIR"

# Crear estructura
mkdir -p {WEB,DB,IA,SO,SW}
mkdir -p WEB/{frontend,backend,fullstack,landing,proyectos,ejercicios,privados}

echo "📁 Directorio de trabajo: $FINAL_DIR"
echo ""

# Mapeo de repos a categorías (basado en tu análisis)
declare -A CATEGORIAS=(
    # Frontend
    ["weather-app"]="frontend"
    ["react-app"]="frontend"
    ["react-componentes"]="frontend"
    ["lista-publicaciones-react"]="frontend"
    ["hello-javascript"]="frontend"
    
    # Backend
    ["API_Mascotas"]="backend"
    ["Clima-API"]="backend"
    ["expressjs"]="backend"
    
    # Fullstack
    ["react-estado"]="fullstack"
    
    # Landing
    ["valpomoto"]="landing"
    ["serv-tec-motocicletas"]="landing"
    ["bootstrap-practica"]="landing"
    ["restorant-landingpage"]="landing"
    ["landingpage"]="landing"
    ["client"]="landing"
    
    # Proyectos
    ["frappe_docker"]="proyectos"
    ["RSC"]="proyectos"
    ["lavadoras_wb"]="proyectos"
    ["Webmadera"]="proyectos"
    ["Maderaweb"]="proyectos"
    ["LibreDTE"]="proyectos"
    
    # Ejercicios
    ["Generation"]="ejercicios"
    ["SA-LPD2"]="ejercicios"
    ["tifc2-sd-02-lab-assessment-coding-loops-brunochc"]="ejercicios"
    ["tifc2-ad-02-lab-assessment-interacting-with-html-css-js-brunochc"]="ejercicios"
    ["tifc2-sd-06-lab-assessment-constructing-objects-brunochc"]="ejercicios"
    ["tifc2-sd-04-lab-assessment-manipulating-arrays-brunochc"]="ejercicios"
    ["tifc2-sd-10-lab-exporting-functions-bp-brunochc"]="ejercicios"
    ["tifc2-sd-02-1-desaf-o-semana-4-brunochc"]="ejercicios"
    ["tifc2-sd-08-lab-assessment-declaring-classes-brunochc"]="ejercicios"
    ["sa-lpd1-ejercicio-de-l-gica-de-programaci-n-drill-1-brunochc"]="ejercicios"
    
    # Privados
    ["apuntesejercicios"]="privados"
    ["Ultimatelumber"]="privados"
    ["Ingetriz"]="privados"
)

# Función para copiar repo
copiar_repo() {
    local origen=$1
    local categoria=$2
    local nombre=$3
    
    if [ ! -d "$origen" ]; then
        return
    fi
    
    echo "📦 $nombre → $categoria"
    
    # Crear destino
    mkdir -p "WEB/$categoria/$nombre"
    
    # Copiar contenido (excluyendo .git y archivos temporales)
    find "$origen" -maxdepth 1 -mindepth 1 \
        ! -name ".git" \
        ! -name ".DS_Store" \
        ! -name "*.swp" \
        ! -name "*.swo" \
        ! -name ".vscode" \
        ! -name ".idea" \
        ! -name "node_modules" \
        ! -name "__pycache__" \
        -exec cp -r {} "WEB/$categoria/$nombre/" 2>/dev/null \;
    
    # Si es un repo git, crear README con info
    if [ -d "$origen/.git" ]; then
        cat > "WEB/$categoria/$nombre/README.md" << EOR
# $nombre

$(if git -C "$origen" remote -v 2>/dev/null | grep -q "github.com"; then
    echo "**Originalmente en GitHub**"
    git -C "$origen" remote get-url origin 2>/dev/null | head -1
else
    echo "**Repositorio local**"
fi)

## 📝 Descripción
Proyecto movido al repositorio organizado WEB.

## 📅 Fecha de movimiento
$(date +"%Y-%m-%d")

---
*Parte de la reorganización del portafolio GitHub*
EOR
    fi
}

echo "🔍 BUSCANDO Y COPIANDO REPOSITORIOS..."
echo "--------------------------------------"

# Buscar cada repo en el mapeo
for repo in "${!CATEGORIAS[@]}"; do
    categoria="${CATEGORIAS[$repo]}"
    
    # Buscar en ~/Pro/WEB
    find ~/Pro/WEB -type d -name "$repo" 2>/dev/null | head -1 | while read encontrado; do
        if [ -n "$encontrado" ]; then
            copiar_repo "$encontrado" "$categoria" "$repo"
        fi
    done
done

# Procesar "no git connection" especialmente
echo ""
echo "🔍 PROCESANDO 'no git connection'..."
if [ -d ~/Pro/WEB/no\ git\ connection ]; then
    cd ~/Pro/WEB/no\ git\ connection
    
    for item in */; do
        if [ -d "$item" ]; then
            nombre=$(basename "$item")
            echo "📦 $nombre → proyectos"
            mkdir -p "$FINAL_DIR/WEB/proyectos/$nombre"
            find "$item" -maxdepth 1 -mindepth 1 ! -name ".git" -exec cp -r {} "$FINAL_DIR/WEB/proyectos/$nombre/" \;
        fi
    done
fi

# OracleLinux a DB
echo ""
echo "🗄️  COPIANDO OracleLinux a DB..."
if [ -d ~/Pro/DB/OracleLinux ]; then
    cp -r ~/Pro/DB/OracleLinux/* "$FINAL_DIR/DB/" 2>/dev/null
    echo "✅ OracleLinux movido a DB"
fi

# Verificar resultados
echo ""
echo "📊 RESULTADO:"
echo "-------------"
for categoria in frontend backend fullstack landing proyectos ejercicios privados; do
    count=$(find "$FINAL_DIR/WEB/$categoria" -maxdepth 1 -type d 2>/dev/null | wc -l)
    if [ "$count" -gt 0 ]; then
        actual=$((count-1))
        if [ "$actual" -gt 0 ]; then
            echo "📂 $categoria: $actual proyectos"
            # Listar primeros 3
            find "$FINAL_DIR/WEB/$categoria" -maxdepth 1 -type d | tail -n +2 | head -3 | while read d; do
                echo "   • $(basename "$d")"
            done
            if [ "$actual" -gt 3 ]; then
                echo "   • ... y $((actual-3)) más"
            fi
        fi
    fi
done

echo ""
echo "🎉 ORGANIZACIÓN COMPLETA"
echo "📁 Revisa en: $FINAL_DIR"
