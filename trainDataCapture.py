import cv2

video_path = "http://140.117.172.18:8088/0.m3u8"
cap = cv2.VideoCapture(video_path)
i = 0

while cap.isOpened():

    success, frame = cap.read()
    if success:
        if i%60 == 0:
            cv2.imwrite(str(i)+'.jpg', frame)
            i+=1
        i+=1
    else:
        break

cap.release()
cv2.destroyAllWindows()
