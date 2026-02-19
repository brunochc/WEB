"""
Job Classifier
Classifies job postings by sector and selects appropriate CV template
"""

from dataclasses import dataclass
from typing import List, Tuple
import re


@dataclass
class Classification:
    """Job classification result"""
    category: str
    confidence: float
    keywords_matched: List[str]
    template_path: str


class JobClassifier:
    """Classify jobs into sectors for appropriate CV template selection"""
    
    # Keywords por categoría (español e inglés)
    KEYWORDS = {
        "machinery_engineer": {
            "keywords": [
                # Español
                "maquinaria", "hidráulica", "diagnóstico", "equipos",
                "sistemas automotrices", "mantenimiento mecánico", "reparación",
                "electromecánic", "motor", "transmisión", "suspensión",
                # English
                "machinery", "mechanic", "hydraulic", "diagnostic", "equipment",
                "automotive systems", "mechanical maintenance", "repair",
                "electromechanical", "engine", "transmission", "suspension"
            ],
            "template": "templates/Resume_BrunoH_Machinery.tex",
            "weight": 1.0
        },
        
        "workshop_admin": {
            "keywords": [
                # Español
                "taller", "coordinador", "planificación", "repuestos", "gestión mantenimiento",
                "administración taller", "inventario", "logística", "supervisor",
                "jefe de taller", "control de costos", "presupuesto",
                # English
                "workshop", "coordinator", "planning", "spare parts", "maintenance management",
                "workshop administration", "inventory", "logistics", "supervisor",
                "workshop manager", "cost control", "budget"
            ],
            "template": "templates/Resume_BrunoH_Workshop.tex",
            "weight": 1.0
        },
        
        "remote_tech": {
            "keywords": [
                # Español
                "remoto", "full-stack", "desarrollador", "software", "backend", "frontend",
                "react", "node", "javascript", "python", "api", "web",
                "trabajo remoto", "teletrabajo", "dev", "programador",
                # English
                "remote", "full-stack", "developer", "software", "backend", "frontend",
                "react", "node", "javascript", "python", "api", "web",
                "work from home", "telecommute", "dev", "programmer"
            ],
            "template": "templates/Resume_BrunoH_Remote.tex",
            "weight": 1.0
        },
        
        "mining": {
            "keywords": [
                # Español
                "minería", "mina", "codelco", "faena", "equipos pesados", "subterránea",
                "supervisor mantenimiento", "planificador", "confiabilidad",
                "operaciones mineras", "camión minero", "pala", "perforadora",
                "mantenimiento mina", "secretario técnico",
                # English
                "mining", "mine", "codelco", "site", "heavy equipment", "underground",
                "maintenance supervisor", "planner", "reliability",
                "mining operations", "haul truck", "shovel", "drill",
                "mine maintenance", "technical secretary"
            ],
            "template": "templates/Resume_BrunoH_Mining_Adaptive.tex",
            "weight": 1.2  # Mayor peso porque es prioritario
        },
        
        "hybrid": {
            "keywords": [
                # Español
                "transformación digital", "industrial", "datos", "automatización",
                "análisis de datos", "proceso", "optimización", "sistemas",
                "ingeniería industrial", "mejora continua",
                # English
                "digital transformation", "industrial", "data", "automation",
                "data analysis", "process", "optimization", "systems",
                "industrial engineering", "continuous improvement"
            ],
            "template": "templates/Resume_BrunoH_HY.tex",
            "weight": 0.9
        }
    }
    
    def classify(self, job_text: str, job_title: str = "") -> Classification:
        """
        Classify a job posting into a category
        
        Args:
            job_text: Job description and requirements text
            job_title: Job title (optional, helps with classification)
            
        Returns:
            Classification object with category, confidence, and template path
        """
        # Normalize text
        full_text = f"{job_title} {job_text}".lower()
        
        # Calculate scores for each category
        scores = {}
        matched_keywords = {}
        
        for category, config in self.KEYWORDS.items():
            keywords = config["keywords"]
            weight = config["weight"]
            
            matches = []
            score = 0
            
            for keyword in keywords:
                # Use word boundary matching for better accuracy
                pattern = r'\b' + re.escape(keyword.lower()) + r'\w*\b'
                if re.search(pattern, full_text):
                    matches.append(keyword)
                    score += 1
            
            # Apply category weight
            weighted_score = score * weight
            
            scores[category] = weighted_score
            matched_keywords[category] = matches
        
        # Get best match
        if not scores or max(scores.values()) == 0:
            # Default to hybrid if no clear match
            return Classification(
                category="hybrid",
                confidence=0.3,
                keywords_matched=[],
                template_path=self.KEYWORDS["hybrid"]["template"]
            )
        
        best_category = max(scores.keys(), key=lambda k: scores[k])
        best_score = scores[best_category]
        
        # Calculate confidence (normalize to 0-100%)
        # Confidence increases with more keywords matched
        total_keywords = len(self.KEYWORDS[best_category]["keywords"])
        confidence = min(100, (best_score / total_keywords) * 200)  # Scale to percentage
        
        return Classification(
            category=best_category,
            confidence=confidence,
            keywords_matched=matched_keywords[best_category],
            template_path=self.KEYWORDS[best_category]["template"]
        )
    
    def get_template_path(self, category: str) -> str:
        """
        Get template path for a given category
        
        Args:
            category: Job category
            
        Returns:
            Path to appropriate CV template
        """
        if category in self.KEYWORDS:
            return self.KEYWORDS[category]["template"]
        return self.KEYWORDS["hybrid"]["template"]  # Default fallback


if __name__ == "__main__":
    # Test classification
    classifier = JobClassifier()
    
    test_cases = [
        ("Buscamos Ingeniero en Maquinaria con experiencia en diagnóstico hidráulico", "Ingeniero Mecánico"),
        ("Planificador de Mantenimiento para faena minera en Codelco", "Planificador de Mantenimiento"),
        ("Full-Stack Developer - Remote position with React and Node.js", "Senior Developer"),
        ("Coordinador de Taller con experiencia en gestión de repuestos", "Jefe de Taller"),
        ("Data Engineer para transformación digital en planta industrial", "Ingeniero de Datos"),
    ]
    
    print("Testing Job Classifier\n" + "="*80)
    
    for job_desc, job_title in test_cases:
        result = classifier.classify(job_desc, job_title)
        print(f"\nJob: {job_title}")
        print(f"Category: {result.category}")
        print(f"Confidence: {result.confidence:.1f}%")
        print(f"Keywords matched: {', '.join(result.keywords_matched[:5])}")
        print(f"Template: {result.template_path}")
        print("-"*80)
