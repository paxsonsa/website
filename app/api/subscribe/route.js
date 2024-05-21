import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email, firstName } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const data = {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: firstName,
    },
  };

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const DATACENTER = process.env.MAILCHIMP_API_KEY.split('-')[1];
  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  const response = await fetch(url, {
    body: JSON.stringify(data),
    headers: {
      Authorization: `apikey ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (response.status >= 400) {
    return NextResponse.json({ error: `There was an error subscribing to the newsletter.` }, { status: 400 });
  }

  return NextResponse.json({ error: null }, { status: 201 });
}
