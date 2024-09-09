interface Data {
  meeting_date: string;
  description: string;
  profile: {
    full_name: string;
    age: number;
    educate: string;
  };
}

export const reportTemplate = (data: Data[]) => {
  return `
     <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Report</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      h2 {
        margin: 0;
      }
      .header {
        display: flex;
        gap: 12px;
      }
      .header img {
        width: 80px;
      }
      .header div {
        font-size: 20px;
        font-weight: bold;
        color: #0038d1;
      }
    </style>
  </head>
  <body>
    <div style="margin-top: 40px; background-color: white; padding: 20px">
      <div style="display: flex; gap: 12px">
        <img
          src="https://res.cloudinary.com/dixdqxpza/image/upload/v1725454795/logoStatistik_black_sd3y7o.png"
          alt="logo"
          style="width: 80px"
        />
        <div style="font-size: 13px; font-weight: bold; color: #0038d1">
          <h2 style="margin: 0">BADAN PUSAT STATISTIK</h2>
          <h2 style="margin: 0">KABUPATEN HULU SUNGAI TENGAH</h2>
        </div>
      </div>
      <div
        style="
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        "
      >
        <div style="display: flex; font-size: 12px; gap: 8px">
          <div style="width: 128px">Nomor</div>
          <div>:</div>
          <div style="flex: 1">B-338A/XX/2024</div>
        </div>
        <div style="display: flex; font-size: 12px; gap: 8px">
          <div style="width: 128px">Lampiran</div>
          <div>:</div>
          <div style="flex: 1">-</div>
        </div>
        <div style="display: flex; font-size: 12px; gap: 8px">
          <div style="width: 128px">Hal</div>
          <div>:</div>
          <div style="flex: 1">Data Tamu</div>
        </div>
      </div>
      <div style="margin-top: 16px; font-size: 12px">
        <p style="text-align: justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At voluptas
          aperiam autem pariatur dolore error eligendi. Dolorum corporis amet
          minima?
        </p>
        <table
          style="
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #ccc;
            margin-top: 12px;
            margin-bottom: 12px;
          "
        >
          <thead>
            <tr style="text-align: left; background-color: #f7f7f7">
              <th style="padding: 5px 8px; border: 1px solid #ccc">No</th>
              <th style="padding: 5px 8px; border: 1px solid #ccc">Tanggal</th>
              <th style="padding: 5px 8px; border: 1px solid #ccc">Name</th>
              <th style="padding: 5px 8px; border: 1px solid #ccc">Umur</th>
              <th style="padding: 5px 8px; border: 1px solid #ccc">
                Pendidikan
              </th>
              <th style="padding: 5px 8px; border: 1px solid #ccc">Data</th>
            </tr>
          </thead>
          <tbody>
            ${data
              .map(
                (item, index) => `
              <tr>
                <td style="padding: 8px; border: 1px solid #ccc;">
                  ${index + 1}
                </td>
                <td style="padding: 8px; border: 1px solid #ccc;">
                  ${item.meeting_date}
                </td>
                <td style="padding: 8px; border: 1px solid #ccc;">
                  ${item.profile.full_name}
                </td>
                <td style="padding: 8px; border: 1px solid #ccc;">
                  ${item.profile.age}
                </td>
                <td style="padding: 8px; border: 1px solid #ccc;">
                  ${item.profile.educate}
                </td>
                <td style="padding: 8px; border: 1px solid #ccc;">
                  ${item.description}
                </td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <p style="text-align: justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem, nam necessitatibus iure impedit quos quae voluptatem
          hic voluptatum iste itaque fugit omnis ex? Porro nemo nihil
          necessitatibus non dicta similique?
        </p>
        <div style="display: flex; justify-content: flex-end">
          <div
            style="
              margin-top: 40px;
              display: flex;
              flex-direction: column;
              gap: 56px;
              text-align: center;
              font-size: 12px;
            "
          >
            <div>Kepala,</div>
            <div>
              <h2 style="margin: 0; font-size: 12px">DEDY WINARNO</h2>
              <span>NIP. 19xxxxxxxxxxx</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`;
};
