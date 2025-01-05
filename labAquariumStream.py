import cv2
from ultralytics import YOLO
import subprocess as sp

model = YOLO('best.pt')
cap = cv2.VideoCapture("rtsp://admin:admin123456@140.117.168.161:554/Streaming/Channels/sub")

command = [
    'ffmpeg',
    '-y',
    '-f', 'rawvideo',
    '-vcodec', 'rawvideo',
    '-s','640x480',
    '-pix_fmt', 'bgr24',
    '-r','15',
    '-i','-',
    '-c:v', 'libx264',
    '-preset','ultrafast',
    '-tune','zerolatency',
    '-pix_fmt','yuv420p',
    '-flvflags','no_duration_filesize',
    '-f','flv','rtmp://140.117.172.18:8003/live/2'
]

ffmpeg_process = sp.Popen(command, stdin=sp.PIPE)

while cap.isOpened():

    ret, frame = cap.read()
    
    if ret:

        results = model(frame)
        annotated_frame = results[0].plot()
        ffmpeg_process.stdin.write(annotated_frame.tobytes())
        
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    else:
        break

ffmpeg_process.stdin.close()
ffmpeg_process.wait()
cap.release()

