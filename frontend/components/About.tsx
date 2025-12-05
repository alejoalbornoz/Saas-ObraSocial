export default function About() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center mt-10 bg-gray-50 px-6 py-20">
      <div className="max-w-4xl text-center flex flex-col gap-10">
        <h1 className="text-4xl font-bold text-gray-900">¿Quiénes somos?</h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          Somos una Obra Social moderna que combina tecnología, transparencia y
          un trato humano real. Nuestro objetivo es que cada afiliado tenga una
          experiencia clara, accesible y sin vueltas. Creemos que la salud tiene
          que ser simple, eficiente y cercana.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Misión</h3>
            <p className="text-gray-600">
              Brindar servicios de salud accesibles, ágiles y respaldados por un
              sistema tecnológico moderno.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Visión</h3>
            <p className="text-gray-600">
              Ser la obra social más confiable, moderna y simple de Argentina.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">
              Valores
            </h3>
            <p className="text-gray-600">
              Transparencia, cercanía con el usuario, innovación y compromiso
              real con la salud.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-white p-10 rounded-xl shadow-sm border text-left">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Nuestro compromiso
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Trabajamos todos los días para mejorar la experiencia de nuestros
            afiliados. Implementamos nuevas herramientas digitales, optimizamos
            la gestión interna y facilitamos los procesos para que cada persona
            pueda acceder a la salud sin complicaciones.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Para nosotros, la salud no es solo un servicio: es una
            responsabilidad.
          </p>
        </div>
      </div>
    </div>
  );
}
