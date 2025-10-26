# About Customer List Custom Audiences

> **Important:** Changes driven by ongoing efforts to align our products with
> evolving privacy rules in Europe may impact campaigns advertising to people in
> the European Region. Learn more about how European privacy directives may
> affect your ads and reporting.

## What is a Customer List Custom Audience?

A custom audience made from a customer list is a type of audience you can create
to connect with people who have already shown an interest in your business or
product. It's made of information - called "identifiers" - you've collected
about your customers (such as email, phone number and address) and provided to
Meta. Prior to use, Meta hashes this information.

Then, we use a process called **matching** to match the hashed information with
Meta technologies profiles so that you can advertise to your customers on
Facebook, Instagram and Meta Audience Network. The more information you can
provide, the better the match rate (which means our ability to make the
matches). Meta doesn't learn any new identifying information about your
customers.

> **Note:** Targeting options are limited for audiences that include people
> under 18 (or older in some countries). Learn more about targeting options to
> reach teens and how this update may impact your ad sets.

> **Note:** Changes related to Apple's Identifier for Advertisers (IDFA) in iOS
> 14 may affect your match rate when matching by mobile advertiser ID. You may
> improve your match rate if you add one or more of the following identifiers to
> supplement mobile advertiser ID: Email, phone number, Facebook app user ID,
> Facebook Page user ID, first name, last name.

---

## Create a Customer List Custom Audience

> **Important:** Changes driven by ongoing efforts to align our products with
> evolving privacy rules in Europe may impact campaigns advertising to people in
> the European Region. Learn more about how European privacy directives may
> affect your ads and reporting.

Review our terms to ensure you have a legal basis to use the information you
plan to upload. Under the General Data Protection Regulation (GDPR), advertisers
act as the data controller for any lists uploaded to create a custom audience.
(This includes people residing in the European Union). Visit our GDPR microsite
for more information.

> **Note:** Targeting options are limited for audiences that include people
> under 18 (or older in some countries). Learn more about targeting options to
> reach teens and how this update may impact your ad sets.

A custom audience is an ad targeting option that lets you find your existing
audiences among people across Meta technologies.

### Before You Begin

You must be the owner of the ad account connected to a business portfolio, or
have admin or advertiser permissions.

> **Note:** If your account is new or if you've recently linked to an existing
> account, it may take a few weeks before you're able to create or share a
> customer list custom audience. If your new account is part of a tenured
> business portfolio, you may be able to go through business verification.

### Steps to Create a Customer List Custom Audience

1. Open **Audiences** in Ads Manager.
2. Select **Create audience** then **Custom audience**.
   - If you haven't created an audience before, select **Create a custom
     audience**.
3. Select **Customer list**, then **Next**.
4. **Prepare list:** Follow the instructions to format your customer list.
   Select **Next**.
5. **Add list:** You can **Upload a file** or **Paste comma-separated values**.
   Let us know if your file includes a customer value column. You can choose an
   **Audience label**, **Audience name** and **Description** to help you
   identify and find your custom audience. Accept the custom audience terms,
   then select **Next**.
6. **Match columns:**
   - ✅ The check icon means your identifiers were mapped correctly and are
     ready to be hashed, then used for the matching process.
   - ⚠️ The exclamation point means either that you chose not to include certain
     identifiers or that some identifiers need to be manually updated. You have
     higher chances of getting a better match rate to build your audience if you
     make the corrections before uploading your file.
7. Select **Import and create**.

You'll return to Audience and see your audience **Populating**.

We'll let you know when your audience is **Ready**. Then you can create an ad to
reach your new custom audience, or create a lookalike audience to find new
people who share similar behaviors and interests with your existing customers.

> **Note:** Before we use your uploaded list for the matching process, the
> information in your customer list is hashed and will be unidentifiable at an
> individual level. Hashing is a type of cryptographic security method that
> turns your identifiers into randomized code and cannot be reversed. (Depending
> on the size of your list, this may take a few minutes.)

---

## Customer List Formatting Guidelines for Custom Audiences

A customer list is a file containing information about your customers, such as
names and email addresses, which are called identifiers. We use identifiers to
match your customers to Facebook and Instagram users.

### Before You Begin

Customer lists should:

- be either **CSV** or **TXT** files.
- include at least **100 customers**.
- include at least **one main identifier**.
- use the correct column formatting that matches each identifier type.

