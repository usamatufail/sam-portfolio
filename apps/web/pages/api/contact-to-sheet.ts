import { GoogleSpreadsheet } from 'google-spreadsheet';
import type { NextApiRequest, NextApiResponse } from 'next';
import status from 'http-status';

// Config variables
const SPREADSHEET_ID = process.env.SPREADSHEET_ID || '';
const SHEET_ID = process.env.SHEET_ID || '';
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL || '';
const GOOGLE_SERVICE_PRIVATE_KEY = process.env.GOOGLE_SERVICE_PRIVATE_KEY || '';

// GoogleSpreadsheet Initialize
const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

// Append Function
const appendSpreadsheet = async (row: any) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    // loads document properties and worksheets
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID];
    await sheet.addRow(row);
  } catch (e) {
    console.error('Error: ', e);
  }
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  if (_req.method === 'POST') {
    const { body } = _req;
    await appendSpreadsheet(body);
    res.status(status.OK).json({ message: 'Added to sheet!' });
  }
}
