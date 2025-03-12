// /app/si/[id]/page.tsx

import LineasAccion from "./page2";


export async function generateStaticParams(): Promise<{ id: string }[]> {
  // Genera una lista del 1 al 35
  return Array.from({ length: 35 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}

export default function Page() {
  // Pasa el parámetro [id] al componente de cliente
  return <div>
    <LineasAccion />
  </div>
}