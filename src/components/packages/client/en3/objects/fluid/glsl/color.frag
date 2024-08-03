precision highp float;
uniform vec3 backgroundColor;
uniform float backgroundOpacity;
uniform vec3 fluidColor;
uniform float fluidOpacity;
uniform float backgroundMixThreshold;
uniform sampler2D velocity;
varying vec2 uv;

void main(){
  vec2 vel = texture2D(velocity, uv).xy;

  float len = length(vel);
  
  vel = vel * 0.5 + 0.5;

  vec4 backgroundColorA = mix(vec4(vec3(0.0,0.0,0.0), backgroundOpacity), vec4(backgroundColor, backgroundOpacity), backgroundMixThreshold);
  vec4 fluidColorA = vec4(fluidColor, fluidOpacity);
  vec4 finalColor = mix(backgroundColorA, fluidColorA, len);

  gl_FragColor = finalColor;
}