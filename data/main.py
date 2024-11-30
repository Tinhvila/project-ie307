import json
import random

# Đọc dữ liệu từ file data.json
with open('data.json', 'r', encoding='utf-8') as json_file:
    data = json.load(json_file)

# Đọc các brand từ file brand.txt
with open('brand.txt', 'r', encoding='utf-8') as brand_file:
    brands = [line.strip() for line in brand_file.readlines()]

# Loop qua mỗi sản phẩm trong 'products' và gán ngẫu nhiên một brand
for product in data["products"]:
    product["brand"] = random.choice(brands)

# Lưu lại kết quả vào file data.json
with open('data.json', 'w', encoding='utf-8') as json_file:
    json.dump(data, json_file, indent=4, ensure_ascii=False)

print("Đã thêm brand ngẫu nhiên vào các sản phẩm và lưu vào data.json!")
