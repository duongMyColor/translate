import speech_recognition as sr

def speak_to_text():
    recognizer = sr.Recognizer()

    # Sử dụng microphone làm nguồn âm thanh
    with sr.Microphone() as source:
        # print("Adjusting for ambient noise... Please wait.")
        # recognizer.adjust_for_ambient_noise(source, duration=0.5)  # Giảm tiếng ồn môi trường nhanh chóng
        
        print("Listening...")
        try:
                # Lắng nghe âm thanh và nhận diện giọng nói
                audio = recognizer.listen(source)  # Giới hạn thời gian ghi âm

                # Chuyển âm thanh thành văn bản
                text = recognizer.recognize_google(audio, language='en-US')
                print(text)
        
        except sr.UnknownValueError:
            print(" ")
        except sr.RequestError as e:
            print(f"Could not request results from Google Speech Recognition service; {e}")
        except Exception as e:
            print(f"An error occurred: {e}")

if __name__ == "__main__":
    speak_to_text()
