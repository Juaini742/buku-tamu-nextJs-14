export const requestTemplate = (
  meeting_date: string,
  description: string,
  status: string,
  profile: { full_name: string },
  subject: string
) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pengajuan Pertemuan</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border: 1px solid #ddd;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #007bff;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }
        .email-body {
            padding: 20px;
            color: #333;
        }
        .email-body p {
            line-height: 1.6;
        }
        .email-footer {
            margin-top: 20px;
            padding: 10px;
            text-align: center;
            background-color: #f4f4f4;
            font-size: 12px;
            color: #999;
        }
        .email-footer a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>

<div class="email-container">
    <div class="email-header">
        <h1>Badan Pusat Statistik</h1>
        <p>Pengajuan Pertemuan</p>
    </div>

    <div class="email-body">
        <p>Yth. Admin Badan Pusat Statistik,</p>

        <p>
            Dengan hormat, <br>
            Kami ingin memberitahukan bahwa pengajuan pertemuan telah diajukan dengan detail sebagai berikut:
        </p>

        <table>
            <tr>
                <td><strong>Tanggal Pertemuan</strong></td>
                <td>: ${new Date(meeting_date)}</td>
            </tr>
            <tr>
                <td><strong>Subjek Pertemuan</strong></td>
                <td>: ${subject}</td>
            </tr>
            <tr>
                <td><strong>Alasan Pertemuan</strong></td>
                <td>: ${description}</td> 
            </tr>
            <tr>
                <td><strong>Status Pengajuan</strong></td>
                <td>: ${status}</td>
            </tr>
        </table>

        <p>
            Harap segera meninjau dan memproses pengajuan ini sesuai dengan prosedur yang berlaku.
        </p>

        <p>Terima kasih atas perhatian dan kerjasamanya.</p>

        <p>Salam hormat,</p>
        <p><strong>${profile.full_name}</strong><br>
        Pengaju Pertemuan</p>
    </div>

    <div class="email-footer">
        <p>Email ini dikirim oleh sistem otomatis Badan Pusat Statistik.<br>
        Jika Anda memiliki pertanyaan lebih lanjut, silakan hubungi kami di <a href="mailto:info@bps.go.id">info@bps.go.id</a>.</p>
    </div>
</div>

</body>
</html>
     `;
};
