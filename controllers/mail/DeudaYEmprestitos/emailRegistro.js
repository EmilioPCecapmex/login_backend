module.exports = function generateEmailTemplate(data, isSuccess) {
  const title = isSuccess
    ? "✅ Registro Exitoso - Grupo Deuda y Emprestitos"
    : "❌ Error en Registro - Grupo Deuda y Emprestitos";

  const introMessage = isSuccess
    ? `<p>Estimado(a),</p>
       <p>Nos complace informarle que el registro del asistente se ha completado <strong>correctamente</strong>. A continuación se muestran los datos registrados:</p>`
    : `<p>Estimado(a),</p>
       <p>Se presentó un <strong>error</strong> al intentar registrar el asistente. Estos son los datos que se intentaron enviar para su análisis:</p>`;

  // Traducción de campos para presentación
  const fieldNames = {
    nombre: "Nombre",
    aPaterno: "Apellido Paterno",
    aMaterno: "Apellido Materno",
    cargo: "Cargo",
    entidadFederativa: "Entidad Federativa",
    tpoInvitacion: "Tipo de Invitación",
    sector: "Sector",
    nivelGobierno: "Nivel de Gobierno",
    dependencia: "Dependencia",
    hotel: "Hotel",
    fAsistencia: "Fecha de Asistencia",
    fhSalida: "Fecha/Hora de Salida",
    correo: "Correo Electrónico",
    telefono: "Teléfono",
    Extension: "Extensión",
    Celular: "Celular",
    medioTransporte: "Medio de Transporte",
    proveedorTransporte: "Proveedor de Transporte",
    fhLlegada: "Fecha/Hora de Llegada"
  };

  // Generar filas con nombres traducidos
  const rows = Object.entries(data)
    .map(([key, value]) => {
      const label = fieldNames[key] || key;
      return `
        <tr>
          <td style="padding:10px;border:1px solid #ddd;background:#f9f9f9;font-weight:bold;">${label}</td>
          <td style="padding:10px;border:1px solid #ddd;">${value || ""}</td>
        </tr>
      `;
    })
    .join("");

  // Plantilla HTML
  return `
  <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, sans-serif; color: #333; line-height: 1.6; }
        h2 { color: ${isSuccess ? "#28a745" : "#dc3545"}; }
        table { border-collapse: collapse; width: 100%; margin-top: 15px; }
        td, th { padding: 10px; border: 1px solid #ddd; }
        .footer { margin-top: 20px; font-size: 12px; color: #777; }
      </style>
    </head>
    <body>
      <h2>${title}</h2>
      ${introMessage}
      <table>
        <tbody>
          ${rows}
        </tbody>
      </table>
      <p class="footer">
        Este es un mensaje automático, por favor no responda a este correo.<br>
        Grupo Deuda y Emprestitos - 2025
      </p>
    </body>
  </html>
  `;
};