Meta uses hashing, a type of cryptographic security method, to match your
customer list to our platform securely.
[Learn more](#about-hashing-customer-information).

### Formatting Guidelines

#### Main Identifiers

You must add at least one. We recommend that you include more main identifiers
to increase the chances of getting a better match rate.

| Identifier                | Column Header | Formatting Guidelines                                                                                                                                                                                                                                                                                                                                                                                                          | Examples                                                                     |
| ------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| **Email**                 | `email`       | We accept email addresses in up to 3 separate columns. Only one email address can go in each cell. All universal email address formats are accepted.                                                                                                                                                                                                                                                                           | Emily@mail.com<br>John@mail.com<br>Helen@mail.com                            |
| **Phone number**          | `phone`       | Phone numbers must include a country code to be used for matching, even if they're all from the same country. For example, a one must precede a phone number in the United States. We accept phone numbers in up to 3 separate columns, with or without punctuation.<br><br>**Note:** Make sure that you include the country code as part of your customers' phone numbers, even if all of your data is from the same country. | 1(222)333-4444<br>001(222)333-4444<br>+12223334444                           |
| **Mobile Advertiser ID**  | `madid`       | We accept 2 types of mobile advertiser IDs: Android's advertising ID (AAID), which Google provides as part of Android advertising, and Apple's advertising identifier (IDFA), which Apple provides as part of iOS in its ads framework.                                                                                                                                                                                        | AECE52E7-03EE-455A-B3C4-E57283966239<br>BEBE52E7-03EE-455A-B3C4-E57283966239 |
| **Facebook app user ID**  | `appuid`      | An ID corresponding to someone who uses an app that can be retrieved through the Facebook SDK. We accept numerical user IDs associated with your Facebook application.                                                                                                                                                                                                                                                         | 1234567890<br>1443637309<br>1234567892                                       |
| **Facebook Page user ID** | `pageuid`     | An ID corresponding to someone who has interacted with your business' Facebook Page. This does not refer to a user's personal Facebook profile page. We accept numerical user IDs associated with your business' Facebook Page.                                                                                                                                                                                                | 1234567890<br>1443637309<br>1234567892                                       |

#### Customer Value (Optional)

[Learn more](#best-practices-when-using-customer-information-for-a-custom-audience).

| Identifier                                                                                                                                                                                     | Column Header | Formatting Guidelines                                                                                                                                                                                               | Examples            |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| **Value**<br><br>Adding customer value as a column in your customer list allows you to create a value-based lookalike later on to find people who are similar to your most valuable customers. | `value`       | Customer value is a value associated with your customers based on how much and how often they spend towards your business.<br><br>Value columns must contain a numeric value only, without any currency characters. | 0<br>0.1<br>3<br>20 |

#### Additional Identifiers (Optional)

We recommend using these identifiers along with at least one main identifier to
increase the chances of getting a better match rate.

| Identifier        | Column Header | Formatting Guidelines                                                                                                                                                                                                                                                                                                                                          | Examples                             |
| ----------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| **First name**    | `fn`          | We accept first name and first name initial, with or without accents. Initials can be provided with or without a period.                                                                                                                                                                                                                                       | John<br>F.<br>Émilie                 |
| **Last Name**     | `ln`          | We accept full last names with or without accents.                                                                                                                                                                                                                                                                                                             | Smith<br>Sørensen<br>Jacobs-Anderson |
| **City**          | `ct`          | We accept full names of towns and cities.                                                                                                                                                                                                                                                                                                                      | Menlo Park<br>Seattle<br>London      |
| **County/Region** | `st`          | We accept full names of US and international states and provinces, as well as the abbreviated versions of US states.                                                                                                                                                                                                                                           | CA<br>California<br>Texas            |
| **Country**       | `country`     | Countries must be provided as an ISO two-letter country code, even if they're all from the same country. Because we match on a global scale, this simple step helps us match as many people as possible from your list.                                                                                                                                        | US<br>GB<br>FR                       |
| **Zip/postcode**  | `zip`         | We accept US and international ZIP and postcodes. US ZIP codes may include a 4-digit extension as long as they are separated by a hyphen. The extension is not required and will not further improve match rate.                                                                                                                                               | 94025<br>94025-3215<br>L3T 5M7       |
| **Date of birth** | `dob`         | We accept 18 different date formats to accommodate a range of month, day and year combinations, with or without punctuation.<br><br>MM-DD-YYYY<br>MM/DD/YYYY<br>MMDDYYYY<br>DD-MM-YYYY<br>DD/MM/YYYY<br>DDMMYYYY<br>YYYY-MM-DD<br>YYYY/MM/DD<br>YYYYMMDD<br>MM-DD-YY<br>MM/DD/YY<br>MMDDYY<br>DD-MM-YY<br>DD/MM/YY<br>DDMMYY<br>YY-MM-DD<br>YY/MM/DD<br>YYMMDD |                                      |
| **Year of birth** | `doby`        | We accept year of birth as a 4-digit number, YYYY.                                                                                                                                                                                                                                                                                                             | 1978<br>1962<br>1990                 |
| **Gender**        | `gen`         | We accept gender in the form of an initial, such as 'F' for female and 'M' for male.                                                                                                                                                                                                                                                                           | M<br>F                               |
| **Age**           | `age`         | We accept age as a numerical value.                                                                                                                                                                                                                                                                                                                            | 65<br>42<br>21                       |

---

## Best Practices When Using Customer Information for a Custom Audience

When making a custom audience based on information customers have shared with
you, include as much of it as possible to get the best match rates. This
information - known as an "identifier" such as email, phone number, address -
may come from customer lists you've prepared, or from Meta Pixel or offline
events.

Once you've collected the information, format it into a CSV or TXT file. (Check
out our
[guidelines for how to format custom audience lists](#customer-list-formatting-guidelines-for-custom-audiences)).

If you're using multiple identifier types, make sure that your information is
organized into separate columns that correspond to the types we accept. For
example, don't include a single column for full names. Instead, include 2
columns - one for first names, one for last names.

Separating each identifier into its own column header type ensures compatibility
with the formats we accept before the information is hashed. (If you use your
own column headers, you'll have to manually map an identifier to its type before
uploading your list).

### The Two Most Important Tips

1. **When using phone numbers on your list, always include the country code** -
   even if all the numbers are from the same country.
2. **When using a country on your list, always include it in its own column** -
   even if all your data is from the same country. (This is because we match on
   a global scale, so this helps us match as many people as possible from your
   list).

---

## About Hashing Customer Information

Hashing is a type of cryptographic security method which turns the information
in your customer list into randomized code. The process cannot be reversed.

For customer lists, automatic advanced matching and the Conversions API, some
customer information is hashed before it's sent to Meta technologies. Meta uses
this hashed information and compares it to our own hashed information to build
custom audiences or more accurately determine which people took action in
response to your ad.

The hashed customer information, whether matched or not, is deleted promptly
after the match process is complete.

---

## How to Share Custom Audience Lists

> **Important:** To keep our platform safe from harm and to prevent advertising
> abuse, we only grant access to some features when an advertiser has met
> certain requirements. This means when you create a new business portfolio or
> ad account, you may not have access to all advertising features. You can see
> what features you currently have access to, and find out what actions you may
> need to take to access additional features in Business Support Home.

Shared audiences are a way to allow other people access to the audiences you've
created for your ads. You can share custom audience lists between ad accounts as
long as both the sharer and recipient are tied to a business portfolio and
establish an audience sharing relationship.

> **Note:** While you can create and share lookalike audiences for all other
> types of custom audiences, you can't use a shared audience to create a
> lookalike audience.

> **Note:** If your account is new or if you've recently linked to an existing
> account, it may take a few weeks before you're able to create or share a
> customer list custom audience. If your new account is part of a tenured
> business portfolio, you may be able to go through business verification.

### Before You Begin

- Both entities must have a business portfolio.
- A person with full control of the business portfolio with the audience that
  needs to be shared must start the sharing process.
- If you're sharing an audience for the first time, you must accept our terms of
  service.

### Sharing for the First Time

1. Go to your **Audiences**.
2. Check the boxes next to the audiences you want to share.
3. Click the **Share** button.
4. Select or enter the ad account numbers you want to share the audiences with.
5. Click the **Share** button and the audience will be shared.

Now, you've sent the partnership request to the business portfolio that owns the
recipient ad account. Someone with full control of the business portfolio will
need to accept the partnership before the audience can be used in the recipient
ad account.

Once the one-time partnership request is accepted, you and other ad account
admins or advertisers can share additional audiences with that business
portfolio's ad accounts. Learn how to continue sharing audiences with ad
accounts you've established partnerships with.
