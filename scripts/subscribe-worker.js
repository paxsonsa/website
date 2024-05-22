// Note: this code has no direct functionality within this application - it is only reference code to be used in the Cloudflare Worker code section(i.e. subscribe-worker)


async function handleRequest(request) {
    
    console.log(MAILCHIMP_API_KEY);
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };
  
    if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }
  
    if (request.method === 'POST') {
        try {
            const { email, firstName } = await request.json();
  
            if (!email) {
                return new Response(JSON.stringify({ error: 'Email is required' }), {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                });
            }
  
            const data = {
                email_address: email,
                status: 'subscribed',
                merge_fields: { FNAME: firstName },
            };
  
            const API_KEY = env.MAILCHIMP_API_KEY;
            const AUDIENCE_ID = env.MAILCHIMP_AUDIENCE_ID;
  
            // Added logging for debugging
            console.log(`Environment: ${env}`);
            console.log(`test: ${env.MAILCHIMP_API_KEY}`)
            console.log("API_KEY:", API_KEY);
            console.log("AUDIENCE_ID:", AUDIENCE_ID);
  
            if (!API_KEY || !API_KEY.includes('-')) {
                throw new Error('Invalid Mailchimp API key format');
            }
  
            const DATACENTER = API_KEY.split('-')[1];
            console.log("DATACENTER:", DATACENTER);
  
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
                const errorData = await response.json();
                return new Response(JSON.stringify({ error: errorData.detail || 'There was an error subscribing to the newsletter.' }), {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                });
            }
  
            return new Response(JSON.stringify({ error: null }), {
                status: 201,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        } catch (error) {
            console.error('Error:', error.message);
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: corsHeaders,
            });
        }
    }
  
    return new Response('Method Not Allowed', {
        status: 405,
        headers: corsHeaders,
    });
  }
  
  addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request, event));
  });
  