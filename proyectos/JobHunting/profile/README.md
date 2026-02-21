# 📁 profile/

Este directorio contiene la **fuente de verdad** del perfil profesional de Bruno Henríquez Cano.
Los datos aquí son la base que alimenta la generación de CVs personalizados.

## Archivos

| Archivo | Descripción |
|---|---|
| `linkedin_profile.md` | Perfil completo sincronizado con LinkedIn. Contiene experiencia, educación, certificaciones, habilidades e idiomas. |

## Uso

Los scripts en `src/` (especialmente `cv_tailor.py`) pueden usar este perfil como fuente base al generar CVs adaptados a ofertas de empleo.

### Flujo recomendado

```
profile/linkedin_profile.md  →  cv_tailor.py  +  job_description.txt  →  output/CV_nombre_empresa.tex  →  PDF
```

## Sincronización con LinkedIn

Cuando actualices tu perfil de LinkedIn, actualiza también `linkedin_profile.md` para mantener la consistencia entre el perfil online y los CVs generados.

**Última sincronización:** Febrero 2026
