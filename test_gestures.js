const listeners = {
  start: [],
  end: []
};

// Mock wx environment
globalThis.wx = {
  onTouchStart: (cb) => listeners.start.push(cb),
  onTouchEnd: (cb) => listeners.end.push(cb),
  createImage: () => {}
};

const adapter = require('./js/libs/adapter.js');

// Test helper
function simulateSwipe(startX, startY, endX, endY) {
  // Trigger start
  listeners.start.forEach(cb => cb({
    touches: [{ clientX: startX, clientY: startY }]
  }));
  // Trigger end
  listeners.end.forEach(cb => cb({
    changedTouches: [{ clientX: endX, clientY: endY }]
  }));
}

// Register listeners
adapter.onTouchUp(() => console.log('PASS: Detected UP'));
adapter.onTouchDown(() => console.log('PASS: Detected DOWN'));
adapter.onTouchLeft(() => console.log('PASS: Detected LEFT'));
adapter.onTouchRight(() => console.log('PASS: Detected RIGHT'));

console.log('--- Testing UP (start: 100,100, end: 100, 40) ---');
simulateSwipe(100, 100, 100, 40); // dy = -60

console.log('--- Testing DOWN (start: 100,100, end: 100, 160) ---');
simulateSwipe(100, 100, 100, 160); // dy = 60

console.log('--- Testing LEFT (start: 100,100, end: 40, 100) ---');
simulateSwipe(100, 100, 40, 100); // dx = -60

console.log('--- Testing RIGHT (start: 100,100, end: 160, 100) ---');
simulateSwipe(100, 100, 160, 100); // dx = 60

console.log('--- Testing Small Movement (Threshold Check) ---');
simulateSwipe(100, 100, 100, 90); // dy = -10 (Should not trigger UP)
