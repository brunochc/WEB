import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

class CVTailor:
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY") or os.getenv("DEEPSEEK_API_KEY")
        base_url = os.getenv("API_BASE_URL", "https://api.openai.com/v1")
        
        if not api_key:
            raise ValueError("API Key not found. Please set OPENAI_API_KEY or DEEPSEEK_API_KEY in .env")

        self.client = OpenAI(
            api_key=api_key,
            base_url=base_url
        )
        self.model = os.getenv("MODEL_NAME", "gpt-4")

    def read_template(self, template_path):
        """Read LaTeX template from file"""
        with open(template_path, 'r', encoding='utf-8') as f:
            return f.read()

    def _read_generation_rules(self):
        """Read standard rules if available"""
        rules_path = "cv_generation_rules.md"
        if os.path.exists(rules_path):
            with open(rules_path, 'r', encoding='utf-8') as f:
                return f.read()
        return ""
    
    def select_template(self, category: str) -> str:
        """Select appropriate template based on job category"""
        templates = {
            "machinery_engineer": "templates/Resume_BrunoH_Machinery.tex",
            "workshop_admin": "templates/Resume_BrunoH_Workshop.tex",
            "remote_tech": "templates/Resume_BrunoH_Remote.tex",
            "mining": "templates/Resume_BrunoH_HY.tex",  # Will be Mining_Adaptive later
            "hybrid": "templates/Resume_BrunoH_HY.tex",
        }
        return templates.get(category, "templates/Resume_BrunoH_HY.tex")

    def tailor_cv(self, base_cv_content, job_description, company_info, language="es", 
                  job_title="", category="hybrid"):
        """Uses LLM to tailor the CV content."""
        
        # Category-specific instructions
        category_instructions = {
            "machinery_engineer": "Focus on hands-on technical skills, diagnostic abilities, and equipment knowledge. Emphasize practical problem-solving.",
            "workshop_admin": "Highlight management skills, budget control, team coordination, and operational efficiency. Show leadership and organizational abilities.",
            "remote_tech": "Emphasize autonomy, async communication, self-directed learning, and remote collaboration. Showcase completed projects and GitHub portfolio.",
            "mining": "Balance technical expertise with operational impact. Show understanding of mining operations, safety, and reliability.",
            "hybrid": "Demonstrate versatility bridging physical operations and digital solutions. Show both technical depth and business impact."
        }
        
        extra_instruction = category_instructions.get(category, "")
        global_rules = self._read_generation_rules()
        
        prompt = f"""
        You are an expert career coach and technical recruiter. 
        Your task is to tailor a LaTeX CV to a specific job description and company.
        
        Job Title: {job_title}
        Job Category: {category}
        
        Job Description:
        {job_description}
        
        Company Info:
        {company_info}
        
        Base CV (LaTeX):
        {base_cv_content}
        
        Instructions:
        1. Keep the LaTeX structure and formatting completely intact - do not modify \\documentclass, \\usepackage, or any structural elements.
        2. Modify the 'PROFESSIONAL PROFILE' section to directly address the job requirements and company needs.
        3. Adjust bullet points in 'WORK EXPERIENCE' to emphasize achievements most relevant to this specific role.
        4. {extra_instruction}
        5. Use specific numbers and metrics from the base CV - don't make up new ones.
        6. Ensure the language is {language}.
        7. Maintain professional tone appropriate for the {category} sector.
        8. Return ONLY the modified LaTeX code, with NO markdown code blocks or explanations.
        
        GLOBAL RULES TO FOLLOW STRICTLY EVERY TIME:
        {global_rules}
        """
        
        system_content = "You are a professional CV writer. Return ONLY the raw LaTeX code, without markdown markers. Strictly follow the GLOBAL RULES provided."
        
        response = self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "system", "content": system_content},
                      {"role": "user", "content": prompt}]
        )
        
        content = response.choices[0].message.content
        
        # Strip markdown markers if present
        if content.startswith("```"):
            lines = content.split("\n")
            if lines[0].startswith("```"):
                lines = lines[1:]
            if lines[-1].startswith("```"):
                lines = lines[:-1]
            content = "\n".join(lines)
            
        return content.strip()

    def save_tailored_cv(self, content, output_path):
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(content)

if __name__ == "__main__":
    tailor = CVTailor()
    # Example usage
    # content = tailor.read_template("templates/Resume_BrunoH_HY.tex")
    # tailored = tailor.tailor_cv(content, "Job Desc", "Company Info")
    # tailor.save_tailored_cv(tailored, "output/Tailored_CV.tex")
