
function loadPage() {
  var diagnosticDiv = document.getElementById('diagnostics-div');
  var interfacesDiv = document.getElementById('interfaces-div');
  var loadSoftwareDiv = document.getElementById('load-software-div');

  diagnosticDiv.style.display = 'block';

  var diagnosticButton = document.getElementById('diagnostics-nav-button');
  var interfacesButton = document.getElementById('interfaces-nav-button');
  var loadSoftwareButton = document.getElementById('load-software-nav-button');

  diagnosticButton.onclick = function() {
    diagnosticDiv.style.display = 'block';
    interfacesDiv.style.display = 'none';
    loadSoftwareDiv.style.display = 'none';
  }

  interfacesButton.onclick = function() {
    diagnosticDiv.style.display = 'none';
    interfacesDiv.style.display = 'block';
    loadSoftwareDiv.style.display = 'none';
  }

  loadSoftwareButton.onclick = function() {
    diagnosticDiv.style.display = 'none';
    interfacesDiv.style.display = 'none';
    loadSoftwareDiv.style.display = 'block';
  }

  populateCOMPorts();
}


var button = document.getElementById('flashButton');
button.onclick = async function() {

  populateCOMPorts().then((port) => {
    console.log("Port received", port);
    port = "COM7"
    if (!port) {
      alert('No COM port selected');
      return;
    } else {
      file = document.getElementById('binaryForUpload').files[0];
      console.log("file", file);
      if (!file) {
        alert('No file selected');
        return;
      }
    }
    const formData = new FormData();
    formData.append('binaryForUpload', file);
    formData.append('comPort', port);

    fetch('/flash', {
      method: 'POST',
      body: formData
    })
    
  });
}

async function populateCOMPorts() {
  try {
      const ports = await navigator.serial.getPorts();
      console.log("Ports", ports);
      const comPortDropdown = document.getElementById('comPort');

      // Clear existing options
      comPortDropdown.innerHTML = '';

      // Add each port as an option
      ports.forEach(port => {
          const option = document.createElement('option');
          option.value = port.deviceName;
          option.text = port.deviceName;
          comPortDropdown.appendChild(option);
      });
  } catch (error) {
      console.error('Error getting COM ports:', error);
  }
}

loadPage();