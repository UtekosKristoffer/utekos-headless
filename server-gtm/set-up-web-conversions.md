Set up your web conversions
Need help? Ask our AI agent for support


How do I add a conversion tag to my website?

What is the purpose of website conversion measurement?

Why are my conversions not being measured?
AI can make mistakes.
Learn more
Website conversion measurement analyzes specific actions that users take on your website after interacting with your Google Ads. These metrics can provide insights into user behavior and campaign performance. Understanding how users interact with your site after clicking an ad is crucial for optimizing your campaign. Learn more about conversion measurement.

This article will explain the steps you need to follow to set up your web conversion measurements. 

On this page
Get started with website conversion data sources
Set up a website conversion
Summary and next steps
Step 1: Get started with website conversion data sources
To measure conversions on your website, Google Ads will need access to data from your website. After you’ve entered your website domain, you can add your website data source:

Go to Summary within the Goals Goals Icon menu.
Select + Conversions on a website.
Select Conversions on a website.
Select Add URL.
Enter your website domain you want to measure conversions on.
To find the best way to connect, select Scan in order to:
Detect if your website has the Google tag available to create conversions directly. If you don’t have the Google tag on your website, you’ll be shown the Google tag code to put on your website.
Determine if the website is already set up with a property in Google Analytics. Connecting using Google Analytics is recommended if your website already has a Google Analytics property setup. In many cases this Google Analytics property will already have a Google Tag available, so you don’t need to connect it again.
You can select both Google tag and multiple Google Analytics accounts if you want to create both Google Ads conversions directly from your Google tag and reuse events from your Google Analytics account for conversion creation.
If the Google tag is detected or a linked Google Analytics account is detected, your website is set up to measure conversions. Select Done.
If a Google Analytics property is detected, but is not yet linked. You can link it by selecting Link. From the linking panel, select Link again, and then select Done.
If we don’t detect a Google tag or a Google Analytics account for your website, you’ll be prompted to set up a Google tag. Select Set up.
Follow the instructions to Set up your Google tag. You’ll need to complete this step before your web conversions will start measuring.
Note: To link a new Google Analytics 4 account, refer to the next section.
Set up a Google Analytics 4 web data source
Go to Summary within the GoalsGoals Icon menu.
Select + Create conversion action.
Select Conversions on a website and select Continue.
Select Add URL.
Select Scan.
If a Google Analytics account is available, you’ll see it displayed.
Choose the data you want to share by turning on the switch:
Import app and web metrics. Learn more about using Google Analytics metrics in Google Ads.
Import Google Analytics audiences. Learn more about remarketing audiences.
Select Link.
Select Done.
Note: When we detect that a Google Analytics property has app data streams, you’ll be prompted to use the Google Analytics property to measure activity in your apps.
To use Google Analytics to measure your app activity, select Use property.
“Conversion on a website” and “Conversion on an app” should both be checked.
Select Continue.
Step 2: Set up a website conversion
Part 1: Choose the conversion category you want to measure
Categories help you group multiple conversions together. The category should be the most closely related to the user action you are measuring. If you don’t find exactly what you are looking for, choose the next best category to sort your conversion.



Select a category from one of the top 4 categories recommended for you or select see all to view all category options.

