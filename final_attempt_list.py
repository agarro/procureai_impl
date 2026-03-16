import os

def list_files(startpath):
    print(f"--- Files in {startpath} ---")
    if not os.path.exists(startpath):
        print(f"Path does not exist: {startpath}")
        return
    for root, dirs, files in os.walk(startpath):
        for f in files:
            print(os.path.join(root, f))

# Look in the known base path
list_files('output/procureai/workspace/')
# Also look in the actual CWD to see where we are relative to it
print(f"--- CWD: {os.getcwd()} ---")
print(os.listdir('.'))
