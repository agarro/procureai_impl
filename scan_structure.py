import os

def list_files_recursive(start_path):
    print(f"--- Scanning directory: {start_path} ---")
    if not os.path.exists(start_path):
        print(f"Error: Path '{start_path}' does not exist.")
        return
        
    for root, dirs, files in os.walk(start_path):
        level = root.replace(start_path, '').count(os.sep)
        indent = ' ' * 4 * (level)
        print(f"{indent}{os.path.basename(root)}/")
        subindent = ' ' * 4 * (level + 1)
        for f in files:
            print(f"{subindent}{f}")

print("Current Working Directory:", os.getcwd())
# Try common base paths
paths_to_check = ['.', 'output', 'procureai', 'workspace', 'output/procureai/workspace']
for p in paths_to_check:
    if os.path.exists(p):
        print(f"\n--- Checking {p} ---")
        print(os.listdir(p))
