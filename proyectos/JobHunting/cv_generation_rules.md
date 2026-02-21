# Reglas Generales para la Creación de CVs (JobHunting Assistant)
Este archivo contiene las directrices obligatorias que la IA debe seguir al adaptar el CV a una oferta laboral.

1. **PROHIBIDO INCLUIR ENLACES A GITHUB**: 
   - No generar íconos de GitHub ni URLs hacia `github.com/brunochc` o equivalentes en la información de contacto, ni en los proyectos, a menos que el cargo sea EXCLUSIVAMENTE para Software Engineering puro.
   - En perfiles híbridos y de minería/industria, solo mantener el sitio web profesional (`bchc.tech`) y LinkedIn.

2. **PROHIBIDO CUANTIFICAR ESTRICTAMENTE LOS "7 AÑOS"**:
   - No indicar "over 7 years of experience" ni "más de 7 años de experiencia" en el resumen o perfil profesional.
   - Utilizar frases cualitativas como "profesional con sólida experiencia", "con experiencia práctica comprobada", o "amplia experiencia".

3. **TONO Y ACTITUD**:
   - El perfil debe mantener siempre un tono **HUMILDE, ENTUSIASTA y CONFIADO**. 
   - Evitar sonar arrogante (ej: no usar la palabra "experto", "gurú" o "master"). 
   - Demostrar la convicción de que las habilidades técnicas (ingeniería + datos) permitirán aportar valor real y rápido al equipo.

4. **TÍTULO UNIVERSITARIO**:
   - Nunca titular "Ingeniero Civil". 
   - Utilizar "Ingeniero en Maquinaria", "Ingeniero Especialista en [Tema]", o "Ingeniero de Planificación/Control" según convenga.
   - En la sección de educación, la carrera de Ingeniería Civil en Computación debe especificarse SIEMPRE como "(2 años completados)" o "(congelada)". No dar a entender que está titulada.

5. **IDIOMA**:
   - El CV debe estar SIEMPRE en el idioma de la oferta laboral.
   - Si la oferta está en inglés, el CV debe estar en inglés.
   - Si la oferta está en español, el CV debe estar en español.

6. **EXPERIENCIA EN MINERÍA**:
   - Si la oferta es para minería, destacar la experiencia en minería.
   - Si la oferta no es para minería, minimizar la experiencia en minería.

7. **NOMBRE DEL CV**:
   - El CV debe seguir el formato: Resume(si es para el pais que use este nombre)
   - Ejemplos: Resume_BrunoH_ES.tex, Resume_BrunoH_EN.tex
   - Si es para Chile, usar CV_Bruno_Henriquez_nombreOferta.tex
   .tex

Estas reglas deben inyectarse en el Prompt de Sistema del CVTailor antes de generar cualquier texto.
