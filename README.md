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

try these in order from `C:\Game`:

```bat
python -m http.server 8000
```

If `python` is also not recognized, Python is either not installed or not on your PATH.
Install Python from [python.org](https://www.python.org/downloads/windows/) and check **Add python.exe to PATH** during setup, then reopen CMD and run:

```bat
python -m http.server 8000
```

## Controls

- **Left paddle (blue):** `W` / `S`
- **Right paddle (green):** `ArrowUp` / `ArrowDown`
- **Serve:** `Space`
- **Toggle AI opponent:** click **Enable AI Opponent**
- **Reset round:** click **Reset Round**
