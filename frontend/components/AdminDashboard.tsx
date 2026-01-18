type Afiliado = {
  id: number;
  nombre: string;
  dni: string;
  plan: string;
  estado: "Activo" | "Pendiente" | "Baja";
};

const afiliados: Afiliado[] = [
  { id: 1, nombre: "Juan Pérez", dni: "32123456", plan: "Básico", estado: "Activo" },
  { id: 2, nombre: "María Gómez", dni: "29876543", plan: "Premium", estado: "Pendiente" },
  { id: 3, nombre: "Carlos López", dni: "33456789", plan: "Básico", estado: "Baja" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Admin · Obra Social
      </h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card title="Afiliados" value="1245" />
        <Card title="Autorizaciones Pendientes" value="87" />
        <Card title="Ingresos Mensuales" value="$45.200.000" />
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">DNI</th>
              <th className="p-3 text-left">Plan</th>
              <th className="p-3 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {afiliados.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-3">{a.nombre}</td>
                <td className="p-3">{a.dni}</td>
                <td className="p-3">{a.plan}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium
                      ${a.estado === "Activo" && "bg-green-100 text-green-700"}
                      ${a.estado === "Pendiente" && "bg-yellow-100 text-yellow-700"}
                      ${a.estado === "Baja" && "bg-red-100 text-red-700"}
                    `}
                  >
                    {a.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
