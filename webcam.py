#!/usr/bin/env python3
# coding: UTF-8
import cv2

# Open a connection to the webcam (you might need to change the index)
# 0 is usually the built-in webcam, 1 is the first external camera, and so on
cap = cv2.VideoCapture("/dev/video0")

if not cap.isOpened():
    print("Error: Could not open video device.")
    exit()

# Define the codec and create a VideoWriter object to save the video
fourcc = cv2.VideoWriter_fourcc(*'XVID')  # You can change the codec as needed
out = cv2.VideoWriter('output.MOV', fourcc, 20.0, (640, 480))  # 'output.avi' is the output file name

while True:
    # Read a frame from the webcam
    ret, frame = cap.read()

    if not ret:
        print("Error: Could not read a frame.")
        break

    # Write the frame to the output video
    out.write(frame)

    # Display the frame in a window
    cv2.imshow('Webcam', frame)

    # Press 'q' to stop recording and exit the application
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video writer, webcam, and close the OpenCV window
out.release()
cap.release()
cv2.destroyAllWindows()