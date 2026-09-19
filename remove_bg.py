import os
from rembg import remove, new_session
from PIL import Image

output_dir = "public/assets/perfumes/transparent"
os.makedirs(output_dir, exist_ok=True)

print("Loading isnet-general-use model...")
session = new_session("isnet-general-use")

files_to_process = ["ai_amber.jpg", "ai_purple.jpg", "ai_gold.jpg"]

for file in files_to_process:
    input_path = os.path.join("public/assets/perfumes", file)
    output_filename = file.replace(".jpg", ".png")
    output_path = os.path.join(output_dir, output_filename)
    
    print(f"Processing {file}...")
    try:
        with open(input_path, 'rb') as i:
            with open(output_path, 'wb') as o:
                input_bytes = i.read()
                output_bytes = remove(input_bytes, session=session, alpha_matting=True)
                o.write(output_bytes)
        print(f"Saved {output_filename}")
    except Exception as e:
        print(f"Error on {file}: {e}")
