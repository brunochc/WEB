import argparse
import os
import sys
from linkedin_extractor import LinkedInExtractor, JobPosting
from job_classifier import JobClassifier
from researcher import Researcher
from cv_tailor import CVTailor
from utils import compile_latex

def main():
    parser = argparse.ArgumentParser(
        description="AI Job Hunting Assistant - LinkedIn Specialized",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Extract from LinkedIn and auto-generate CV
  python src/main.py --linkedin-url "https://linkedin.com/jobs/view/12345" --auto-classify
  
  # Use manual job description file
  python src/main.py --desc-file job_desc.txt --company "Acme Corp" --category mining
  
  # Specify language and output directory
  python src/main.py --linkedin-url "URL" --lang en --output-dir output/applications
        """
    )
    
    # Input options
    input_group = parser.add_mutually_exclusive_group(required=True)
    input_group.add_argument("--linkedin-url", help="LinkedIn job posting URL")
    input_group.add_argument("--desc-file", help="Path to text file with job description")
    
    # Classification options
    parser.add_argument("--auto-classify", action="store_true", 
                       help="Automatically classify job and select template")
    parser.add_argument("--category", 
                       choices=["machinery_engineer", "workshop_admin", "remote_tech", "mining", "hybrid"],
                       help="Manually specify job category (overrides auto-classification)")
    
    # Configuration
    parser.add_argument("--company", help="Company name (auto-detected from LinkedIn if not provided)")
    parser.add_argument("--lang", default="es", choices=["es", "en"], 
                       help="CV language (default: es)")
    parser.add_argument("--output-dir", default="output", 
                       help="Output directory for generated files")
    parser.add_argument("--headless", action="store_true", 
                       help="Run browser in headless mode (default: from .env)")
    parser.add_argument("--no-compile", action="store_true",
                       help="Skip PDF compilation (only generate .tex file)")
    
    args = parser.parse_args()
    
    # Initialize components
    classifier = JobClassifier()
    researcher = Researcher()
    tailor = CVTailor()
    
    job_desc = None
    job_title = ""
    company_name = args.company or "Unknown Company"
    
    # Step 1: Get job information
    if args.linkedin_url:
        print("=" * 80)
        print("STEP 1: Extracting job information from LinkedIn")
        print("=" * 80)
        
        with LinkedInExtractor(headless=args.headless) as extractor:
            job_posting = extractor.extract(args.linkedin_url)
            
            if not job_posting:
                print("❌ Failed to extract job information from LinkedIn")
                return 1
            
            job_desc = job_posting.description
            job_title = job_posting.title
            company_name = args.company or job_posting.company
            
            print(f"✓ Extracted: {job_title} at {company_name}")
            print(f"  Location: {job_posting.location}")
            print(f"  Type: {job_posting.employment_type}")
    
    elif args.desc_file:
        print(f"STEP 1: Reading job description from {args.desc_file}")
        
        if not os.path.exists(args.desc_file):
            print(f"❌ File not found: {args.desc_file}")
            return 1
        
        with open(args.desc_file, 'r', encoding='utf-8') as f:
            job_desc = f.read()
        
        print(f"✓ Loaded job description ({len(job_desc)} characters)")
    
    if not job_desc:
        print("❌ No job description available")
        return 1
    
    # Step 2: Classify job (if auto-classify or no category specified)
    category = args.category
    
    if args.auto_classify or not category:
        print("\n" + "=" * 80)
        print("STEP 2: Classifying job posting")
        print("=" * 80)
        
        classification = classifier.classify(job_desc, job_title)
        
        if not args.category:  # Only use classification if category not manually set
            category = classification.category
        
        print(f"✓ Category: {classification.category}")
        print(f"  Confidence: {classification.confidence:.1f}%")
        print(f"  Keywords matched: {', '.join(classification.keywords_matched[:5])}")
        print(f"  Selected template: {classification.template_path}")
        
        if args.category and args.category != classification.category:
            print(f"  ⚠ Manual override: using {args.category} instead")
            category = args.category
    else:
        print(f"\n✓ Using manual category: {category}")
    
    # Step 3: Research company
    print("\n" + "=" * 80)
    print(f"STEP 3: Researching company: {company_name}")
    print("=" * 80)
    
    company_info = researcher.search_company_info(company_name)
    print(f"✓ Company research complete")
    
    # Step 4: Select and load template
    print("\n" + "=" * 80)
    print("STEP 4: Selecting CV template")
    print("=" * 80)
    
    template_path = tailor.select_template(category)
    print(f"✓ Selected template: {template_path}")
    
    if not os.path.exists(template_path):
        print(f"❌ Template not found: {template_path}")
        print(f"   Available templates:")
        for template_file in os.listdir("templates"):
            if template_file.endswith(".tex"):
                print(f"     - {template_file}")
        return 1
    
    base_cv = tailor.read_template(template_path)
    print(f"  Template loaded ({len(base_cv)} characters)")
    
    # Step 5: Tailor CV
    print("\n" + "=" * 80)
    print("STEP 5: Tailoring CV with AI")
    print("=" * 80)
    
    print("  Analyzing job requirements...")
    print("  Customizing professional profile...")
    print("  Highlighting relevant experience...")
    
    tailored_cv = tailor.tailor_cv(
        base_cv_content=base_cv,
        job_description=job_desc,
        company_info=company_info,
        language=args.lang,
        job_title=job_title,
        category=category
    )
    
    print("✓ CV tailoring complete")
    
    # Step 6: Save output
    print("\n" + "=" * 80)
    print("STEP 6: Saving files")
    print("=" * 80)
    
    # Create output directory
    os.makedirs(args.output_dir, exist_ok=True)
    
    # Clean company name for filename
    safe_company = "".join(c for c in company_name if c.isalnum() or c in (' ', '-', '_')).strip()
    safe_company = safe_company.replace(' ', '_')
    
    output_tex = os.path.join(args.output_dir, f"CV_{safe_company}_{category}.tex")
    tailor.save_tailored_cv(tailored_cv, output_tex)
    print(f"✓ LaTeX CV saved: {output_tex}")
    
    # Step 7: Compile to PDF
    if not args.no_compile:
        print("\n" + "=" * 80)
        print("STEP 7: Compiling to PDF")
        print("=" * 80)
        
        if compile_latex(output_tex, args.output_dir):
            output_pdf = output_tex.replace('.tex', '.pdf')
            print(f"✓ PDF compiled successfully: {output_pdf}")
        else:
            print("⚠ PDF compilation failed (LaTeX errors)")
            print("  You can still use the .tex file and compile it manually")
    
    # Summary
    print("\n" + "=" * 80)
    print("✅ JOB APPLICATION PACKAGE READY")
    print("=" * 80)
    print(f"Job: {job_title}")
    print(f"Company: {company_name}")
    print(f"Category: {category}")
    print(f"Language: {args.lang}")
    print(f"Output: {args.output_dir}/")
    print("\nNext steps:")
    print("  1. Review the generated CV")
    print("  2. Make any final adjustments if needed")
    print("  3. Apply to the job!")
    
    return 0

if __name__ == "__main__":
    sys.exit(main())

