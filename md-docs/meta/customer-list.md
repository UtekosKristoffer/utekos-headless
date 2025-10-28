# Prepare Your Customer List

A customer list is a file containing information about your customers, such as
names and email addresses, which are called **identifiers**. We use identifiers
to match your customers to Facebook and Instagram users.

## Requirements

Customer lists should:

- Be either **CSV** or **TXT** files
- Include at least **100 customers**
- Include at least **one main identifier**
- Use the correct column formatting that matches each identifier type

> **⚠️ Important:** Columns that are not formatted correctly in your customer
> list file can result in errors during the creation process. Please use our
> formatting guidelines to carefully prepare your list or use the template
> provided.

---

## Formatting Guidelines

The following list shows the information types that Meta accepts and how to
format them correctly. Before the information is sent to us, your list of
identifiers gets hashed into random code. [About hashing](#)

---

## Main Identifiers

### Email

| Property                  | Details                                                                                                                                  |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Column header**         | `email`                                                                                                                                  |
| **Formatting guidelines** | We accept email addresses in up to three separate columns. Only one email can go in each cell. All universal email formats are accepted. |
| **Examples**              | `Emily@example.com`<br>`John@example.com`<br>`Helena@example.com`                                                                        |

### Phone Number

| Property                  | Details                                                                                                                                                                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Column header**         | `phone`                                                                                                                                                                                                                                                                  |
| **Formatting guidelines** | Phone numbers must include a country code to be used for matching, even if they're all from the same country. For example, a one must precede a phone number in the United States. We accept phone numbers in up to three separate columns, with or without punctuation. |
| **Examples**              | `1(222)333-4444`<br>`001(222)333-4444`<br>`+12223334444`                                                                                                                                                                                                                 |

> **⚠️ Important:** Make sure that you include the country code as part of your
> customer's phone number, even if all of your data is from the same country.

### Mobile Advertiser ID

| Property                  | Details                                                                                                                                                                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Column header**         | `madid`                                                                                                                                                                                                                                 |
| **Formatting guidelines** | We accept 2 types of mobile advertiser IDs: Android's Advertising ID (AAID), which Google provides as part of Android advertising, and Apple's Advertising Identifier (IDFA), which Apple provides as part of iOS in its ads framework. |
| **Examples**              | `AECE52E7-03EE-455A-B3C4-E57283966239`<br>`BEBE52E7-03EE-455A-B3C4-E57283966239`                                                                                                                                                        |

### Facebook App User ID

| Property                  | Details                                                                                                                                                                |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Column header**         | `appuid`                                                                                                                                                               |
| **Formatting guidelines** | An ID corresponding to someone who uses an app that can be retrieved through the Facebook SDK. We accept numerical user IDs associated with your Facebook application. |
| **Examples**              | `1234567890`<br>`1443637309`<br>`1234567892`                                                                                                                           |

### Facebook Page User ID

| Property                  | Details                                                                                                                                                                                                                           |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Column header**         | `pageuid`                                                                                                                                                                                                                         |
| **Formatting guidelines** | An ID corresponding to someone who has interacted with your business's Facebook Page. This does not refer to a user's personal Facebook profile page. We accept numerical user IDs associated with your business's Facebook Page. |
| **Examples**              | `1234567890`<br>`1443637309`<br>`1234567892`                                                                                                                                                                                      |

### Instagram Scoped User ID

| Property                  | Details                                                                                                                                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Column header**         | `iguid`                                                                                                                                                                                                                              |
| **Formatting guidelines** | An ID corresponding to someone who has interacted with your business's Instagram Page. This does not refer to a user's personal Instagram profile page. We accept numerical user IDs associated with your business's Instagram Page. |
| **Examples**              | `1234567890`<br>`1443637309`<br>`1234567892`                                                                                                                                                                                         |

---

## Customer Value · Optional

**✅ Recommended**

### Customer Value

| Property                  | Details                                                                                                                                                                                                                 |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Column header**         | `value`                                                                                                                                                                                                                 |
| **Formatting guidelines** | Customer value is a value associated with your customers based on how much and how often they spend towards your business.<br><br>**Value columns must contain a numeric value only, without any currency characters.** |
| **Examples**              | `0`<br>`0.1`<br>`3`<br>`20`                                                                                                                                                                                             |

#### How to Use This Column

Adding customer value as a column in your customer list allows you to create a
value-based lookalike later on to find people similar to your most valuable
customers.

---

## Additional Identifiers · Optional

### First Name

| Property                  | Details                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Column header**         | `fn`                                                                                                                     |
| **Formatting guidelines** | We accept first name and first name initial, with or without accents. Initials can be provided with or without a period. |
| **Examples**              | `John`<br>`F.`<br>`Emily`                                                                                                |

### Last Name

| Property                  | Details                                            |
| ------------------------- | -------------------------------------------------- |
| **Column header**         | `ln`                                               |
| **Formatting guidelines** | We accept full last names with or without accents. |
| **Examples**              | `Smith`<br>`Sorensen`<br>`Jacobs-Anderson`         |

### City

| Property                  | Details                                   |
| ------------------------- | ----------------------------------------- |
| **Column header**         | `ct`                                      |
| **Formatting guidelines** | We accept full names of towns and cities. |
| **Examples**              | `Menlo Park`<br>`Seattle`<br>`London`     |

### State/Province

| Property                  | Details                                                                                                              |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Column header**         | `st`                                                                                                                 |
| **Formatting guidelines** | We accept full names of US and international states and provinces, as well as the abbreviated versions of US states. |
| **Examples**              | `CA`<br>`California`<br>`Texas`                                                                                      |

### Country

| Property                  | Details                                                                                                                                                                                                                 |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Column header**         | `country`                                                                                                                                                                                                               |
| **Formatting guidelines** | Countries must be provided as an ISO two-letter country code, even if they're all from the same country. Because we match on a global scale, this simple step helps us match as many people as possible from your list. |
| **Examples**              | `US`<br>`GB`<br>`FR`                                                                                                                                                                                                    |

### ZIP/Postal Code

| Property                  | Details                                                                                                                                                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Column header**         | `zip`                                                                                                                                                                                                               |
| **Formatting guidelines** | We accept US and international ZIP and postal codes. US ZIP codes may include a 4-digit extension as long as they are separated by a hyphen. The extension is not required and will not further improve match rate. |
| **Examples**              | `94025`<br>`94025-3215`<br>`L3T 5M7`                                                                                                                                                                                |

### Date of Birth

| Property                  | Details                                                                                                                                                                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Column header**         | `dob`                                                                                                                                                                                                                                              |
| **Formatting guidelines** | We accept 18 different date formats to accommodate a range of month, day and year combinations, with or without punctuation.                                                                                                                       |
| **Accepted formats**      | `MM-DD-YYYY` · `MM/DD/YYYY` · `MMDDYYYY`<br>`DD-MM-YYYY` · `DD/MM/YYYY` · `DDMMYYYY`<br>`YYYY-MM-DD` · `YYYY/MM/DD` · `YYYYMMDD`<br>`MM-DD-YY` · `MM/DD/YY` · `MMDDYY`<br>`DD-MM-YY` · `DD/MM/YY` · `DDMMYY`<br>`YY-MM-DD` · `YY/MM/DD` · `YYMMDD` |

### Year of Birth

| Property                  | Details                                            |
| ------------------------- | -------------------------------------------------- |
| **Column header**         | `doby`                                             |
| **Formatting guidelines** | We accept year of birth as a 4-digit number, YYYY. |
| **Examples**              | `1978`<br>`1962`<br>`1990`                         |

### Gender

| Property                  | Details                                                                          |
| ------------------------- | -------------------------------------------------------------------------------- |
| **Column header**         | `gen`                                                                            |
| **Formatting guidelines** | We accept gender in the form of an initial, such as F for female and M for male. |
| **Examples**              | `M`<br>`F`                                                                       |

### Age

| Property                  | Details                             |
| ------------------------- | ----------------------------------- |
| **Column header**         | `age`                               |
| **Formatting guidelines** | We accept age as a numerical value. |
| **Examples**              | `65`<br>`42`<br>`21`                |

---

## Data Processing Options · Optional

### Data Processing Options

| Property                  | Details                                                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Column header**         | `data_processing_options`                                                                                                                        |
| **Formatting guidelines** | Use `"LDU"` to enable Limited Data Use for California based customers. Use no value for customers who haven't asked you to limit their data use. |
| **Examples**              | `LDU`<br>_(empty)_                                                                                                                               |

#### How to Use This Column

Use it to tell Meta to limit the data use of a customer in California.

### Data Processing Options - State

| Property                  | Details                                                                                                                                                                         |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Column header**         | `data_processing_options_state`                                                                                                                                                 |
| **Formatting guidelines** | Use `1000` for customers in California. Use `0` or no value for customers who aren't in California (or if you don't know where they are). Our system will check their location. |
| **Examples**              | `1000`<br>`0`                                                                                                                                                                   |

#### How to Use This Column

Use it to tell us if a customer is in California.

### Data Processing Options - Country

| Property                  | Details                                                                                                                                                                      |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Column header**         | `data_processing_options_country`                                                                                                                                            |
| **Formatting guidelines** | Use `1` for customers in the United States. Use `0` or no value for customers outside of the US (or if you don't know where they are). Our system will check their location. |
| **Examples**              | `1`<br>`0`                                                                                                                                                                   |

#### How to Use This Column

Use it to tell us if a customer is in the United States.
