import asyncio
import edge_tts

# Danh sách giọng đọc
VOICES = [
    'en-AU-NatashaNeural', 'en-AU-WilliamNeural', 
    'en-CA-ClaraNeural', 'en-CA-LiamNeural', 
    'en-GB-LibbyNeural', 'en-GB-MaisieNeural',
    'en-US-AriaNeural', 'en-US-JasonNeural',  # Thêm giọng từ khu vực khác
    'en-IN-NeerjaNeural', 'en-IN-RaviNeural'  # Giọng cho khu vực Ấn Độ
]

# Văn bản cần đọc và giọng nói được chọn
TEXT = "Hello! Don't forget to like the video if you find it helpful, thank you"
VOICE = VOICES[0]  # Thay đổi chỉ mục nếu bạn muốn chọn giọng khác
OUTPUT_FILE = "test.mp3"

# Hàm chính async
async def amain() -> None:
    communicate = edge_tts.Communicate(TEXT, VOICE)
    await communicate.save(OUTPUT_FILE)

# Thực thi vòng lặp sự kiện asyncio
if __name__ == "__main__":
    loop = asyncio.get_event_loop_policy().get_event_loop()
    try:
        loop.run_until_complete(amain())
    finally:
        loop.close()
