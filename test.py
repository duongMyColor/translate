import pyttsx3

# Khởi tạo đối tượng pyttsx3
engine = pyttsx3.init()

# Cài đặt các thuộc tính (ví dụ: giọng nói)
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[0].id)  # Chọn giọng đầu tiên trong danh sách

# Văn bản cần đọc
text = "Hello! Don't forget to like the video if you find it helpful, thank you"

# Phát âm thanh trực tiếp
engine.say(text)
engine.runAndWait()
