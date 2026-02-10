# Ping Pong Duel

## Run locally

1. Start a static server from the repo root (make sure your terminal is in the folder that contains `index.html`):

   ```bash
   # macOS/Linux
   python -m http.server 8000

   # Windows (PowerShell or CMD)
   py -m http.server 8000
   ```

2. Open the game in your browser:

   ```
   http://127.0.0.1:8000/
   ```

## Windows troubleshooting

If you see:

```txt
'py' is not recognized as an internal or external command
```

try this first from `C:\Game`:

```bat
python -m http.server 8000
```

If `python` is also not recognized, Python is either not installed or not on your PATH.

### Enable `python.exe` in PATH (Windows 10/11)

1. Install Python from [python.org](https://www.python.org/downloads/windows/).
2. Run the installer and check **Add python.exe to PATH** on the first install screen.
3. Complete the install, then close and reopen Command Prompt.
4. Verify with:

   ```bat
   python --version
   where python
   ```

If Python is already installed but not on PATH:

1. Open **Start** → search **Environment Variables** → open **Edit the system environment variables**.
2. Click **Environment Variables...**.
3. Under **User variables**, select `Path` → **Edit**.
4. Add these paths (adjust version/user name as needed):

   ```txt
   C:\Users\<YourUser>\AppData\Local\Programs\Python\Python3x\
   C:\Users\<YourUser>\AppData\Local\Programs\Python\Python3x\Scripts\
   ```

5. Click **OK** on all dialogs.
6. Close and reopen Command Prompt, then run:

   ```bat
   python --version
   python -m http.server 8000
   ```

## Controls

- **Left paddle (blue):** `W` / `S`
- **Right paddle (green):** `ArrowUp` / `ArrowDown`
- **Serve:** `Space`
- **Toggle AI opponent:** click **Enable AI Opponent**
- **Reset round:** click **Reset Round**
