FROM python:latest
ADD test.py .
ADD best.pt .
RUN apt-get update && apt-get install ffmpeg  libsm6 libxext6 -y
RUN pip install opencv-python-headless ultralytics
CMD ["python3","test.py"]