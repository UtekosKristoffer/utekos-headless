Introduction to advanced matching for websites
Learn how to use automatic and manual advanced matching to send hashed customer information along with events from the Meta Pixel to optimize your ad campaigns while protecting customer privacy.


This lesson prepares you to:
Understand how advanced matching for websites enables advertisers to optimize their ads across Meta technologies and generate better results. 

Configure advanced matching options, as well as setup and troubleshooting.

Introduction to advanced matching for websites 
Advanced matching can help you optimize your ads across Meta technologies to produce better results. With advanced matching, you can send hashed customer information along with website events from the Meta Pixel which can help attribute more conversions and reach more people. 



The customer information is hashed on the website before it is sent to Meta to help protect people's privacy. Meta uses one of the most advanced functions, which is called SHA-256.



You can use advanced matching to help with the following:

Expand the headers to learn more.
Increase the number of attributed conversions.

Increase your custom audience size.
Better match your website visitors to people across Meta technologies and increase the size of your custom audience.

Decrease the cost per conversion.

Note: You must install the pixel with events set up to use advanced matching.



For people using devices with iOS 14.5 and above, hashed customer data from advanced matching for opted-out events can’t be used. Opted-out events refer to people who opted-out of the Apple ATT prompt on Facebook or Instagram. Meta can only receive limited information consistent with Meta Aggregated Event Measurement for opted-out events.

How advanced matching works
Let's explore how advanced matching works. When someone creates an account on Meta technologies, such as Facebook, they provide information including their name, email address and phone number. These personal details are pre-hashed based on lowercase characters.

 


META

CLIENT WEBSITE

META

DELETE

Hashed information

Information
hashing

Advanced matching activated

Matched and unmatched hashes are discarded after the process completes.

Attribute conversions

Matched individuals are added to conversions report.

3,678 matches

(match number for illustrative purposes only)

*With automatic advanced matching, client data is hashed locally in the browser before transmission to Meta technologies.




Advanced matching works differently on client websites. When advanced matching is activated, the system automatically detects when there’s a match. It will automatically lowercase all the information and hash the data before it’s sent through the browser to Meta. The data from Facebook and a client website will then be matched in a secure environment. 



After this, all the data is deleted, which includes both the unmatched and the matched hashes that come from a client website. The matched data and transactions are then attributed back to your ad campaign across Meta technologies. 

Data privacy and transparency
Meta is committed to improving data privacy across Meta technologies for the people who use these technologies and advertisers. Advertisers who want to use advanced matching must adhere to specific rules, terms and regulations, some of which include the following:

Expand the headers to learn more.
Terms of Service

Meta Business Tools Terms

General Data Protection Regulation

California Consumer Privacy Act

Customer information must be hashed before being sent to Meta. When the pixel can't automatically hash customer information, for example, when you use an IMG pixel, you have to hash the data manually prior to sending it to Meta. 



Matching requests that are sent with unhashed information values will be ignored. After the matching process is complete, the system is designed to discard matched and unmatched hashes that you have provided.



The pixel advanced matching process is not designed to hash and transmit sensitive information such as passwords or financial, health or government information.


Two types of advanced matching
There are two types of advanced matching. The first is automatic advanced matching, which doesn't require code modification. You can set up advanced matching in Meta Events Manager. The second type is manual advanced matching, which requires code modification in the base code of the pixel fbq('init')function call.



Manual and automatic advanced matching versions work differently, so you should use both to achieve maximum performance from advanced matching. If you're unable to use both versions, the following guidelines may help you decide which option to choose.

Explore the tabs to learn more.
Use automatic advanced matching if:
Use manual advanced matching if:
You're familiar with code modification or you're working with a developer who can help.

Your website uses an IMG pixel. 

Your pixel is in an iFrame. 

You're using an iFrame to embed third-party content onto your website, such as a lead form or a payment flow.

Your business is in a regulated vertical such as banking, lending, financial services, insurance, pharmaceuticals or health.

Customers often remain logged into your website for extended periods of time instead of logging in each time they visit.

Learn about best practices for automatic and manual advanced matching to choose the version that's right for your business.

Knowledge check
The following businesses have marketing teams who want to attribute more actions that occur on their websites to their ads across Meta technologies. Match each scenario with the version of advanced matching that best applies.

Use these cards to match the scenario to the correct advanced matching strategy.



Key takeaways
Increase the number of attributed conversions and optimize your ads against more conversion information by using advanced matching for websites.





Adhere to specific rules, terms and regulations to help maintain transparency and data privacy.




Use both manual and automatic advanced matching if possible.