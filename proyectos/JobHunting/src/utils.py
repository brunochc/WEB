import subprocess
import os

def compile_latex(tex_path, output_dir):
    """Compiles a LaTeX file to PDF using pdflatex."""
    try:
        # Ensure output directory exists
        os.makedirs(output_dir, exist_ok=True)
        
        # Run pdflatex
        result = subprocess.run(
            ['pdflatex', '-interaction=nonstopmode', '-output-directory', output_dir, tex_path],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        if result.returncode == 0:
            print(f"Successfully compiled {tex_path}")
            return True
        else:
            print(f"Error compiling LaTeX (Return Code: {result.returncode})")
            # Usually the error is in stdout for pdflatex
            print("--- STDOUT ---")
            print(result.stdout)
            print("--- STDERR ---")
            print(result.stderr)
            return False
    except FileNotFoundError:
        print("pdflatex not found. Please install a LaTeX distribution.")
        return False
    except Exception as e:
        print(f"An error occurred during compilation: {e}")
        return False
