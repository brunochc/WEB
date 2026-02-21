# JobHunting - LinkedIn Job Application Assistant

Sistema especializado para automatizar la creación de CVs personalizados a partir de ofertas de LinkedIn.

## 🚀 Características

- **Extracción Automática de LinkedIn**: Extrae información de ofertas (título, empresa, descripción, requisitos)
- **Clasificación Inteligente**: Clasifica automáticamente el tipo de trabajo y selecciona el template apropiado
- **5 Templates Especializados**:
  - **Machinery Engineer** - Enfoque en habilidades técnicas con maquinaria
  - **Workshop Administration** - Gestión de talleres y coordinación
  - **Remote Tech** - Desarrollo remoto y autonomía
  - **Mining** - Sector minero (híbrido por ahora, adaptativo próximamente)
  - **Hybrid** - Perfil dual ingeniero/desarrollador
- **Personalización con IA**: Usa LLM para adaptar el CV a cada oferta específica
- **Compilación Automática**: Genera PDF directamente desde LaTeX

## 📋 Requisitos

- Python 3.8+
- LaTeX (pdflatex) instalado en el sistema
- Google Chrome o Chromium (para scraping de LinkedIn)
- API Key de OpenAI o DeepSeek

## 🔧 Instalación

1. **Clonar el repositorio** (si aplica) o navegar al directorio

2. **Crear y activar virtual environment**:
```bash
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# o
venv\Scripts\activate  # Windows
```

3. **Instalar dependencias**:
```bash
pip install -r requirements.txt
```

4. **Configurar variables de entorno**:
Crea un archivo `.env` en la raíz del proyecto:
```env
# API Keys (usar una de las dos opciones)
OPENAI_API_KEY=sk-...
# o
DEEPSEEK_API_KEY=sk-...
API_BASE_URL=https://api.deepseek.com/v1  # solo si usas DeepSeek

# Modelo a usar
MODEL_NAME=gpt-4  # o deepseek-chat

# Browser config (opcional)
HEADLESS_BROWSER=true  # true para modo headless, false para ver el browser
```

## 📖 Uso

### Opción 1: Extracción desde LinkedIn (Recomendado)

```bash
# Extracción automática con clasificación
./venv/bin/python src/main.py \
  --linkedin-url "https://linkedin.com/jobs/view/12345" \
  --auto-classify

# Especificar categoría manualmente
./venv/bin/python src/main.py \
  --linkedin-url "https://linkedin.com/jobs/view/12345" \
  --category mining \
  --lang es

# Con opciones adicionales
./venv/bin/python src/main.py \
  --linkedin-url "https://linkedin.com/jobs/view/12345" \
  --auto-classify \
  --company "Nombre Empresa" \
  --output-dir output/aplicaciones \
  --lang es
```

### Opción 2: Usar archivo de descripción (Recomendado para Ofertas Locales)

```bash
# Crear archivo con la descripción del trabajo en la carpeta inputs/
cat > inputs/job_desc.txt << EOF
Buscamos Ingeniero en Maquinaria con experiencia en...
EOF

# Generar CV
./venv/bin/python src/main.py \
  --desc-file inputs/job_desc.txt \
  --company "Nombre Empresa" \
  --category machinery_engineer \
  --auto-classify
```

### Categorías disponibles

- `machinery_engineer` - Ingeniero en Maquinaria
- `workshop_admin` - Coordinador/Administrador de Taller
- `remote_tech` - Desarrollador Remoto/Full-Stack
- `mining` - Minería (planificador, secretario técnico, etc.)
- `hybrid` - Perfil híbrido ingeniero/desarrollador

## 📁 Estructura del Proyecto

```
JobHunting/
├── src/
│   ├── main.py                  # Script principal
│   ├── linkedin_extractor.py    # Extractor de LinkedIn
│   ├── job_classifier.py        # Clasificador de trabajos
│   ├── cv_tailor.py             # Personalizador de CV con IA (inyecta reglas globales)
│   ├── researcher.py            # Investigador de empresas
│   └── utils.py                 # Utilidades (compilación LaTeX)
├── templates/
│   ├── Resume_BrunoH_Machinery.tex    # Template maquinaria
│   ├── Resume_BrunoH_Workshop.tex     # Template taller
│   ├── Resume_BrunoH_Remote.tex       # Template remoto
│   ├── Resume_BrunoH_HY.tex           # Template híbrido
│   └── Resume_BrunoH_IT.tex           # Template IT
├── inputs/                      # (Ignorado en Git) Ofertas laborales y descripciones en .txt o .md
├── output/                      # (Ignorado en Git) CVs generados en PDF y LaTeX
├── docs/                        # Documentación del proyecto y notas de planificación
├── scripts_utils/               # Scripts de prueba y utilidades secundarias
├── requirements.txt             # Dependencias Python
├── cv_generation_rules.md       # Reglas globales inyectadas al LLM para la redacción de CVs
├── .env                         # Variables de entorno (crear)
└── README.md                    # Este archivo
```

## 🔍 Cómo Funciona

1. **Extracción**: Si usas `--linkedin-url`, Selenium navega a la página y extrae la información
2. **Clasificación**: El clasificador analiza keywords y determina el tipo de trabajo
3. **Selección de Template**: Automáticamente selecciona el template más apropiado
4. **Investigación**: Busca información básica sobre la empresa
5. **Personalización**: La IA adapta el CV base a la oferta específica
6. **Compilación**: Genera el PDF final listo para enviar

## 🎯 Ejemplos de Uso Real

### Ejemplo 1: Oferta de Planificador en Minería

```bash
./venv/bin/python src/main.py \
  --linkedin-url "https://linkedin.com/jobs/view/..." \
  --auto-classify
```

**Resultado**: 
- Clasificación: `mining` (40% confidence)
- Template: `Resume_BrunoH_HY.tex`
- Output: `output/CV_Empresa_mining.pdf`

### Ejemplo 2: Desarrollador Remoto

```bash
./venv/bin/python src/main.py \
  --linkedin-url "https://linkedin.com/jobs/view/..." \
  --category remote_tech \
  --lang en
```

**Resultado**:
- Template: `Resume_BrunoH_Remote.tex`
- Énfasis en: autonomía, GitHub, proyectos remotos
- Output: `output/CV_Company_remote_tech.pdf`

## ⚠️ Notas Importantes

### LinkedIn Scraping
LinkedIn tiene políticas contra scraping automatizado. Este sistema:
- Usa delays aleatorios para simular comportamiento humano
- Funciona con URLs públicas de ofertas
- Puede requerir login manual en algunos casos
- Si LinkedIn bloquea, puedes usar `--desc-file` como alternativa

### LaTeX
- Asegúrate de tener `pdflatex` instalado
- Si la compilación falla, el `.tex` se genera igual
- Puedes compilar manualmente: `pdflatex output/CV_Empresa_categoria.tex`

## 🛠️ Próximas Mejoras (Fase 2)

- [ ] Template Mining_Adaptive con skill matching inteligente
- [ ] Generador de cartas de presentación
- [ ] Base de datos para tracking de aplicaciones
- [ ] Análisis de habilidades transferibles
- [ ] Login automático a LinkedIn (opcional)

## 🤝 Contribuciones

Este es un proyecto personal. Si tienes sugerencias o encuentras bugs, feel free to discuss!

## 📄 Licencia

Uso personal.
