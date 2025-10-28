# Set up and install the Meta Pixel

You may be able to speak with a Meta Technical Pro for step-by-step guidance to
install the Meta Pixel. Learn how to schedule a call with a Meta Pro. This
article will cover how to set up a Meta Pixel on your website.

## Setting up a pixel involves 2 steps:

1. Create your pixel in Events Manager and set up the base code on your website.
   You can use a partner integration, if available, or add code manually to your
   website.
2. Set up events on your website to measure actions like making a purchase. You
   can use a partner integration, the point-and-click event setup tool, or add
   code manually to your website. There are several options for how to set up
   your pixel and events, and you’ll be guided through the available options
   during setup. If you set up your pixel or events manually, you may need a
   developer's help to add the code to your website.

If you share events with Meta using your pixel, we also recommend using the
Conversions API. The Conversions API helps improve the performance and
measurement of your Meta ad campaigns by working with your Meta Pixel. Learn
more about the Conversions API and how it works.

Requirements You need a business website or app. You or your developer must be
able to update your website's code or the tag manager you use, if applicable,
for manual pixel setup using code. Set up the Meta Pixel and events on your
website

1. Go to Meta Events Manager.
2. Click Connect data and select Web.
3. Click Connect.
4. Enter a name for your pixel, then click Create pixel. This creates a new ID,
   viewable in Events Manager.
5. Your next steps depend on if you have a website or not:

- If you have a website, enter your website URL to check for easy partner
  integration setup options, then click Check.
- If a partner integration is available to you, you’ll see it on the screen.
  Click Next and follow the onscreen instructions to set up your pixel and
  events through your partner’s website.
- If a partner integration is not available, click Next.
- If you don’t have a website, click to check the box next to I don't have a
  website and click Continue.

6. Select how you would like to connect your data with Meta: Get guidance or Do
   it yourself. Note: We recommend Get guidance.

- Select Get guidance if you would like setup recommendations. You can skip the
  rest of the instructions in this article if you select this option, and you
  can follow the onscreen instructions in Events Manager instead.
- Select Do it yourself if you already know how you’d like to connect your data
  and don’t want setup recommendations. If you select this option, follow the
  rest of the instructions in this article.

7. Select Conversions API and Meta Pixel or Meta Pixel only as your setup
   option, then click Next.
   - If you select Conversions API and Meta Pixel, choose how you want to set up
     the Conversions API and pixel. You can choose either Set up with partner
     integration, Set up with Conversions API Gateway or Set up manually. If
     you’re not sure which option to choose, you can compare Conversions API
     setup options by cost and complexity.
   - If you select Set up with partner integration, select your partner and
     follow the onscreen instructions to set up the pixel, Conversions API and
     events.
   - If you select Set up with Conversions API Gateway, follow the onscreen
     instructions to set up the pixel, Conversions API Gateway and events.
   - If you select Set up manually, follow the onscreen instructions to create
     personalized instructions to set up the pixel, Conversions API and events.
     On the last screen, you’ll have the option to set up the Conversions API
     yourself using the personalized instructions or send the instructions to a
     developer. If you need help creating the instructions, you can learn how to
     set up the Conversions API using personalized instructions.

- If you select Meta Pixel only, choose how you want to set up your pixel code:
  Install code manually or Check for partner. If you have a developer who will
  set up your pixel for you, you can click Email instructions instead.

## Install the Meta Pixel manually

1. Copy the pixel base code.

2. Find the header of your website or locate the header template in your CMS or
   web platform.
3. Paste the base code at the bottom of the header section, just above the
   closing head (</head>) tag, on every page of your website. Your ID will be
   included in your base code, and you can use one ID across your whole website.
   Code snippet showing where to place the Meta Pixel code in the website header

   **example of Meta Pixel base code**
   <!-- ExampleFacebook Pixel Code -->
   <!DOCTYPE html>
   <html lang ="en">
   <head>
     <script>...</script>
     insert_pixel_base_code_here
   </head>

4. Click Continue.
5. Optional: Toggle on Automatic advanced matching and verify the customer
   information you want to send. Click Continue.
6. Add events using the event setup tool or by manually adding code to your
   website.

- To use the event setup tool: Click Open event setup tool and follow the
  onscreen instructions to add events and parameters without the need for
  additional coding. If you need additional help, learn how to use the event
  setup tool.
- To use manual setup: Click Install events using code to learn how to set up
  the Meta Pixel using code.
