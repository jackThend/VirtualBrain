uniform float uProgress;
uniform float uTime;
uniform vec2 uMouse;
uniform float uHoverIntensity;
uniform float uRepelStrength;
uniform vec2 uRepelCenter;
uniform vec2 uRepelSize;

attribute vec3 aPosChaos;
attribute vec3 aPosBulb;
attribute vec3 aPosGlobe;
attribute vec3 aNormBrain;
attribute vec3 aNormBulb;
attribute vec3 aNormGlobe;
attribute float aSeed;

varying vec3 vNormal;
varying vec3 vViewDir;
varying float vStage;
varying float vFresnel;
varying float vSeed;
varying float vDistToMouse;
varying float vMorphBlend;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

vec3 curlNoise3D(vec3 p) {
  float e = 0.01;
  float n1 = snoise(p + vec3(0, e, 0));
  float n2 = snoise(p - vec3(0, e, 0));
  float n3 = snoise(p + vec3(e, 0, 0));
  float n4 = snoise(p - vec3(e, 0, 0));
  float n5 = snoise(p + vec3(0, 0, e));
  float n6 = snoise(p - vec3(0, 0, e));
  return vec3(
    (n1 - n2) / (2.0 * e),
    (n3 - n4) / (2.0 * e),
    (n5 - n6) / (2.0 * e)
  );
}

void main() {
  float progress = uProgress;
  float stage = floor(progress);
  float fractP = fract(progress);

  vec3 posA, posB, normA, normB;

  if (stage < 0.5) {
    posA = position;
    posB = aPosChaos;
    normA = aNormBrain;
    normB = aNormBrain;
  } else if (stage < 1.5) {
    posA = aPosChaos;
    posB = aPosBulb;
    normA = aNormBulb;
    normB = aNormBulb;
  } else if (stage < 2.5) {
    posA = aPosBulb;
    posB = aPosGlobe;
    normA = aNormBulb;
    normB = aNormGlobe;
  } else {
    posA = aPosGlobe;
    posB = aPosGlobe;
    normA = aNormGlobe;
    normB = aNormGlobe;
  }

  float brainWeight = (stage < 0.5) ? (1.0 - smoothstep(0.0, 1.0, fractP)) : 0.0;
  float breathe = 1.0 + 0.022 * sin(uTime * 1.4) * brainWeight;
  posA *= breathe;

  float swirl = sin(fractP * 3.14159265) * 0.6;
  vec3 noiseOffset = curlNoise3D(position * 0.8 + uTime * 0.1) * swirl;
  vec3 morphedPos = mix(posA, posB, smoothstep(0.0, 1.0, fractP)) + noiseOffset;

  vNormal = normalize(mix(normA, normB, smoothstep(0.0, 1.0, fractP)));
  vStage = stage;
  vSeed = aSeed;
  vMorphBlend = smoothstep(0.0, 1.0, fractP);

  vec4 mvPosition = modelViewMatrix * vec4(morphedPos, 1.0);

  vViewDir = normalize(-mvPosition.xyz);

  vec2 haloDelta = mvPosition.xy - uRepelCenter;
  vec2 haloQ = haloDelta / max(uRepelSize, vec2(0.001));
  float haloInside = 1.0 - smoothstep(0.7, 1.0, length(haloQ));
  if (haloInside > 0.001 && uRepelStrength > 0.001) {
    vec2 pushDir = haloDelta / max(length(haloDelta), 0.0001);
    mvPosition.xy += pushDir * haloInside * uRepelStrength * 0.55;
    mvPosition.z -= haloInside * uRepelStrength * 0.45;
  }

  vec4 worldPos = modelMatrix * vec4(morphedPos, 1.0);
  vec2 mouseWorld = uMouse;
  float dist = length(worldPos.xy - mouseWorld);
  vDistToMouse = dist;

  if (uHoverIntensity > 0.01 && dist < 0.65) {
    float lift = (1.0 - dist / 0.65) * uHoverIntensity * 0.22;
    mvPosition.xyz += vNormal * lift;
  }

  float fresnel = pow(1.0 - clamp(dot(vNormal, vViewDir), 0.0, 1.0), 2.0);
  vFresnel = fresnel;

  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = max(1.5, 3.0 - mvPosition.z * 0.3);
}
