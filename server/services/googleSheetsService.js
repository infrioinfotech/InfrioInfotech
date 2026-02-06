import { google } from 'googleapis';

const getAuth = () => {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    throw new Error('Google Sheets credentials missing');
  }

  // Handle literal \n characters (common in JSON dumps)
  privateKey = privateKey.replace(/\\n/g, '\n');

  // Handle single-line keys (common in .env files without proper escaping)
  if (!privateKey.includes('\n') && privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
    privateKey = privateKey
      .replace('-----BEGIN PRIVATE KEY-----', '-----BEGIN PRIVATE KEY-----\n')
      .replace('-----END PRIVATE KEY-----', '\n-----END PRIVATE KEY-----');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return auth;
};

const getSheetTitleByIndex = async (sheets, spreadsheetId, index) => {
  const metadata = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: 'sheets.properties.title',
  });
  
  if (!metadata.data.sheets || metadata.data.sheets.length <= index) {
    throw new Error(`Sheet at index ${index} not found`);
  }
  
  return metadata.data.sheets[index].properties.title;
};

const createSheet = async (sheets, spreadsheetId, title) => {
  try {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{
          addSheet: {
            properties: {
              title,
            },
          },
        }],
      },
    });
    return title;
  } catch (error) {
    // If sheet already exists with this name but wasn't at index 1?
    // We should handle this, but for now assuming clean state or missing sheet.
    console.error('Error creating sheet:', error);
    throw error;
  }
};

export const appendToSheet = async (target, row) => {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEET_ID is missing');
    }

    // Use explicit sheet names; for Reviews, rely on exact title "Reviews"
    const sheetName = target;

    // Choose append range and options
    const range = target === 'Reviews' ? 'Reviews!A:F' : `${sheetName}!A:A`;

    const request = {
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [row],
      },
    };

    console.log('Appending row to Google Sheet', { target, range, row });
    const response = await sheets.spreadsheets.values.append(request);

    return response.data;
  } catch (error) {
    console.error(`Error appending to sheet ${target}:`, error);
    throw error;
  }
};
