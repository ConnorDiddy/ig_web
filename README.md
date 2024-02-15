# Flask App for Browser Interaction with TI MCU

This Flask application provides a user interface for interacting with a Texas Instruments Microcontroller Unit (TI MCU) over a serial port connection.

## Purpose

The purpose of this program is to facilitate browser-based communication with a TI MCU, enabling users to send commands, receive data, and monitor the MCU's responses via a web interface. It also gives the user the ability to flash software to the board.

## Packaging into a single executable file

This entire browser app can easily be converted into one executable, where it can be run without any dependencies.
To create this executable file, run this command from the root directory of the project

```
pyinstaller -w -F --add-data=templates:templates --add-data=static:static main.py
```

## Project layout

| Directory      | Description |
| ----------- | ----------- |
| ```templates```      | Stores all HTML files       |
| ```uploads```   | Stores binary files uploaded from web        |
| ```static``` | Stores all Javascript and CSS files |
| ```dist``` | Used by pyinstaller to store the generated executables |
| ```build``` | Used by Pyinstaller to store information about the packaging process |

## Prerequisites

Make sure you have the following installed:

- Python
- Pip (Python package installer)
- Flask