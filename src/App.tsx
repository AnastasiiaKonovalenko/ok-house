import { Outlet, useNavigation } from "react-router-dom";

export default function App() {
  const nav = useNavigation();
  const busy = nav.state !== "idle";

  return (
    <main style={{ padding: 16, height: "100vh", display: "flex", flexDirection: "column" }}>
      {busy && <div style={{ padding: 8 }}>Loading…</div>}
      <div style={{ flex: 1, overflow: "auto" }}>
        <Outlet />
      </div>
    </main>
  );
}
