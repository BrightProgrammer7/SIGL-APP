import { google } from "googleapis";

const spreadsheetId = "1PX-1FvHEbTQBMm0i5VmPfyuXdTKZOsghxJVsSR31MCc";

export async function getServerSideProps() {
  // auth omitted...
  const auth = await google.auth.getClient({
    keyFilename: "./keys.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // URL like this posts/:id, where the ID is a row in the spreadsheet. We get the ID from the URL, then use it to dynamically request a range of cells from the sheet. View more
  const range = `Student!A1:E4`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range,
  });

//   const [title, content] = response.data.values[2];
  const data = response.data.values;
//   console.log(title, content);

//   return {
//     props: {
//       title,
//       content,
//     },
//   };
  return {
    data
  };
}

const post = await getServerSideProps();
console.log(post);
