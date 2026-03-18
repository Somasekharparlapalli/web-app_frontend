import os

search_dir = r"c:\Users\somasekhar reddy\Downloads"
found = []

for root, dirs, files in os.walk(search_dir):
    for file in files:
        if "WhatsApp" in file and (".jpeg" in file.lower() or ".jpg" in file.lower()):
            found.append(os.path.join(root, file))

# Write to output.txt
with open("output.txt", "w", encoding="utf-8") as f:
    for item in found:
        f.write(item + "\n")

print(f"Found {len(found)} files. Written to output.txt")
