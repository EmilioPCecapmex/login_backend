module.exports = function generateEmailTemplate(data, isSuccess, confirmUrl = null) {
  const title = isSuccess
    ? "✅ Registro Exitoso - Semana de Formación en Armonización Contable"
    : "❌ Error en Registro - Semana de Formación en Armonización Contable";

  const introMessage = isSuccess
    ? `<p>Estimado(a),</p>
       <p>Su registro para la <strong>Semana de Formación en Armonización Contable</strong> se ha completado correctamente. A continuación, se muestran los datos capturados:</p>`
    : `<p>Estimado(a),</p>
       <p>Ocurrió un error al intentar registrar su participación. Estos son los datos que se intentaron enviar:</p>`;

  const fieldNames = {
    nombre: "Nombre",
    aPaterno: "Apellido Paterno",
    aMaterno: "Apellido Materno",
    cargo: "Cargo",
    tpoInvitacion: "Tipo de Invitación",
    municipioFideicomiso: "Municipio/Fideicomiso",
    asistencia: "Asistencia",
    sector: "Sector",
    nivelGobierno: "Nivel de Gobierno",
    dependencia: "Dependencia",
    fAsistencia: "Fecha de Asistencia",
    correo: "Correo Electrónico",
    telefono: "Teléfono",
    Extension: "Extensión",
    Celular: "Celular"
  };

  const excludeFields = ["captchaToken"];
  const rows = Object.entries(data)
    .filter(([key]) => !excludeFields.includes(key))
    .map(([key, value]) => {
      const label = fieldNames[key] || key;
      return `
        <tr>
          <td style="padding:10px;border:1px solid #ddd;background:#f9f9f9;">${label}</td>
          <td style="padding:10px;border:1px solid #ddd;">${value || ""}</td>
        </tr>
      `;
    })
    .join("");

  const confirmButton = (isSuccess && confirmUrl)
    ? `<tr><td colspan="2" style="text-align:center;padding-top:20px;">
        <a href="${confirmUrl}" style="background:#28a745;color:#fff;padding:10px 20px;text-decoration:none;border-radius:5px;">Confirmar asistencia</a>
      </td></tr>`
    : "";

  return `
  <html>
    <body style="background:#f4f4f4;padding:20px;font-family:Segoe UI,Tahoma,sans-serif;">
      <table width="100%" cellspacing="0" cellpadding="0">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);overflow:hidden;">
            <tr>
              <td style="padding:20px;">
                <h2 style="color:${isSuccess ? "#28a745" : "#dc3545"};">${title}</h2>
                ${introMessage}
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-top:15px;">
                  ${rows}
                  
                </table>
                <p style="margin-top:25px;padding-top:10px;border-top:1px solid #ccc;color:#777;font-size:12px;text-align:center;">
                  <strong>Semana de Formación en Armonización Contable</strong><br>
                  Este es un mensaje automático, por favor no responda este correo.
                </p>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
  </html>
  `;
};
