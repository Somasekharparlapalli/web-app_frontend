import os

search_dir = r"c:\Users\somasekhar reddy\Downloads"
found = []

for root, dirs, files in os.walk(search_dir):
    for file in files:
        if "WhatsApp" in file and (".jpeg" in file.lower() or ".jpg" in file.lower()):
            found.append(os.path.join(root, file))

# Print first 20 found
for f in found[:20]:
    print(f)
