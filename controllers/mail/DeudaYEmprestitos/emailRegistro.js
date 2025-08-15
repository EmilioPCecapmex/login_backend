module.exports = function generateEmailTemplate(data, isSuccess, confirmUrl = null) {
  const title = isSuccess
    ? "✅ Registro Exitoso - CUARTA REUNIÓN DEL GRUPO DE DEUDA Y EMPRÉSTITOS 2024-2025"
    : "❌ Error en Registro - CUARTA REUNIÓN DEL GRUPO DE DEUDA Y EMPRÉSTITOS 2024-2025";

  const introMessage = isSuccess
    ? `<p style="margin:0 0 15px 0;font-family:Segoe UI,Tahoma,sans-serif;color:#333;font-size:14px;">Estimado(a),</p>
       <p style="margin:0 0 15px 0;font-family:Segoe UI,Tahoma,sans-serif;color:#333;font-size:14px;">Nos complace informarle que el registro de solicitud de asistencia se ha completado <strong>correctamente</strong>. A continuación se muestran los datos registrados:</p>`
    : `<p style="margin:0 0 15px 0;font-family:Segoe UI,Tahoma,sans-serif;color:#333;font-size:14px;">Estimado(a),</p>
       <p style="margin:0 0 15px 0;font-family:Segoe UI,Tahoma,sans-serif;color:#333;font-size:14px;">Se presentó un <strong>error</strong> al intentar registrar el asistente. Estos son los datos que se intentaron enviar para su análisis:</p>`;

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
    pais: "País",
    hotel: "Hotel",
    fAsistenciaFormato: "Fecha de Asistencia a la Reunión",
    fhSalidaFormato: "Fecha/Hora de Salida del Hotel",
    correo: "Correo Electrónico",
    telefono: "Teléfono",
    Extension: "Extensión",
    Celular: "Celular",
    medioTransporte: "Medio de Transporte",
    proveedorTransporte: "Proveedor de Transporte",
    fhLlegadaFormato: "Fecha/Hora de Llegada del transporte"
  };

  // Campos a excluir del correo
  const excludeFields = ["fAsistencia", "fhSalida", "fhLlegada"];

  const rows = Object.entries(data)
    .filter(([key]) => !excludeFields.includes(key)) // ⬅ Aquí filtramos
    .map(([key, value]) => {
      const label = fieldNames[key] || key;
      return `
        <tr>
          <td style="padding:10px;border:1px solid #ddd;background-color:#f9f9f9;font-family:Segoe UI,Tahoma,sans-serif;font-size:13px;">${label}</td>
          <td style="padding:10px;border:1px solid #ddd;font-family:Segoe UI,Tahoma,sans-serif;font-size:13px;">${value || ""}</td>
        </tr>
      `;
    })
    .join("");

  const confirmButton = (isSuccess && confirmUrl)
    ? `
      <tr>
        <td colspan="2" style="text-align:center;padding-top:20px;">
          <a href="${confirmUrl}" style="background-color:#28a745;color:#ffffff;padding:10px 20px;text-decoration:none;border-radius:5px;font-family:Segoe UI,Tahoma,sans-serif;font-size:14px;display:inline-block;">
            Confirmar asistencia
          </a>
        </td>
      </tr>
    `
    : "";

  return `
  <html>
    <body style="margin:0;padding:0;background-color:#f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f4f4">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="margin-top:20px;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
              <tr>
                <td style="padding:20px;">
                  <h2 style="margin:0 0 20px 0;font-family:Segoe UI,Tahoma,sans-serif;color:${isSuccess ? "#28a745" : "#dc3545"};font-size:20px;">${title}</h2>
                  ${introMessage}
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                    ${rows}
                    ${confirmButton}
                  </table>
                  <p style="margin-top:20px;padding-top:10px;border-top:1px solid #ccc;font-size:12px;color:#777;text-align:center;font-family:Segoe UI,Tahoma,sans-serif;line-height:1.4;">
                    <strong style="font-size:13px;color:#333;display:block;margin-bottom:5px;">CUARTA REUNIÓN DEL GRUPO DE DEUDA Y EMPRÉSTITOS 2024-2025</strong>
                    Este es un mensaje automático, por favor no responda a este correo.<br>
                    Grupo Deuda y Empréstitos 2024-2025
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
