export const approveTemplate = (
  data: {
    profile: {
      full_name: string;
    };
    meeting_date: string;
    subject: string;
  },
  result: { status: string }
) => {
  return `
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      background-color: #ffffff;
      margin: 20px auto;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      max-width: 600px;
    }
    .header {
      background-color: #0073b7;
      color: #ffffff;
      padding: 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
    }
    .content h3 {
      font-size: 20px;
      margin-top: 0;
    }
    .content p {
      font-size: 16px;
      line-height: 1.6;
      margin: 10px 0;
    }
    .content .highlight {
      color: #0073b7;
      font-weight: bold;
    }
    .footer {
      background-color: #f4f4f4;
      padding: 10px;
      text-align: center;
      font-size: 12px;
      color: #888888;
      border-radius: 0 0 8px 8px;
    }
    .footer a {
      color: #0073b7;
      text-decoration: none;
    }
    .button {
      background-color: #0073b7;
      color: #ffffff;
      padding: 10px 20px;
      border-radius: 4px;
      text-decoration: none;
      display: inline-block;
      margin-top: 20px;
      text-decoration: none;
    }
  </style>
</head>
<body>

  <div class="email-container">
    <div class="header">
      <h1>Badan Pusat Statistik</h1>
    </div>

    <div class="content">
      <h3>Halo <span class="highlight">${data.profile.full_name}</span>,</h3>
      <p>
        Status pertemuan Anda yang dijadwalkan pada <strong>${new Date(
          data.meeting_date
        )}</strong> 
        dengan subjek <strong>${
          data.subject
        }</strong> telah diperbarui menjadi: 
        <span class="highlight">${result.status}</span>.
      </p>
      <p>Terima kasih telah mengajukan pertemuan dengan kami. Kami akan segera menghubungi Anda terkait detail pertemuan lebih lanjut.</p>

      <p>Salam Hormat,</p>
      <p><strong>Badan Pusat Statistik</strong></p>

      <a href="#" class="button">Kunjungi Website Kami</a>
    </div>

    <div class="footer">
      <p>Jika Anda memiliki pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami melalui email di <a href="mailto:zerozez76@gmail.com">zerozez76@gmail.com</a>.</p>
      <p>&copy; 2024 Badan Pusat Statistik. All rights reserved.</p>
    </div>
  </div>

</body>
</html>

     `;
};
