import { Suspense } from "react";
import Names from "./names";

export default function Home() {
  return (
    <main>
      <h2>Names</h2>
      <Suspense fallback={<p>Loading…</p>}>
        <Names />
      </Suspense>
    </main>
  );
}
