# [andrewpaxson.com](https://andrewpaxson.com)

This is the repo for my personal website.

## Stack Notes:

- NextJS Static Build
- TailwindCSS
- React
- Hosted on Cloudflare Pages.

## Development

```bash
# Run the development server
> npm install
> npm run dev

# Build the static site
> npm run build
```


## How to Deploy Website on Cloudflare
- Login to your GitHub account and fork this repository
- Create a Cloudflare account and login
  - In the Cloudflare dashboard, select 'Workers and Pages' from the left menu
  - Select the tab 'Pages' (beside 'Workers')
  - Select 'Connect to Git'
    - Connect your GitHub account
    - Select the newly forked repository
    - Select 'Begin setup' button
  - Set up builds and deployments: 
    - Project name: *your-project-name*
    - Production branch: main
    - Framework preset: Next.js
    - Build command: npm run build
    - Build output directory: out
    - Select the 'Save and Deploy' button
  - Select 'Continue to project' button (after the build/deploy is completed)
  - Ensure the hardcoded URLs are accurate: 
    - components/Subscribe.jsx
    - scripts/generate-rss.js
  - Optional: Set up a custom domain:
    - Go to the 'Custom domains' tab, and enter your custom domain
      - If using a subdomain -> select 'Begin CNAME setup' button
      - Copy the 'Target'
      - Login to your website's host dashboard and find your website's DNS settings
        - For Cloudflare: Go to the Cloudflare dashboard, select 'Websites', select the custom domain you want to use, then go to 'DNS' in the left sidebar
        - Select 'Add Record'
        - Type: CNAME
        - Name: @
        - Target: *enter the target value from the previous step
  - Set up the blog mailing list:
    - If you do not want to set up the blog mailing list:
      - Remove 'Subscribe' import statement and 'Subscribe' component invocation (i.e. <Subscribe />) from the following files:
        - app/page.jsx
        - app/articles/page.jsx
        - app/articles/[slug]/page.jsx
    - If you do want to set up the blog mailing list:
      - Follow the [How to Set Up the Blog Mailing List](#how-to-setup-blog) instructions below
  - Make sure the site works:
    - In the Cloudflare project's dashboard, go to the 'Deployments' tab, select the 'Visit site' link to ensure everything is working as expected
    - If you have set up a custom domain, visit the URL to check if it works


## How to Set Up the Blog Mailing List<a name="how-to-setup-blog"></a>
- *Note: your domain must use Cloudflare's nameservers for the 'Workers' to function (if the website is hosted elsewhere then you will need to change the nameservers to Cloudflare)*
- Create a Cloudflare Worker:
  - Login to Cloudflare
  - Select 'Workers & Pages' in the left sidebar
    - Select 'Create application'
      - In the 'Workers' tab, select 'Create worker'
        - Name: "subscribe-worker'
        - Select 'Deploy'
      - Select 'Edit code'
        - Delete the existing code
        - Paste in the code from the subscribe-worker.js file (located in the 'Scripts' folder of this repository) 
        - Select 'Deploy'
        - Copy the Cloudflare woker endpoint (e.g. 'subscribe-worker.andrewpaxson.workers.com')
        - Select 'Save and deploy'
- Setup a Mailchimp RSS Campaign:
  - Signup/login to MailChimp
    - Optional: Change profile timezone: 
      - Select the profile icon
      - Select Profile 
      - Go to the 'Settings' dropdown and select 'Details'
      - Update the Timezone field (e.g. '(GMT-07:00) Vancouver')
      - Select 'Save' 
    -  Create an RSS campaign: 
      - Go to this [MailChimp URL](https://us22.admin.mailchimp.com/campaigns/#/create-campaign/explore/rss)
      - Campaign Name: Share blog updates
      - Select 'Begin' button
      - RSS feed and send timing:
        - URL: *enter your website url + /rss.xml - e.g. https://andrewpaxson.com/rss.xml*
        - When should we send?: *enter as per your preference*
        - Select Next
      - Recipients:
        - Select 'Entire audience'
        - Select next
      - Setup:
        - Modify preferences to your choosing (e.g. connect to Twitter)
        - Select next
      - Template:
        - Select a template (e.g. 'Simple Text') 
      - Design: 
        - Design the email layout and content  
          - Example: 
            - Select the 'It's time to design your email.' text and edit it to your blog header (e.g. "Check out my new blog post") , and select 'Save and close' button
            - Select the middle content blog (i.e. "Now that you've selected your template...") and delete it
            - Add a 'Code' content block to the body section
            - Insert the following code into the new code content block:
              - ```html
              <h2>*|RSSITEM:TITLE|*</h2>
              <p>*|RSSITEM:CONTENT|*</p>
              <a href="*|RSSITEM:URL|*">Read more</a>
              <p><small>Published on *|RSSITEM:DATE|*</small></p>
              ```
        - Select next
      - Review campaign and select 'Start RSS' 
      - Select 'Start Campaign' to complete process
- Connect the Mailchimp Campaign to the Cloudflare Worker:
  - Find the Mailchimp API key and List ID: 
    - Login to Mailchimp
    - Get the API Key: 
      - Select the profile icon and choose Profile
      - Select the Extras drop-down and then choose API keys
      - In the Your API Keys section, Select Create A Key
      - Name the key (e.g. Portfolio Blog Email List)
      - Select Generate Key
      - Copy the key and save it for the next step (you cannot access this key again, so make sure to save it somewhere you can access it for the next step)
    - Get the Audience ID:
      - In the left sidebar, under the 'Audience' heading, select 'All contacts'
      - Select the module's 'Settings' drop-down and select 'Audience name & defaults'
      - Under the Audience ID, copy the Audience ID value
  - Add the Mailchimp API key and List ID to the Cloudflare Worker's environment variables: 
    - Go to Cloudflare and select 'Workers & Pages' from the left side sidebar
    - Select the subscribe-worker
    - Go to the 'Settings' tab
    - In the Environment Variables -> Production section, select 'Add variables' or 'Edit variables'
    - Select 'Add variable'
    - Add the Mailchimp API key
      - Variable name: MAILCHIMP_API_KEY
      - Value: *enter variable from previous step*
      - Select Encrypt to protect the value
    -Add the Mailchimp List ID
      - Variable name: MAILCHIMP_AUDIENCE_ID
      - Value: *enter variable from previous step*
      - Select Encrypt to protect the value

