# Metronome Prototype

This is a prototype for electronics Metronome project.  

## Features
- 4 X 7 segment displays
- Start/Stop Button
- Button-Knob
  - turn 
  - click
  - long-click
- Click sound
- 3 Step Types
  - High
  - Low
  - Silent
- Customizable step pattern
- Blinking LED

## Get Started

```bash
npm install
```

```bash
npm run dev
```

## ToDo
- [x] Timer Fix initial step
- [x] Blink LED 
- [ ] Fix Lint
- [ ] Sound Selection
- [ ] Pattern Length Selection State
- [x] Add tempo change event
- [ ] Design
- [ ] Make LongClick intuitive.
- [ ] Save settings
- [ ] Reset Setting
- [ ] Pattern State  
  - [ ] Initial Display after selection should be running with each step
- [ ] Add Credits

## Known Issues

- [x] Strict mode triggers useEffect it SoundPlayer
- [ ] Remove all 'any'
- [x] Timer doesn't stop on exit
- [ ] In pattern state: "_" and " " both for silent step