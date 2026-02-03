type ContactInfoProps = {
  email?: string;
  whatsapp?: string;
};

export function ContactInfo({
  email = "autorizaciones@tuobrasocial.com",
  whatsapp = "+54 9 11 0000 0000",
}: ContactInfoProps) {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-4xl rounded-3xl bg-white p-10 md:p-16 shadow-xl border border-gray-200">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Autorización de estudios médicos y tratamientos
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
          Para realizar un <strong>estudio médico</strong> o iniciar un{" "}
          <strong>tratamiento</strong>, es obligatorio comunicarse previamente
          con nuestro equipo de autorizaciones.
        </p>

        <div className="space-y-4 mb-10">
          <div className="text-lg md:text-xl text-gray-800">
            📧 <span className="font-medium">Email:</span>{" "}
            <a
              href={`mailto:${email}`}
              className="text-blue-600 hover:underline"
            >
              {email}
            </a>
          </div>

          <div className="text-lg md:text-xl text-gray-800">
            📱 <span className="font-medium">WhatsApp:</span>{" "}
            <a
              href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              {whatsapp}
            </a>
          </div>
        </div>

        <div className="rounded-2xl bg-gray-100 p-6">
          <p className="text-gray-700 text-base md:text-lg">
            🕒 <strong>Horario de atención:</strong> lunes a viernes de 9 a 17 hs.
          </p>
          <p className="text-gray-600 mt-2">
            Nuestro equipo te indicará la documentación necesaria y los pasos a
            seguir para continuar con tu solicitud.
          </p>
        </div>
      </div>
    </section>
  );
}
