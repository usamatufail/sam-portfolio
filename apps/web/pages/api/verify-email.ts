import type { NextApiRequest, NextApiResponse } from 'next';
import status from 'http-status';
import axios from 'axios';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  if (_req.method === 'GET') {
    const { query } = _req;
    if (query?.email && query?.email !== 'undefined') {
      const response = await axios.get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_KEY}&email=${query.email}`,
      );
      res.status(status.OK).json({ message: response.data?.deliverability });
    } else {
      res
        .status(status.NOT_ACCEPTABLE)
        .json({ message: 'Please add an email in query params' });
    }
  }
}
