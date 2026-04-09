const canvas = document.getElementById('alx');
const ctx = canvas.getContext('2d');

let points = [];
let hearts = [];
let WIDTH = canvas.width = window.innerWidth;
let HEIGHT = canvas.height = window.innerHeight;
const V = 56;
const R = Math.random;
const C = Math.cos;
const TWO_PI = 6.3;

function createHearts() {
  hearts = [];
  for (let i = 0; i < TWO_PI; i += 0.2) 
    hearts.push([
      WIDTH / 2 + 210 * Math.pow(Math.sin(i), 3), 
      HEIGHT / 2 + 13 * -(15 * C(i) - 5 * C(2 * i) - 2 * C(3 * i) - C(4 * i))
    ]);
  
  for (let i = 0; i < TWO_PI; i += 0.4) 
    hearts.push([
      WIDTH / 2 + 150 * Math.pow(Math.sin(i), 3), 
      HEIGHT / 2 + 9 * -(15 * C(i) - 5 * C(2 * i) - 2 * C(3 * i) - C(4 * i))
    ]);
  
  for (let i = 0; i < TWO_PI; i += 0.8) 
    hearts.push([
      WIDTH / 2 + 90 * Math.pow(Math.sin(i), 3), 
      HEIGHT / 2 + 5 * -(15 * C(i) - 5 * C(2 * i) - 2 * C(3 * i) - C(4 * i))
    ]);
}

createHearts();

for (let i = 0; i < V;) {
  let x = R() * WIDTH;
  let y = R() * HEIGHT;
  let H = 0;
  let S = 40 * R() + 60;
  let B = 60 * R() + 20;
  let f = [];
  for (let k = 0; k < V;) {
    f[k++] = {
      x: x,
      y: y,
      X: 0,
      Y: 0,
      R: 1 - k / V + 1,
      S: R() + 1,
      q: ~~(R() * V),
      D: 2 * (i % 2) - 1,
      F: 0.2 * R() + 0.7,
      f: `hsla(${~~H},${~~S}%,${~~B}%,.1)`
    };
  }
  points[i++] = f;
}

function drawPoint(p) {
  ctx.fillStyle = p.f;
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.R, 0, TWO_PI, true);
  ctx.closePath();
  ctx.fill();
}

setInterval(() => {
  ctx.fillStyle = "rgba(3, 1, 26, 0.2)";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  for (let i = V; i--;) {
    let f = points[i];
    let u = f[0];
    let q = hearts[u.q];
    let D = u.x - q[0];
    let E = u.y - q[1];
    let G = Math.sqrt(D * D + E * E);

    if (G < 10) {
      if (R() > 0.95) {
        u.q = ~~(R() * V);
      } else {
        if (R() > 0.99) u.D *= -1;
        u.q += u.D;
        u.q %= V;
        if (u.q < 0) u.q += V;
      }
    }

    u.X += (-D / G) * u.S;
    u.Y += (-E / G) * u.S;
    u.x += u.X;
    u.y += u.Y;
    drawPoint(u);

    u.X *= u.F;
    u.Y *= u.F;

    for (let k = 0; k < V - 1;) {
      let T = f[k], N = f[++k];
      N.x -= 0.7 * (N.x - T.x);
      N.y -= 0.7 * (N.y - T.y);
      drawPoint(N);
    }
  }
}, 25);

window.addEventListener('resize', () => {
  WIDTH = canvas.width = window.innerWidth;
  HEIGHT = canvas.height = window.innerHeight;
  createHearts();
});
