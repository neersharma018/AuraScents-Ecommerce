import os
from rembg import remove
from PIL import Image

input_dir = "public/assets/perfumes"
output_dir = "public/assets/perfumes/transparent"

os.makedirs(output_dir, exist_ok=True)

for file in os.listdir(input_dir):
    if file.endswith(".jpg"):
        input_path = os.path.join(input_dir, file)
        output_filename = file.replace(".jpg", ".png")
        output_path = os.path.join(output_dir, output_filename)
        
        print(f"Processing {file}...")
        try:
            with open(input_path, 'rb') as i:
                with open(output_path, 'wb') as o:
                    input_bytes = i.read()
                    output_bytes = remove(input_bytes)
                    o.write(output_bytes)
            print(f"Saved {output_filename}")
        except Exception as e:
            print(f"Error on {file}: {e}")
