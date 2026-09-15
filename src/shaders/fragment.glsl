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

void main() {
  vec2 center = gl_PointCoord - 0.5;
  float dist = length(center);

  float rand1 = fract(sin(vSeed * 12.9898) * 43758.5453);
  float rand2 = fract(sin(vSeed * 78.233) * 43758.5453);

  float alpha = smoothstep(0.5, 0.05, dist);

  vec3 col = uColor1;
  col += col * (0.3 * vFresnel);

  float mouseGlow = 1.0 - smoothstep(0.0, 0.65, vDistToMouse);
  col += col * mouseGlow * 0.4;

  float breathe = sin(uTime * 0.5 + vSeed * 6.28) * 0.15 + 0.85;
  alpha *= breathe;

  alpha = clamp(alpha, 0.0, 1.0);
  if (alpha < 0.01) discard;

  gl_FragColor = vec4(col, alpha);
}
