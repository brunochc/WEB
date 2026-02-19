"""
LinkedIn Job Extractor
Extracts job posting information from LinkedIn URLs
"""

import time
import re
from dataclasses import dataclass
from typing import Optional
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from bs4 import BeautifulSoup
import os
from dotenv import load_dotenv

load_dotenv()


@dataclass
class JobPosting:
    """Structured job posting data"""
    title: str
    company: str
    location: str
    description: str
    requirements: str
    employment_type: str
    linkedin_url: str
    raw_text: str


class LinkedInExtractor:
    """Extract job information from LinkedIn job postings"""
    
    def __init__(self, headless: bool = None):
        """
        Initialize the LinkedIn extractor
        
        Args:
            headless: Run browser in headless mode. If None, reads from env var.
        """
        if headless is None:
            headless = os.getenv("HEADLESS_BROWSER", "true").lower() == "true"
        
        self.headless = headless
        self.driver = None
    
    def _init_driver(self):
        """Initialize Selenium WebDriver"""
        chrome_options = Options()
        
        if self.headless:
            chrome_options.add_argument("--headless")
        
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-blink-features=AutomationControlled")
        chrome_options.add_argument("user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
        
        self.driver = webdriver.Chrome(options=chrome_options)
        self.driver.implicitly_wait(10)
    
    def extract(self, linkedin_url: str) -> Optional[JobPosting]:
        """
        Extract job posting information from LinkedIn URL
        
        Args:
            linkedin_url: Full LinkedIn job posting URL
            
        Returns:
            JobPosting object with extracted information, or None if extraction fails
        """
        try:
            if not self.driver:
                self._init_driver()
            
            print(f"Accessing LinkedIn URL: {linkedin_url}")
            self.driver.get(linkedin_url)
            
            # Wait for page to load - LinkedIn often requires some wait time
            time.sleep(3)
            
            # Get page source for parsing
            page_source = self.driver.page_source
            soup = BeautifulSoup(page_source, 'html.parser')
            
            # Extract job information using various selectors
            # LinkedIn's HTML structure changes, so we try multiple approaches
            
            title = self._extract_title(soup)
            company = self._extract_company(soup)
            location = self._extract_location(soup)
            description = self._extract_description(soup)
            employment_type = self._extract_employment_type(soup)
            
            # Extract requirements (usually part of description)
            requirements = self._extract_requirements(description)
            
            # Get all text as fallback
            raw_text = soup.get_text(separator='\n', strip=True)
            
            job_posting = JobPosting(
                title=title or "Unknown Title",
                company=company or "Unknown Company",
                location=location or "Unknown Location",
                description=description or raw_text[:2000],  # Fallback to first 2000 chars
                requirements=requirements or "",
                employment_type=employment_type or "Unknown",
                linkedin_url=linkedin_url,
                raw_text=raw_text
            )
            
            print(f"✓ Extracted: {job_posting.title} at {job_posting.company}")
            return job_posting
            
        except Exception as e:
            print(f"Error extracting job posting: {e}")
            return None
    
    def _extract_title(self, soup: BeautifulSoup) -> Optional[str]:
        """Extract job title"""
        selectors = [
            ('h1', {'class': re.compile(r'.*job.*title.*', re.I)}),
            ('h1', {'class': re.compile(r'.*topcard.*', re.I)}),
            ('h1', {}),
        ]
        
        for tag, attrs in selectors:
            element = soup.find(tag, attrs)
            if element:
                return element.get_text(strip=True)
        
        return None
    
    def _extract_company(self, soup: BeautifulSoup) -> Optional[str]:
        """Extract company name"""
        selectors = [
            ('a', {'class': re.compile(r'.*company.*name.*', re.I)}),
            ('span', {'class': re.compile(r'.*company.*name.*', re.I)}),
            ('div', {'class': re.compile(r'.*company.*name.*', re.I)}),
        ]
        
        for tag, attrs in selectors:
            element = soup.find(tag, attrs)
            if element:
                return element.get_text(strip=True)
        
        return None
    
    def _extract_location(self, soup: BeautifulSoup) -> Optional[str]:
        """Extract job location"""
        selectors = [
            ('span', {'class': re.compile(r'.*location.*', re.I)}),
            ('div', {'class': re.compile(r'.*location.*', re.I)}),
        ]
        
        for tag, attrs in selectors:
            element = soup.find(tag, attrs)
            if element:
                return element.get_text(strip=True)
        
        return None
    
    def _extract_description(self, soup: BeautifulSoup) -> Optional[str]:
        """Extract job description"""
        selectors = [
            ('div', {'class': re.compile(r'.*description.*', re.I)}),
            ('section', {'class': re.compile(r'.*description.*', re.I)}),
            ('article', {'class': re.compile(r'.*description.*', re.I)}),
        ]
        
        for tag, attrs in selectors:
            element = soup.find(tag, attrs)
            if element:
                return element.get_text(separator='\n', strip=True)
        
        return None
    
    def _extract_employment_type(self, soup: BeautifulSoup) -> Optional[str]:
        """Extract employment type (Full-time, Part-time, etc.)"""
        selectors = [
            ('span', {'class': re.compile(r'.*employment.*type.*', re.I)}),
            ('li', {'class': re.compile(r'.*job.*criteria.*', re.I)}),
        ]
        
        for tag, attrs in selectors:
            elements = soup.find_all(tag, attrs)
            for element in elements:
                text = element.get_text(strip=True)
                if any(keyword in text.lower() for keyword in ['full-time', 'part-time', 'contract', 'remote', 'tiempo completo']):
                    return text
        
        return None
    
    def _extract_requirements(self, description: str) -> str:
        """
        Extract requirements section from job description
        
        Args:
            description: Full job description text
            
        Returns:
            Requirements text or empty string
        """
        if not description:
            return ""
        
        # Common headers for requirements section
        patterns = [
            r'(?:Requisitos|Requirements|Qualifications|What [Ww]e\'re [Ll]ooking [Ff]or):(.*?)(?:\n\n|$)',
            r'(?:Required|Requerido):(.*?)(?:\n\n|$)',
        ]
        
        for pattern in patterns:
            match = re.search(pattern, description, re.DOTALL | re.IGNORECASE)
            if match:
                return match.group(1).strip()
        
        # If no explicit requirements section, return first 500 chars
        return description[:500]
    
    def close(self):
        """Close the browser driver"""
        if self.driver:
            self.driver.quit()
            self.driver = None
    
    def __enter__(self):
        """Context manager entry"""
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Context manager exit"""
        self.close()


if __name__ == "__main__":
    # Test extraction
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python linkedin_extractor.py <linkedin_job_url>")
        sys.exit(1)
    
    url = sys.argv[1]
    
    with LinkedInExtractor(headless=False) as extractor:
        job = extractor.extract(url)
        
        if job:
            print("\n" + "="*80)
            print(f"Title: {job.title}")
            print(f"Company: {job.company}")
            print(f"Location: {job.location}")
            print(f"Employment Type: {job.employment_type}")
            print(f"\nDescription:\n{job.description[:500]}...")
            print("="*80)
        else:
            print("Failed to extract job information")
