import RevisionTable from "../components/revisionTablePrioridades";
import { Title } from "../components/title";


export default function RevisionPage() {
  return (
    <div>
      <Title title="Revisión de datos por SEA" text="Tabla de datos" />
        <RevisionTable />
    </div>
  );
}