import sys
import torch
from pathlib import Path
from PIL import Image

sys.path.append('d:/InviniteDevfest/cide/infinite-vol-5-itk/backend-healthapp')
from services.predict_service import load_model, IMAGE_TRANSFORM, predict_from_image

model, device = load_model()

def test_img(path):
    print(f"\n--- Testing {Path(path).name} ---")
    image = Image.open(path).convert("RGB")
    input_tensor = IMAGE_TRANSFORM(image).unsqueeze(0).to(device)
    
    with torch.no_grad():
        outputs = model(input_tensor)
        
    print("Raw AQI output (sigmoid):", outputs['aqi'].item())
    print("Raw Visibility output:", outputs['visibility'].tolist()[0])
    print("Raw Clarity output:", outputs['clarity'].tolist()[0])
    print("Raw Color output:", outputs['color'].tolist()[0])
    
    result = predict_from_image(open(path, 'rb').read())
    print("\nFinal Result:")
    for k, v in result.items():
        if k != 'confidence':
            print(f"  {k}: {v}")

test_img('d:/InviniteDevfest/cide/infinite-vol-5-itk/frontend-healthapp/tes/polusi.jpg')
test_img('d:/InviniteDevfest/cide/infinite-vol-5-itk/frontend-healthapp/tes/gambar 1.png')
