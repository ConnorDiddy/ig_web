from flask import Flask, render_template, request
import subprocess

# Set up the server
app = Flask(__name__)


# Specify the folder where uploaded files will be saved
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def send_ymodem(com_port, file):
    
    # Save the file to the specified folder
    save_path = f"{app.config['UPLOAD_FOLDER']}/{file.filename}"
    file.save(save_path)

    command = f"sy.exe {com_port} {save_path}"
    print("Command:", command)

    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    
    print(result.stdout)

@app.route("/")
def hello_world():
    return render_template("index.html")

@app.route("/flash", methods=["POST"])
def flash():
    uploaded_file = request.files['binaryForUpload']
    if not uploaded_file:
        return f"Error: File not found: f{uploaded_file}"
    
    com_port = request.form["comPort"]
    
    send_ymodem(com_port, uploaded_file)
    return "index.html"

# Run the server
app.run(debug=True)