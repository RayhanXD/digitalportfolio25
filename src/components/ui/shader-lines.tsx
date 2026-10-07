"use client";

import { type Ref, useEffect, useImperativeHandle, useRef } from "react";
import * as THREE from "three";

/** Imperative controls so a page can steer the signal. All changes ease in over a few frames. */
export type ShaderLinesHandle = {
  /** Move the rings' origin, in CSS px relative to the canvas container's top-left */
  setCenter: (x: number, y: number) => void;
  /** Return the origin to the middle of the container */
  resetCenter: () => void;
  /** Throw the rings outward faster for a moment (adds up; decays on its own) */
  pulse: (amount: number) => void;
  /** Brightness multiplier (1 = default) */
  setGain: (gain: number) => void;
  /** Colour multiplier per channel (1,1,1 = default) */
  setTint: (r: number, g: number, b: number) => void;
};

type ShaderAnimationProps = {
  className?: string;
  ref?: Ref<ShaderLinesHandle>;
};

export function ShaderAnimation({ className, ref }: ShaderAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Targets written by the handle; the render loop eases the live uniforms toward them
  const targets = useRef({
    center: null as { x: number; y: number } | null,
    boost: 0,
    gain: 1,
    tint: [1, 1, 1] as [number, number, number],
  });

  useImperativeHandle(
    ref,
    () => ({
      setCenter: (x, y) => {
        targets.current.center = { x, y };
      },
      resetCenter: () => {
        targets.current.center = null;
      },
      pulse: (amount) => {
        targets.current.boost = Math.min(targets.current.boost + amount, 40);
      },
      setGain: (gain) => {
        targets.current.gain = gain;
      },
      setTint: (r, g, b) => {
        targets.current.tint = [r, g, b];
      },
    }),
    []
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
      center: { value: new THREE.Vector2() },
      gain: { value: 1.0 },
      tint: { value: new THREE.Vector3(1, 1, 1) },
    };

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform vec2 center;
      uniform float time;
      uniform float gain;
      uniform vec3 tint;

      float random (in float x) {
          return fract(sin(x)*1e4);
      }
      float random (vec2 st) {
          return fract(sin(dot(st.xy,
                               vec2(12.9898,78.233)))*
              43758.5453123);
      }

      void main(void) {
        vec2 uv = ((gl_FragCoord.xy - center) * 2.0) / min(resolution.x, resolution.y);

        vec2 fMosaicScal = vec2(4.0, 2.0);
        vec2 vScreenSize = vec2(256,256);
        uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
        uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);

        float t = time*0.06+random(uv.x)*0.4;
        float lineWidth = 0.0008;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*1.0 - length(uv));
          }
        }

        gl_FragColor = vec4(vec3(color[2],color[1],color[0]) * tint * gain, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.appendChild(canvas);

    let animationId = 0;
    let cssHeight = 1;

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      cssHeight = h;
      renderer.setSize(w, h, false);
      uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height);
      if (!targets.current.center) {
        uniforms.center.value.set(renderer.domElement.width / 2, renderer.domElement.height / 2);
      }
    };

    setSize();

    const ro = new ResizeObserver(() => setSize());
    ro.observe(container);
    window.addEventListener("resize", setSize);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = targets.current;
      const dpr = renderer.getPixelRatio();
      const res = uniforms.resolution.value;

      // Ease the origin toward its target (gl_FragCoord is bottom-up, in device px)
      const cx = t.center ? t.center.x * dpr : res.x / 2;
      const cy = t.center ? (cssHeight - t.center.y) * dpr : res.y / 2;
      uniforms.center.value.x += (cx - uniforms.center.value.x) * 0.08;
      uniforms.center.value.y += (cy - uniforms.center.value.y) * 0.08;

      uniforms.gain.value += (t.gain - uniforms.gain.value) * 0.08;
      const tint = uniforms.tint.value;
      tint.x += (t.tint[0] - tint.x) * 0.06;
      tint.y += (t.tint[1] - tint.y) * 0.06;
      tint.z += (t.tint[2] - tint.z) * 0.06;

      t.boost *= 0.92;
      uniforms.time.value += 0.05 * (1 + t.boost);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", setSize);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className ?? "absolute inset-0 h-full w-full"}
    />
  );
}