If you have an existing conversion(s) already grouped into that category, Google will let you know how many conversions already exist in that category.
Note: To bulk create conversions from your Google Analytics 4 account, refer to the next section.
Bulk set up conversions using your Google Analytics property
If you selected a Google Analytics account in the previous step, you will also find an option to Bulk create conversions from your existing Google Analytics property at the bottom of the page.
Select Select property and choose from one of your properties if more than one is linked.
Check the box next to an existing event that you want to use as a conversion in your Google Ads account.
After you select an event, ensure to assign which category to assign it to from the drop down.
The category should be the most closely related to the user action you are measuring. If you don’t find exactly what you're looking for, choose the next best category to sort your conversion.
If you find the events you're looking for, select Select events.
If you don’t find the event you want to use, you can select + Create event to define a new one.
You can Name your event or leave the default event name.
Then select Create without code or Create with code:
To Create without code:
Select the data stream you want to use for this new event from the drop down.
Choose the trigger for your event (for example, do you want to define the event anytime a user lands on a specific page or when they complete a form submission).
Add the URL that you want to use to measure when a user lands on that page or completes a form submission.
To Create with code:
You will be given a code snippet in the Summary and next steps to add to your website or app.
This method works well if you want to track a specific button click instead of a URL.
Select Save event.
Select Select events.
Part 2: Define your conversion
If a predefined conversion suggestion is available, you can create a new conversion action by selecting Accept suggestions.
If no suggestions are available or you have a different conversion in mind select + Add conversion actions to select from your website data sources added in the first step.
If you select Google tag, you'll create conversions directly using the Google tag.
If you select a Google Analytics property, you'll create conversions using your Google Analytics events.
Create conversions directly using the Google tag
Method 1: Set up conversions with a URL
Use this method if you want to track a page load as a conversion and you don’t need to collect transaction specific values like transaction IDs and/or other custom parameters. This is the fastest and easiest way to set up a conversion action.

When measuring website conversions with a codeless event, you can create an event that can be detected by your Google tag without adding any code to your website.

Select Enter the URL where the conversion is completed.
Select the event type which indicates what type of trigger you want to create for the event (like, do you want to define the event anytime a user lands on a specific page or when they complete a form submission).
Select the Match type for your URL:
You can add the exact page load URL with “URL is”
You can indicate the URL contains something like “thank-you”
You can indicate the URL starts with “confirmation/ “
Add your URL into the URL box.
[Optional] If you want to adjust any of the conversion settings select Conversion settings and adjust the following settings:
Action optimization
Conversion name
Value
Count
Click-through conversion window
Engaged-view conversion window
View-through conversion window
Attribution
Select Done.
Method 2: Set up conversions manually using code
Use this method if you need to measure clicks on buttons or links, or you want to customize your event tag with value tracking, transaction IDs, or other custom parameters.

Select Setup manually using code and you will receive instructions to implement the snippet through Google Tag or Google Tag Manager on the Summary and Next Steps.
[Optional] If you want to adjust any of the conversion settings, select Conversion settings and adjust the following settings:
Action optimization
Conversion name
Value
Count
Click-through conversion window
Engaged-view conversion window
View-through conversion window
Attribution
Select Done.
Select Save and continue to create the conversion.
Create conversions using your Google Analytics events
Method 1: Select from existing events
View a list of events available for use as conversions in Google Ads.
Check the box for the event(s) you can use as conversions for this category.
Select Select events.
Select Save and continue to create the conversion.
Method 2: Create a new conversion event with a URL
Select + Create event at the top of the table.
You can name your event or leave the default event name.
Select Create without code or Create with code:
To Create without code:
Select the data stream you want to use for this new event from the drop down.
Choose the trigger for your event (for example, do you want to define the event anytime a user lands on a specific page or when they complete a form submission).
Add the URL that you want to use to measure when a user lands on that page or completes a form submission.
Select Save event.
Select Select events.
Select Save and continue to create the conversion.
Method 3: Create a new conversion event with code
Select + Create event at the top of the table.
You can Name your event or leave the default event name.
Select Create without code or Create with code.
To Create with code:
You'll be given a code snippet in the Summary and next steps to add to your website or app.
This method works well if you want to track a specific button click instead of a URL.
Select Save event.
Select Select events.
Select Save and continue to create the conversion.
Step 3: Next steps
Now that you’ve created your conversions, review the next steps to ensure your conversions can be measured correctly.

View the conversion categories you created.
Activate measurement with a Google tag if you don’t already have one.
Select Set up on the Google tag.
Measure your individual conversions with an event snippet. Select See event snippet for instructions.
Set up your Google tag and event tags.
In the enhanced conversions section, click the switch to turn on enhanced conversions for your account.
Select Agree and finish.
Check your Google tag
If you want to make sure that your Google tag is installed and tracking conversions correctly, or you think that there may be a problem with the tag:

Go to Summary within the Goals Goals Icon menu.
In the conversion actions table, find the conversion action that you want to check in the "Name" column, then look at the "Status" column in that same row.