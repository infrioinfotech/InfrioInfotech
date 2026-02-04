import { google } from 'googleapis';

const getAuth = () => {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error('Google Sheets credentials missing');
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

export const appendToSheet = async (target, values) => {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEET_ID is missing');
    }

    let sheetName;
    // Map target 'Contacts' to first sheet (index 0) and 'Orders' to second sheet (index 1)
    if (target === 'Contacts') {
      try {
        sheetName = await getSheetTitleByIndex(sheets, spreadsheetId, 0);
      } catch (e) {
        // Fallback: try to use target name if index 0 fails (unlikely for valid spreadsheet)
        sheetName = target;
      }
    } else if (target === 'Orders') {
      try {
        sheetName = await getSheetTitleByIndex(sheets, spreadsheetId, 1);
      } catch (e) {
        // Index 1 missing. Create 'Orders' sheet.
        console.log('Second sheet not found, creating "Orders" sheet...');
        // Note: If 'Orders' already exists but is not index 1, this might fail or create duplicate?
        // Sheets API prevents duplicate names.
        // We will try to create it. If it fails, maybe it exists?
        // If it exists, we can use the name directly.
        try {
            sheetName = await createSheet(sheets, spreadsheetId, 'Orders');
        } catch (createError) {
             // If creation fails (e.g. name exists), use 'Orders'
             sheetName = 'Orders';
        }
      }
    } else {
      sheetName = target;
    }

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:A`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [values],
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error appending to sheet ${target}:`, error);
    throw error;
  }
};
