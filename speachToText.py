import asyncio
import edge_tts
import sys
import json
import io
from playsound import playsound  # Thư viện phát âm thanh

# Danh sách giọng đọc
VOICES = [
    'en-AU-NatashaNeural', 'en-AU-WilliamNeural', 
    'en-CA-ClaraNeural', 'en-CA-LiamNeural', 
    'en-GB-LibbyNeural', 'en-GB-MaisieNeural',
    'en-US-AriaNeural', 'en-US-JasonNeural',  
    'en-IN-NeerjaNeural', 'en-IN-RaviNeural',
    'vi-VN-HoaiMyNeural', 'vi-VN-NamMinhNeural'
]

# Lấy tham số từ dòng lệnh
text_to_read = sys.argv[1]  # Văn bản cần đọc
voice_index = int(sys.argv[2])  # Chỉ mục giọng đọc

# Giọng đọc dựa trên chỉ mục
VOICE = VOICES[voice_index]

# Hàm chính async
async def amain():
    try:
        # Tạo đối tượng Communicate
        communicate = edge_tts.Communicate(text_to_read, VOICE)
        
        # Sử dụng BytesIO để lưu trữ dữ liệu âm thanh vào bộ nhớ
        audio_stream = io.BytesIO()
        async for chunk in communicate.stream():
            if "data" in chunk:
                audio_stream.write(chunk["data"])
        
        # Đặt con trỏ về đầu để đọc dữ liệu
        audio_stream.seek(0)

        # Lưu âm thanh vào file tạm (ví dụ: "output.mp3")
        with open("output.mp3", "wb") as f:
            f.write(audio_stream.read())
        
        # Phát âm thanh từ file đã lưu
        playsound("output.mp3")
    except Exception as e:
        return json.dumps({"status": "error", "message": str(e)})

# Thực thi vòng lặp sự kiện asyncio
if __name__ == "__main__":
    loop = asyncio.get_event_loop_policy().get_event_loop()
    try:
        # Gọi hàm async
        loop.run_until_complete(amain())
    except Exception as e:
        print(json.dumps({"status": "error", "message": str(e)}))
    finally:
        loop.close()
