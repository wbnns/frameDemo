export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
  <!DOCTYPE html>
      <html>
        <head>
          <title>Vote Recorded</title>
          <meta property="og:title" content="Tested!">
          <meta property="og:image" content="https://frame-demo.vercel.app/mint.png">
          <meta name="fc:frame" content="vNext">
          <meta name="fc:frame:image" content="https://frame-demo.vercel.app/api/mint">
          <meta name="fc:frame:post_url" content="https://frame-demo.vercel.app/mint.png">
          <meta name="fc:frame:button:1" content="Tested">
        </head>
        <body>
          <p>Testing Complete</p>
        </body>
      </html>
  
  `);
}