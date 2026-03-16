import os

def test_structure():
    required_files = [
        'package.json',
        '.env.example',
        'README.md',
        'src/main.tsx',
        'src/App.tsx'
    ]
    
    workspace_path = 'output/procureai/workspace'
    print(f"--- Starting Structure Audit in {workspace_path} ---")
    
    all_passed = True
    for file in required_files:
        path = os.path.join(workspace_path, file)
        # Using simple check based on common file system access
        if os.path.exists(path):
            print(f"[PASS] Found: {file}")
        else:
            print(f"[FAIL] Missing: {file}")
            all_passed = False
            
    if all_passed:
        print("\n--- STATUS: PASSED ---")
        print("Project structure is compliant with architecture standards.")
    else:
        print("\n--- STATUS: FAILED ---")
        print("Compliance audit failed: missing required files.")

if __name__ == "__main__":
    test_structure()
