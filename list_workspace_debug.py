import os

def list_files(startpath):
    print(f"Listing files in: {startpath}")
    if not os.path.exists(startpath):
        print(f"Path does not exist: {startpath}")
        return
    for root, dirs, files in os.walk(startpath):
        level = root.replace(startpath, '').count(os.sep)
        indent = ' ' * 4 * (level)
        print('{}{}/'.format(indent, os.path.basename(root)))
        subindent = ' ' * 4 * (level + 1)
        for f in files:
            print('{}{}'.format(subindent, f))

# Attempting to list from current directory to see structure
print("--- Current Directory ---")
print(os.getcwd())
list_files('output/procureai/workspace/')
