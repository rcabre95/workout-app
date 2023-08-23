import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';
import { supabase } from "../../../../lib/initSupabase";

export const auth = supabase.auth;

export default function POST(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    const {  } = req.body;
  res.status(200).json({ name: 'John Doe' })
}