---
type: note
title: Recommended Profile Types for Kiosk iPads
tags: [mdm, mosyle, ipad, kiosk]
---

## Requirements
- iPads must be **supervised** (automatic when enrolled via ABM)
- Apps should be deployed silently via Mosyle App Management

---

## Essential Profiles

### Single App Mode / Guided Access
- Locks the iPad to one app — user cannot exit
- Configure under **Management > Profiles > Add New Profile > Single App Mode**
- Specify the bundle ID of your kiosk app
- Single App Mode is more secure than Guided Access — Guided Access uses a PIN that can be guessed

### Restrictions
- Disable: App Store, Safari, AirDrop, Siri, screen recording, FaceTime, iMessage
- Prevent: app installation/deletion, changing wallpaper, account modifications
- Disable notifications (all banners/alerts) so they don't interrupt the kiosk experience
- Disable Control Center access from lock screen and within apps — otherwise users can toggle Wi-Fi/Bluetooth
- Disable Bluetooth if no peripherals are needed — reduces attack surface
- Enable USB Restricted Mode to block data extraction via Lightning/USB-C

### Software Updates
- Defer OS updates via Mosyle — prevent devices from restarting unexpectedly during business hours
- Push updates on a controlled schedule during off-hours

### Passcode
- Set a strong alphanumeric passcode for admin access
- Or disable passcode entirely if the kiosk is in a public/secured enclosure

### Wi-Fi
- Push network credentials so iPads connect automatically on boot
- No manual network setup required by the end user

---

## Recommended Profiles

### Autonomous Single App Mode (ASAM)
- More flexible than Guided Access — the app itself triggers kiosk mode
- Requires the kiosk app to support ASAM
- App can exit kiosk mode programmatically (e.g. for admin access)

### Auto App Install
- Push your kiosk app silently via Mosyle App Management
- App installs automatically on enrollment, no user interaction needed

### Home Screen Layout
- Control exactly which apps appear and their positions
- Prevents clutter and accidental access to other apps

### Wallpaper
- Set branded lock screen and home screen wallpaper
- Reinforces kiosk identity and looks professional

---

## Optional Profiles

### Web Content Filter
- If the kiosk runs a web app, whitelist only your specific URL
- Blocks all other web access

### AirPlay / AirPrint
- Add only if kiosks need to mirror screens or print
- Leave out if not needed to reduce attack surface

### Certificate
- Required if your kiosk app or internal site uses a private/internal SSL certificate

---

## Notes

- Deploy profiles to a dedicated **Kiosk iPads** device group for easy management
- Use **Autonomous Single App Mode** over Guided Access when possible — it's more reliable at scale and more secure
- Test all profiles on one device before pushing to the full group
- Mosyle Business documentation and support: [business.mosyle.com](https://business.mosyle.com)
