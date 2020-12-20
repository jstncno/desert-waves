/* eslint-disable no-undef, no-unused-vars */
const SIZE = 500;
const BABY_POWDER = "#FBF9F5";
const DAVYS_GRAY = "#4A4B4A";
const BOUNDS = 100;
const STROKE_WEIGHT = 3;

const STEP = SIZE / 30;

let lines = [];

function setup() {
  const canvas = createCanvas(SIZE, SIZE);
  const container = document.getElementById("canvas-container");
  canvas.parent(container);
  stroke(DAVYS_GRAY);
  strokeWeight(STROKE_WEIGHT);
  fill(BABY_POWDER);
  createLines();
}

function draw() {
  clear();
  // Put drawings here
  for (let i = 5; i < lines.length; i++) {
    const line = lines[i];
    beginShape();
    const v = line[0];
    curveVertex(v.x, v.y);
    for (let j = 0; j < line.length - 2; j++) {
      const start = line[j];
      const end = line[j + 1];
      const xc = (start.x + start.x) / 2;
      const yc = (end.y + end.y) / 2;
      quadraticVertex(xc, yc, end.x, end.y);
    }
    const u = line[line.length - 1];
    curveVertex(u.x, u.y);
    endShape();
  }
  updateLines();
}

function createLines() {
  lines = [];
  for (let i = STEP; i <= SIZE - STEP; i += STEP) {
    const line = [];
    for (let j = STEP; j <= SIZE + STEP; j += STEP) {
      const distanceToCenter = abs(j - SIZE / 2);
      const variance = max(SIZE / 3 - distanceToCenter, 0);
      const v = max(random((variance / 2) * -1), -BOUNDS);
      const y = map(v, -BOUNDS, 0, i - BOUNDS, i);
      const point = { x: j, y, min: i + v, max: i, t: 0 };
      line.push(point);
    }
    lines.push(line);
  }
}

function updateLines() {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const point = lines[i][j];
      const variance = noise(point.x, point.max, point.t);
      point.t += 0.005;
      point.y = map(variance, 0, 1, point.min, point.max);
    }
  }
}

// This Redraws the Canvas when resized
windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};
