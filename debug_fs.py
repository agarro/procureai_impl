import os
print("Current working directory:", os.getcwd())
print("Contents of current directory:", os.listdir('.'))
if os.path.exists('output'):
    print("Contents of 'output':", os.listdir('output'))
