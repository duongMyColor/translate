import sys
import json
from googletrans import Translator

# Khởi tạo translator
translator = Translator()

# Lấy văn bản từ tham số dòng lệnh
text_to_translate = sys.argv[1]

# Dịch văn bản
translated = translator.translate(text_to_translate, src="en", dest="vi")

# Trả về kết quả JSON
result = {"translated_text": translated.text}
print(json.dumps(result))
