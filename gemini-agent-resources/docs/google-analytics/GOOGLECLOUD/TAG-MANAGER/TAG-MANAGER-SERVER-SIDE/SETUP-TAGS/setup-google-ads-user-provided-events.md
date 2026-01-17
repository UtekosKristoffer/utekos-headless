Google Ads User-provided Data Event



Server-side Tag Manager lets you to move your Google Ads User-provided Data Event tags from the web page to the server. Moving these tags to the server reduces the amount of code you have to run in the page, and helps improve page load speed. This document describes how to configure your Tag Manager web container and server container to use Google Ads User-provided Data Event tag.

Before you begin
This document assumes that you have:

Admin rights in Google Ads and Google Tag Manager
Set up Google Tag Manager
Created a server container
Set up the Google Analytics: GA4 client
Step 1: Set up the Conversion Linker tag
To allow Google Ads to send data to Tag Manager, you need to set up the Conversion Linker tag.

If you already have a Conversion Linker tag configured in your server container, you can skip this step.

To set up the Conversion Linker tag:

From your server container workspace, open the Tags menu on the left side of the page.
Click New to add a new tag.
Select the Conversion Linker tag type.
Set up the trigger that will cause the Conversion Linker server-side tag to fire.
In most cases, the All pages trigger is the best option.
Name the tag and click Save. Conversion Linker tag detail
Step 2: Set up the Google Ads User-provided Data Event tag in the server container 
To set up the Google Ads User-provided Data Event tag:

In your server container workspace, open the Tags menu on the left side of the page.
Click New to add a new tag.
Select the Google Ads User-provided Data Event tag type.
Enter the required conversion information (Conversion ID). You can find these values in your Google Ads account.

In the Triggering menu, select an existing trigger if it fits your use case. If no pre-existing trigger covers your needs, create a new custom trigger the blue plus.

To trigger the tag on a custom event:

Choose the Custom Event trigger.
Enter the event name that matches the one used in the Google Analytics: GA4 Event tag. Custom Event trigger details
To trigger only on specific URLs:

Select the option to trigger on Some Custom Events.
Add the Page URL variable to equal the URL the tag should trigger on.
Name the tag and click Save.

Step 3: Configure User data
The tag relies on the user data available in the event, similar to Enhanced Conversions

Set up a user-provided data variable
There are 3 ways in which you can implement enhanced conversions in Tag Manager. You only need to choose one option to collect user-provided data.

Automatic collection	Manual configuration	Code configuration
Collection method	Automatically collects user-provided data based on the code of your website.

If you need control over where to collect inputs, opt for a manual or code setup.	Specify select CSS properties or JavaScript variables to collect user-provided data.

If you need to take control over data formatting and hashing, opt for code configuration.	Add a code snippet on your website that sends hashed customer data for matching.
This method is the best choice for maximizing the accuracy of enhanced conversions by letting you send consistently formatted data whenever your conversion tag fires.
Complexity	Simple	Medium	Complex
Skills	No special skills needed	HTML and CSS	Web development


Automatic collection

In your web container, open the Variables menu.
Create a new User-Defined Variable of the type User-Provided Data.
Set the Type to Automatic collection.
Name the variable, for example, My user-defined data.
Click Save.

Manual collection
In your web container, open the Variables menu.
Create a new User-Defined Variable of the type User-Provided Data.
Set the Type to Manual configuration.
For the relevant user data field that you would like to provide via enhanced conversions, add a new or existing variable.

Note: If you already have variables in your data layer (whether using CSS selectors or other variable types), you can select those instead of creating new variables. If you aren't sure, continue through the instructions. The variables may be hashed or unhashed.
To specify an element from the DOM, create a New Variable > Variable Configuration > DOM Element.

Under Selection Method, you can either use a CSS Selector or ID. Tip: If your CSS variables change frequently, add an HTML ID to your site and use the ID variable.

Enter the CSS selector or ID name. You can leave the Attribute name field blank.

Name and Save the DOM Element variable. Your screen will then return to the User-Provided Data settings.

Name the User-Provided Data variable, for example, My user-defined data.

Click Save.

Code configuration

Step 1: Identify and define your enhanced conversions variables
You can either send unhashed data, which Google will hash before the data reaches the servers, or pre-hashed data. If you decide to send pre-hashed data, please encode the data using hex-encoded SHA256. In either case, provide at least one of the following fields: email or phone_ number.
To push unhashed data to the data layer:

On your website, store user-provided data as key-value pairs in a JavaScript variable. For example:


var leadsUserData = {
  'email': 'name@example.com',
  'phone_number': '+11234567890',
  'address': {
    first_name: 'John',
    last_name: 'Doe',
    street: '123 Lemon',
    city: 'Some city',
    region: 'CA',
    country: 'US',
    postal_code: '12345',
  },
};
Code Tutor
expand_more
Send the user data together with an event using dataLayer.push(). For example:


<script>
  dataLayer.push({
    'event': 'formSubmitted',
    'leadsUserData': {
      'email': 'name@example.com',
      'phone_number': '+11234567890',
      'address': {
         first_name: 'John',
         last_name: 'Doe',
         street: '123 Lemon',
         city: 'Some city',
         region: 'CA',
         country: 'US',
        postal_code: '12345',
       },
     },
  });
<script>
Code Tutor
expand_more
The variable leadsUserData is now available in Google Tag Manager.

To push pre-hashed data to the data layer:

On your website, hash user-provided using hex-encoded SHA256. The key for encoded data needs to start with sha256_. For example:


{'sha256_email_address':await hashEmail(email.trim()),
}
Code Tutor
expand_more
Send the user data together with an event using dataLayer.push(). The example below shows a data layer implementation that assumes you have written a hashing function yourself, which you run asynchronously.


<script>
  dataLayer.push({
    'event': 'formSubmitted',
    'leadsUserData': {
      'sha256_email_address': await hashEmail(email.trim()),
      'sha256_phone_number': await hashPhoneNumber(phoneNumber),
      'address': {
        sha265_first_name: await hashString(firstname),
        sha256_last_name: await hashString(lastname),
        sha256_street: await hashString(streetAddress),
        postal_code: '12345',
       },
     },
  });
<script>
Code Tutor
expand_more
The variable leadsUserData is now available in Google Tag Manager.

Step 2: Create the user-provided data variable
In your web container, open the Variables menu.
Create a new User-Defined Variable of the type User-Provided Data.
Set the Type to Code.
For the relevant user data field you want to provide, click the drop-down menu and select New Variable.
Under Choose Variable Type, select Data Layer Variable.
In the Data Layer Variable, reference your stored user data. For example, leadsUserData.
Name and Save the Data Layer variable. Your screen will then return to the User-Provided Data settings.
Name the User-Provided Data variable, for example, My user-defined data.
Click Save.
Assign the variable to the Google tag
In your web container, open the Tags menu.
Edit the Google tag you use to send data to the tagging server.
Under Configuration settings, add a new Configuration parameter called user_data. Set the Value to the User-provided Data variable, for example, {{My user-provided data}}.
Save your changes. 


Step 4: Validate your setup 
Once you start sending data with the server container, you can check to see if it’s working properly by following these steps:

Open your website.
In your Google Tag Manager server container, select Preview. Tag Assistant will start and load your server container.
The Tags tab shows you all tags that have fired. Make sure to check if the tag you configured fired.
The Console tab shows any errors that occurred during the data transmission to the server container. Check for errors and resolve them.
For more help with debugging Tag Manager containers see preview and debug help.

