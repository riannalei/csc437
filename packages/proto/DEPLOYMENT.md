# Lab 6 - Deployment Guide

## Prerequisites
- Your CalPoly email address (e.g., `youremail`)
- Initial password provided by instructor
- Your VPS: `youremail-host.csse.dev`
- Your website will be: `https://youremail.csse.dev/`

## Step-by-Step Deployment Instructions

### 1. First Time Login
```bash
# Replace 'youremail' with your actual CalPoly email
ssh youremail@youremail-host.csse.dev
```

### 2. Change Your Password (First time only)
```bash
passwd
# Enter old password, then new password twice
```

### 3. Set Up SSH Keys (Recommended - Optional)
Follow: https://www.linode.com/docs/guides/use-public-key-authentication-with-ssh/

### 4. Update Package Manager
```bash
sudo apt update
```

### 5. Install Node.js 20
```bash
# Download setup script
curl -sL https://deb.nodesource.com/setup_20.x -o /tmp/nodesource_setup.sh

# Run setup script
sudo bash /tmp/nodesource_setup.sh

# Install Node.js
sudo apt-get install nodejs -y

# Verify installation
node -v   # Should show v20.x.x
npm -v    # Should show npm version
```

### 6. Clone Your Repository
```bash
# Get your repo URL from GitHub (green Code button)
# Use HTTPS URL if repo is public
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Navigate to project
cd YOUR-REPO-NAME
```

### 7. Install Dependencies
```bash
npm install
```

### 8. Start Server with nohup
```bash
# Start server in background (keeps running after logout)
nohup npm -w proto start &

# Wait a few seconds for server to start
sleep 3

# Check if it's running
curl http://localhost:3000
```

### 9. Log Out
```bash
exit
```

### 10. Test Your Deployment
Open in browser:
```
https://youremail.csse.dev/
```

## Managing Your Server

### Check if server is running
```bash
# SSH back in
ssh youremail@youremail-host.csse.dev

# Check for running node processes
ps aux | grep node
```

### Stop the server
```bash
# Find the process ID (PID)
ps aux | grep node

# Kill the process (replace XXXXX with actual PID)
kill XXXXX
```

### Restart the server
```bash
cd YOUR-REPO-NAME
nohup npm -w proto start &
```

### Update your deployed site
```bash
# SSH into server
ssh youremail@youremail-host.csse.dev

# Navigate to repo
cd YOUR-REPO-NAME

# Stop server (find PID with ps aux | grep node)
kill XXXXX

# Pull latest changes
git pull origin main

# Reinstall dependencies if package.json changed
npm install

# Restart server
nohup npm -w proto start &

# Log out
exit
```

## Troubleshooting

### 502 Bad Gateway
- Your server is down
- SSH in and restart it with nohup

### Connection Refused
- Check if node process is running: `ps aux | grep node`
- Check if port 3000 is in use: `lsof -i :3000`

### Changes Not Showing
- Did you `git push` from local?
- Did you `git pull` on server?
- Try hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)

## Important Notes

✅ **Port 3000** is now configured in package.json  
✅ Always use **nohup** to keep server running  
✅ Your site uses **HTTPS** automatically (handled by nginx)  
✅ Access via `https://youremail.csse.dev/` (not the -host URL)

## Quick Reference

| Action | Command |
|--------|---------|
| Login | `ssh youremail@youremail-host.csse.dev` |
| Start server | `nohup npm -w proto start &` |
| Check processes | `ps aux | grep node` |
| Stop server | `kill <PID>` |
| Update code | `git pull origin main` |
| Log out | `exit` |

---

**Your site will be live at:** `https://youremail.csse.dev/`

Replace `youremail` with your actual CalPoly email address throughout!

