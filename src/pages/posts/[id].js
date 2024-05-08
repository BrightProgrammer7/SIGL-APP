// getServerSideProps function runs on the server (node.js) to fetch data before the HTML is rendered by React. Google will look for the environment variable with the service account and use it to automatically authenticate. We just need to request the Google Sheets scope.
import { google } from 'googleapis';
const spreadsheetId= import.meta.env.SHEET_ID;

export async function getServerSideProps({ query }) {

    // auth omitted...
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

    const sheets = google.sheets({ version: 'v4', auth });

    // URL like this posts/:id, where the ID is a row in the spreadsheet. We get the ID from the URL, then use it to dynamically request a range of cells from the sheet. View more
    const { id } = query;
    const range = `Sheet1!A${id}:C${id}`;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range,
    });

    const [title, content] = response.data.values[0];
    console.log(title, content)

    return { 
        props: {
            title,
            content
        } 
    }

}

export default function Post({ title, content }) {
    return <article>
        <h1>{title}</h1>
        <div>{content}</div>
    </article>
}