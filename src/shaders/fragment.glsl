uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uProgress;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vViewDir;
varying float vStage;
varying float vFresnel;
varying float vSeed;
varying float vDistToMouse;
varying float vMorphBlend;

float sdTriangle(vec2 p) {
  const float k = 1.7320508;
  p.x = abs(p.x) - 0.28;
  p.y = p.y + 0.28 / k;
  if (p.x + k * p.y > 0.0) p = vec2(p.x - k * p.y, -k * p.x - p.y) / 2.0;
  p.x -= clamp(p.x, -0.56, 0.0);
  return -length(p) * sign(p.y);
}

void main() {
  vec2 center = gl_PointCoord - 0.5;
  float dist = length(center);

  float pick = fract(sin(vSeed * 91.7) * 43758.5453);
  vec3 champagne = vec3(0.922, 0.863, 0.722);

  vec3 base = mix(uColor1, uColor2, fract(vSeed * 7.31));
  base = mix(base, uColor3, step(0.72, fract(vSeed * 3.77)) * 0.65);
  base = mix(base, champagne, vFresnel * 0.45);

  vec3 col = base;
  col += col * (0.35 * vFresnel);

  float alpha = 0.0;
  if (pick < 0.60) {
    float sd = sdTriangle(center);
    float border = 1.0 - smoothstep(0.0, 0.035, abs(sd));
    float fill = 1.0 - smoothstep(-0.02, 0.0, sd);
    alpha = border * 0.95;
    col = mix(col, champagne, fill * 0.15);
    if (dist > 0.5) discard;
  } else if (pick < 0.85) {
    float sd = sdTriangle(center);
    float fill = 1.0 - smoothstep(-0.03, 0.02, sd);
    alpha = fill * 0.55;
    if (dist > 0.5) discard;
  } else {
    float core = 1.0 - smoothstep(0.0, 0.1, dist);
    float crossX = (1.0 - smoothstep(0.0, 0.025, abs(center.y))) * (1.0 - smoothstep(0.0, 0.3, abs(center.x)));
    float crossY = (1.0 - smoothstep(0.0, 0.025, abs(center.x))) * (1.0 - smoothstep(0.0, 0.3, abs(center.y)));
    alpha = clamp(core + (crossX + crossY) * 0.6, 0.0, 1.0);
    col = mix(col, champagne, 0.7);
  }

  float mouseGlow = 1.0 - smoothstep(0.0, 0.65, vDistToMouse);
  col += col * mouseGlow * 0.4;

  float breathe = sin(uTime * 0.5 + vSeed * 6.28) * 0.15 + 0.85;
  alpha *= breathe;

  alpha = clamp(alpha, 0.0, 1.0);
  if (alpha < 0.01) discard;

  gl_FragColor = vec4(col, alpha);
}
