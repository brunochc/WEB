import requests
from bs4 import BeautifulSoup
import os
from dotenv import load_dotenv

load_dotenv()

class Researcher:
    def __init__(self):
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }

    def fetch_job_description(self, url):
        """Fetches and parses job description from a URL."""
        try:
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # This is a generic parser, might need site-specific logic (LinkedIn, etc.)
            # For now, we'll just extract all text from the body
            text = soup.get_text(separator='\n', strip=True)
            return text
        except Exception as e:
            print(f"Error fetching job description: {e}")
            return None

    def search_company_info(self, company_name):
        """Searches for company information using a search API or simple web search."""
        # Placeholder for search logic. 
        # In a real scenario, we'd use Google Search API or similar.
        # For this demo, we'll return a placeholder.
        return f"Information about {company_name}: Mission, values, and recent projects."

if __name__ == "__main__":
    researcher = Researcher()
    # Example usage
    # job_text = researcher.fetch_job_description("https://example.com/job")
    # print(job_text)
