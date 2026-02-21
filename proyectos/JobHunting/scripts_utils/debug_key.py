import os
from dotenv import load_dotenv

load_dotenv()

key = os.getenv("DEEPSEEK_API_KEY")
placeholder = "sk-your-deepseek-key-here"

print(f"Key present: {bool(key)}")
if key:
    print(f"Key length: {len(key)}")
    print(f"Starts with: {key[:4]}")
    print(f"Ends with: {key[-4:]}")
    print(f"Is placeholder: {key == placeholder}")
    print(f"Contains 'here': {'here' in key}")
