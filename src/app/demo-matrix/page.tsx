import { Component } from "@/components/ui/rainbow-matrix-shader";

/**
 * Dev preview: window-sized Unicorn Studio matrix (same projectId as SignalMatrixBackground).
 */
export default function DemoMatrixPage() {
  return (
    <div className="fixed inset-0 bg-black">
      <Component />
    </div>
  );
}
