from flask import Flask, render_template, request
#from flask_socketio import SocketIO
import subprocess
import os
import time

# Set up the server
app = Flask(__name__)

# Create 'uploads' folder if doesn't exist
if not os.path.exists('uploads'):
    os.makedirs('uploads')

# Specify the folder where uploaded files will be saved
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def send_ymodem(com_port, file):
    
    # Save the file to the specified folder
    save_path = f"{app.config['UPLOAD_FOLDER']}/{file.filename}"
    file.save(save_path)

    command = f"sy.exe {com_port} {save_path}"
    print("Command:", command)
    
    # simulate ymodem file send
    #time.sleep(5)

    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    
    print(result.stdout)
    
    #TODO - check for errors
    return True

@app.route("/")
def hello_world():
    return render_template("index.html")

@app.route("/flash", methods=["POST"])
def flash():
    uploaded_file = request.files['binaryForUpload']
    if not uploaded_file:
        return f"Error: File not found: f{uploaded_file}"
    
    com_port = request.form["comPort"]
    
    result = send_ymodem(com_port, uploaded_file)
    if result:
        return "File sent successfully", 200
    else:
        return "Error sending file", 500
    
# Run the server
app.run(debug=True)