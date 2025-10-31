# Understanding Cookies

**Source:** Blog / Engineering  
**Author:** Lydia Hallie (Staff Developer Advocate)  
**Reading Time:** 3 min  
**Published:** Nov 1, 2023

## Overview

Cookies are small pieces of data stored by web browsers on a user's device at the request of web servers. They are sent back unchanged by the browser each time it accesses that server.

### Primary Functions

- Maintaining user sessions
- Remembering user preferences
- Tracking user behavior

## How Cookies Work

### Cookie Flow

1. **Server Response:** When a user visits a website, the server sends a `Set-Cookie` header in its response
2. **Browser Storage:** The browser saves the cookie on the user's device
3. **Subsequent Requests:** The browser includes the cookie as the `Cookie` header for subsequent requests to the same domain or path

### Cookie Expiration

- **Expiration Attributes:** `Expires` or `Max-Age`
- **Session Cookies:** If neither attribute is set, the cookie is deleted when the browser is closed
- **Persistent Cookies:** Cookies with expiration time are automatically deleted after the specified time

## Set-Cookie Header Elements

### Required Elements

- **Name and Value:** The actual data in the cookie, formatted as `name=value`

### Scope Attributes

- **Domain:** Defines which domain receives the cookie
- **Path:** Defines which path within the domain receives the cookie
- **Rule:** Cookie is sent only to requests matching the specified domain and path

### Expiration Attributes

- **Expires:** Sets an exact date and time for cookie expiration
- **Max-Age:** Sets a duration (in seconds) for cookie expiration

### Security Attributes

#### Secure

- **Purpose:** Ensures cookie is sent only over HTTPS
- **Usage:** Prevents transmission over unencrypted connections

#### HttpOnly

- **Purpose:** Prevents client-side scripts from accessing the cookie
- **Security Benefit:** Reduces risk of cookie theft via XSS (Cross-Site Scripting) attacks

#### SameSite

- **Purpose:** Defines when the cookie should be sent to the server
- **Values:**
    - `Strict` - Cookie sent only to same-site requests
    - `Lax` - Cookie sent to same-site requests and top-level navigation
    - `None` - Cookie sent to all requests (requires `Secure` attribute)
- **Security Benefit:** Helps mitigate CSRF (Cross-Site Request Forgery) attacks

## Cookie Security Best Practices

### Essential Practices

1. **Use Security Attributes:**
     - Apply `Secure` and `HttpOnly` attributes wherever applicable
     - Set `SameSite` attribute appropriately to mitigate CSRF attacks

2. **Limit Lifespan:**
     - Set cookies to expire as soon as they're no longer needed
     - Use appropriate `max-age` or `expires` values

3. **Avoid Sensitive Data:**
     - Never store passwords directly in cookies
     - Never store personal identification numbers in cookies
     - Avoid storing any sensitive user data in plain text

## Inspecting and Debugging Cookies

### Google Chrome Developer Tools

#### Accessing Developer Tools

- Press `F12`, or
- Right-click and select "Inspect"
- Navigate to the "Application" tab

#### Viewing Cookies

1. In the left-hand sidebar, expand the "Cookies" section under "Storage"
2. Click on a domain to view all cookies set by that domain
3. View cookie details in table format:
     - Name
     - Value
     - Domain
     - Path
     - Expiration date
     - Security attributes (`Secure`, `HttpOnly`, `SameSite`)

#### Developer Tools Features

- **Real-time Updates:** Monitor cookies as they are created, modified, or deleted
- **Direct Manipulation:** Edit cookie values or attributes directly
- **Scenario Testing:** Simulate different scenarios for thorough testing
- **Troubleshooting:** Debug issues such as:
    - Incorrect cookie settings
    - Session persistence problems
    - Cookie-based authentication issues
    - Unexpected cookie behavior

## Key Takeaways

- Cookies enable servers to remember user-specific information across requests
- Cookie behavior is configurable through multiple attributes (`Domain`, `Path`, `Secure`, `HttpOnly`, `SameSite`)
- Security attributes are crucial for protecting against XSS and CSRF attacks
- Browser Developer Tools provide comprehensive cookie inspection and debugging capabilities
- Always prioritize security when implementing cookie-based functionality

