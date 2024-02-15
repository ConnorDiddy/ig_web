// Load the page and set up event listeners
var diagnosticDiv = document.getElementById("diagnostics-div");
var interfacesDiv = document.getElementById("interfaces-div");
var loadSoftwareDiv = document.getElementById("load-software-div");

var diagnosticButton = document.getElementById("diagnostics-nav-button");
var interfacesButton = document.getElementById("interfaces-nav-button");
var loadSoftwareButton = document.getElementById("load-software-nav-button");

var hideLogButton = document.getElementById("hide-log-button");
var showLogButton = document.getElementById("show-log-button");

function loadPage() {

  showLog();
  showDiagnosticsPage();
  populateCOMPorts();
}

function showDiagnosticsPage() {
  diagnosticDiv.style.display = "block";
  interfacesDiv.style.display = "none";
  loadSoftwareDiv.style.display = "none";
  clearAllButtons();
  diagnosticButton.style.backgroundColor = "#7fc07f";
}

function showInterfacesPage() {
  diagnosticDiv.style.display = "none";
  interfacesDiv.style.display = "block";
  loadSoftwareDiv.style.display = "none";
  clearAllButtons();
  interfacesButton.style.backgroundColor = "#7fc07f";
}

function showLoadSoftwarePage() {
  diagnosticDiv.style.display = "none";
  interfacesDiv.style.display = "none";
  loadSoftwareDiv.style.display = "block";
  clearAllButtons();
  loadSoftwareButton.style.backgroundColor = "#7fc07f";
}

function clearAllButtons() {
  var diagnosticButton = document.getElementById("diagnostics-nav-button");
  var interfacesButton = document.getElementById("interfaces-nav-button");
  var loadSoftwareButton = document.getElementById("load-software-nav-button");

  diagnosticButton.style.backgroundColor = "rgb(79, 79, 79)";
  interfacesButton.style.backgroundColor = "rgb(79, 79, 79)";
  loadSoftwareButton.style.backgroundColor = "rgb(79, 79, 79)";
}

async function sendFileYmodem() {

  // Get the selected COM port
  port = document.getElementById("comPort").value;
  console.log("Port selected", port);

  port = "COM7";
  if (!port) {
    alert("No COM port selected");
    return;
  } else {
    file = document.getElementById("binaryForUpload").files[0];
    console.log("file", file);
    if (!file) {
      alert("No file selected");
      return;
    }
  }
  const formData = new FormData();
  formData.append("binaryForUpload", file);
  formData.append("comPort", port);

  showLoadingSpinner();
  await fetch("/flash", {
    method: "POST",
    body: formData,
  }).then((response) => {
    hideLoadingSpinner();
    console.log("Response", response);
    if (response.status === 200) {
      showNotification("File uploaded successfully.");
    } else {
      showNotification("Error uploading file.");
    }
  });
};

function showLoadingSpinner() {
  var loadingSpinner = document.getElementById("loading-container");
  loadingSpinner.style.display = "flex";
}

function hideLoadingSpinner() {
  var loadingSpinner = document.getElementById("loading-container");
  loadingSpinner.style.display = "none";
}

function showNotification(message) {
  var notificationDiv = document.getElementById("notification");
  notificationDiv.style.display = "flex";

  var notificationText = document.getElementById("notification-text");
  notificationText.innerHTML = message;
}

function hideNotification() {
  var notificationDiv = document.getElementById("notification");
  notificationDiv.style.display = "none";

  var notificationText = document.getElementById("notification-text");
  notificationText.innerHTML = "";
}

function hideLog() {
  hideLogButton.style.display = "none";
  showLogButton.style.display = "block";

  var logDiv = document.getElementById("log-div");
  logDiv.style.display = "none";
}

function showLog() {
  showLogButton.style.display = "none";
  hideLogButton.style.display = "block";

  var logDiv = document.getElementById("log-div");
  logDiv.style.display = "block";
}

async function populateCOMPorts() {
  try {
    const ports = await navigator.serial.getPorts();
    console.log("Ports", ports);
    const comPortDropdown = document.getElementById("comPort");

    // Clear existing options
    comPortDropdown.innerHTML = "";

    // Add each port as an option
    ports.forEach((port) => {
      const option = document.createElement("option");
      option.value = port.deviceName;
      option.text = port.deviceName;
      comPortDropdown.appendChild(option);
    });
  } catch (error) {
    console.error("Error getting COM ports:", error);
  }
}

loadPage();