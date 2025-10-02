# Static and Dynamic Rendering

## Introduction

In the previous chapter, you fetched data for the Dashboard Overview page.
However, we briefly discussed two limitations of the current setup:

- The data requests are creating an unintentional waterfall.
- The dashboard is static, so any data updates will not be reflected on your
  application.

In this chapter...

### Topics Covered

- What static rendering is and how it can improve your application's
  performance.
- What dynamic rendering is and when to use it.
- Different approaches to make your dashboard dynamic.
- Simulate a slow data fetch to see what happens.

---

## What is Static Rendering?

With static rendering, data fetching and rendering happens on the server at
build time (when you deploy) or when revalidating data.

Whenever a user visits your application, the cached result is served. There are
a couple of benefits of static rendering:

- **Faster Websites**  
   Prerendered content can be cached and globally distributed when deployed to
  platforms like Vercel. This ensures that users around the world can access
  your website's content more quickly and reliably.
- **Reduced Server Load**  
   Because the content is cached, your server does not have to dynamically
  generate content for each user request. This can reduce compute costs.
- **SEO**  
   Prerendered content is easier for search engine crawlers to index, as the
  content is already available when the page loads. This can lead to improved
  search engine rankings.

Static rendering is useful for UI with no data or data that is shared across
users, such as a static blog post or a product page. It might not be a good fit
for a dashboard that has personalized data which is regularly updated.

The opposite of static rendering is dynamic rendering.

---

## What is Dynamic Rendering?

With dynamic rendering, content is rendered on the server for each user at
request time (when the user visits the page). There are a couple of benefits of
dynamic rendering:

- **Real-Time Data**  
   Dynamic rendering allows your application to display real-time or frequently
  updated data. This is ideal for applications where data changes often.
- **User-Specific Content**  
   It's easier to serve personalized content, such as dashboards or user
  profiles, and update the data based on user interaction.
- **Request Time Information**  
   Dynamic rendering allows you to access information that can only be known at
  request time, such as cookies or the URL search parameters.

---

## Simulating a Slow Data Fetch

The dashboard application we're building is dynamic.

However, there is still one problem mentioned in the previous chapter. What
happens if one data request is slower than all the others?

Let's simulate a slow data fetch. In `app/lib/data.ts`, uncomment the
`console.log` and `setTimeout` inside `fetchRevenue()`:

```typescript
// app/lib/data.ts

export async function fetchRevenue() {
  try {
    // We artificially delay a response for demo purposes.
    // Don't do this in production :)
    console.log('Fetching revenue data...')
    await new Promise(resolve => setTimeout(resolve, 3000))

    const data = await sql<Revenue[]>`SELECT * FROM revenue`

    console.log('Data fetch completed after 3 seconds.')

    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch revenue data.')
  }
}
```

Now open [http://localhost:3000/dashboard/](http://localhost:3000/dashboard/) in
a new tab and notice how the page takes longer to load. In your terminal, you
should also see the following messages:

```
Fetching revenue data...
Data fetch completed after 3 seconds.
```

Here, you've added an artificial 3-second delay to simulate a slow data fetch.
The result is that now your whole page is blocked from showing UI to the visitor
while the data is being fetched. Which brings us to a common challenge
developers have to solve:

> With dynamic rendering, your application is only as fast as your slowest data
> fetch.

---

## Fetching Data

Now that you've created and seeded your database, let's discuss the different
ways you can fetch data for your application, and build out your dashboard
overview page.

### Topics Covered

- Learn about some approaches to fetching data: APIs, ORMs, SQL, etc.
- How Server Components can help you access back-end resources more securely.
- What network waterfalls are.
- How to implement parallel data fetching using a JavaScript Pattern.

---

### Choosing how to fetch data

#### API layer

APIs are an intermediary layer between your application code and database. There
are a few cases where you might use an API:

- If you're using third-party services that provide an API.
- If you're fetching data from the client, you want to have an API layer that
  runs on the server to avoid exposing your database secrets to the client.

In Next.js, you can create API endpoints using Route Handlers.

#### Database queries

When you're creating a full-stack application, you'll also need to write logic
to interact with your database. For relational databases like Postgres, you can
do this with SQL or with an ORM.

There are a few cases where you have to write database queries:

- When creating your API endpoints, you need to write logic to interact with
  your database.
- If you are using React Server Components (fetching data on the server), you
  can skip the API layer, and query your database directly without risking
  exposing your database secrets to the client.

---

## Using Server Components to fetch data

By default, Next.js applications use React Server Components. Fetching data with
Server Components is a relatively new approach and there are a few benefits of
using them:

- Server Components support JavaScript Promises, providing a solution for
  asynchronous tasks like data fetching natively. You can use async/await syntax
  without needing useEffect, useState or other data fetching libraries.
- Server Components run on the server, so you can keep expensive data fetches
  and logic on the server, only sending the result to the client.
- Since Server Components run on the server, you can query the database directly
  without an additional API layer. This saves you from writing and maintaining
  additional code.

---

## Fetching data for the dashboard overview page

Now that you understand different ways of fetching data, let's fetch data for
the dashboard overview page. Navigate to `/app/dashboard/page.tsx`, paste the
following code, and spend some time exploring it:

```tsx
// app/dashboard/page.tsx

import { Card } from '@/app/ui/dashboard/cards'
import RevenueChart from '@/app/ui/dashboard/revenue-chart'
import LatestInvoices from '@/app/ui/dashboard/latest-invoices'
import { lusitana } from '@/app/ui/fonts'

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" /> */}
        {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
        {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
        {/* <Card
                    title="Total Customers"
                    value={numberOfCustomers}
                    type="customers"
                /> */}
      </div>
      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'>
        {/* <RevenueChart revenue={revenue}  /> */}
        {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
      </div>
    </main>
  )
}
```

The code above is intentionally commented out. We will now begin to example each
piece.

- The page is an async server component. This allows you to use await to fetch
  data.
- There are also 3 components which receive data: `<Card>`, `<RevenueChart>`,
  and `<LatestInvoices>`. They are currently commented out and not yet
  implemented.

---

### Fetching data for `<RevenueChart/>`

To fetch data for the `<RevenueChart/>` component, import the `fetchRevenue`
function from `data.ts` and call it inside your component:

```tsx
// app/dashboard/page.tsx

import { Card } from '@/app/ui/dashboard/cards'
import RevenueChart from '@/app/ui/dashboard/revenue-chart'
import LatestInvoices from '@/app/ui/dashboard/latest-invoices'
import { lusitana } from '@/app/ui/fonts'
import { fetchRevenue } from '@/app/lib/data'

export default async function Page() {
  const revenue = await fetchRevenue()
  // ...
}
```

Next, let's do the following:

- Uncomment the `<RevenueChart/>` component.
- Navigate to the component file (`/app/ui/dashboard/revenue-chart.tsx`) and
  uncomment the code inside it.

Let's continue importing more data and displaying it on the dashboard.

---

### Fetching data for `<LatestInvoices/>`

For the `<LatestInvoices />` component, we need to get the latest 5 invoices,
sorted by date.

You could fetch all the invoices and sort through them using JavaScript. This
isn't a problem as our data is small, but as your application grows, it can
significantly increase the amount of data transferred on each request and the
JavaScript required to sort through it.

Instead of sorting through the latest invoices in-memory, you can use an SQL
query to fetch only the last 5 invoices. For example, this is the SQL query from
your `data.ts` file:

```typescript
// app/lib/data.ts

// Fetch the last 5 invoices, sorted by date
const data = await sql<LatestInvoiceRaw[]>`
    SELECT invoices.amount, customers.name, customers.image_url, customers.email
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    ORDER BY invoices.date DESC
    LIMIT 5`
```

In your page, import the `fetchLatestInvoices` function:

```tsx
// app/dashboard/page.tsx

import { Card } from '@/app/ui/dashboard/cards'
import RevenueChart from '@/app/ui/dashboard/revenue-chart'
import LatestInvoices from '@/app/ui/dashboard/latest-invoices'
import { lusitana } from '@/app/ui/fonts'
import { fetchRevenue, fetchLatestInvoices } from '@/app/lib/data'

export default async function Page() {
  const revenue = await fetchRevenue()
  const latestInvoices = await fetchLatestInvoices()
  // ...
}
```

Then, uncomment the `<LatestInvoices />` component. You will also need to
uncomment the relevant code in the `<LatestInvoices />` component itself,
located at `/app/ui/dashboard/latest-invoices`.

---

### Practice: Fetch data for the `<Card>` components

Now it's your turn to fetch data for the `<Card>` components. The cards will
display the following data:

- Total amount of invoices collected.
- Total amount of invoices pending.
- Total number of invoices.
- Total number of customers.

Again, you might be tempted to fetch all the invoices and customers, and use
JavaScript to manipulate the data. For example, you could use `Array.length` to
get the total number of invoices and customers:

```js
const totalInvoices = allInvoices.length
const totalCustomers = allCustomers.length
```

But with SQL, you can fetch only the data you need. It's a little longer than
using `Array.length`, but it means less data needs to be transferred during the
request. This is the SQL alternative:

```typescript
// app/lib/data.ts

const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`
const customerCountPromise = sql`SELECT COUNT(*) FROM customers`
```

The function you will need to import is called `fetchCardData`. You will need to
destructure the values returned from the function.

**Hint:**

- Check the card components to see what data they need.
- Check the `data.ts` file to see what the function returns.

Once you're ready, expand the toggle below for the final code:

---

However... there are two things you need to be aware of:

1. The data requests are unintentionally blocking each other, creating a request
   waterfall.
2. By default, Next.js prerenders routes to improve performance, this is called
   Static Rendering. So if your data changes, it won't be reflected in your
   dashboard.

Let's discuss number 1 in this chapter, then look into detail at number 2 in the
next chapter.

---

## What are request waterfalls?

A "waterfall" refers to a sequence of network requests that depend on the
completion of previous requests. In the case of data fetching, each request can
only begin once the previous request has returned data.

> Diagram showing time with sequential data fetching and parallel data fetching

For example, we need to wait for `fetchRevenue()` to execute before
`fetchLatestInvoices()` can start running, and so on.

```typescript
// app/dashboard/page.tsx

const revenue = await fetchRevenue()
const latestInvoices = await fetchLatestInvoices() // wait for fetchRevenue() to finish
const {
  numberOfInvoices,
  numberOfCustomers,
  totalPaidInvoices,
  totalPendingInvoices
} = await fetchCardData() // wait for fetchLatestInvoices() to finish
```

This pattern is not necessarily bad. There may be cases where you want
waterfalls because you want a condition to be satisfied before you make the next
request. For example, you might want to fetch a user's ID and profile
information first. Once you have the ID, you might then proceed to fetch their
list of friends. In this case, each request is contingent on the data returned
from the previous request.

However, this behavior can also be unintentional and impact performance.

---

## Parallel data fetching

A common way to avoid waterfalls is to initiate all data requests at the same
time - in parallel.

In JavaScript, you can use the `Promise.all()` or `Promise.allSettled()`
functions to initiate all promises at the same time. For example, in `data.ts`,
we're using `Promise.all()` in the `fetchCardData()` function:

```typescript
// app/lib/data.ts

export async function fetchCardData() {
    try {
        const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
        const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
        const invoiceStatusPromise = sql`SELECT
                 SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
                 SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
                 FROM invoices`;

        const data = await Promise.all([
            invoiceCountPromise,
            customerCountPromise,
            invoiceStatusPromise,
        ]);
        // ...
    }
}
```

By using this pattern, you can:

- Start executing all data fetches at the same time, which is faster than
  waiting for each request to complete in a waterfall.
- Use a native JavaScript pattern that can be applied to any library or
  framework.

However, there is one disadvantage of relying only on this JavaScript pattern:
what happens if one data request is slower than all the others? Let's find out
more in the next chapter.

---

## Promise.all()

The `Promise.all()` static method takes an iterable of promises as input and
returns a single Promise. This returned promise fulfills when all of the input's
promises fulfill (including when an empty iterable is passed), with an array of
the fulfillment values. It rejects when any of the input's promises rejects,
with this first rejection reason.

```js
const promise1 = Promise.resolve(3)
const promise2 = 42
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo')
})

Promise.all([promise1, promise2, promise3]).then(values => {
  console.log(values)
})
// Expected output: Array [3, 42, "foo"]
```

### Syntax

```js
Promise.all(iterable)
```

#### Parameters

- **iterable**  
   An iterable (such as an Array) of promises.

#### Return value

A Promise that is:

- Already fulfilled, if the iterable passed is empty.
- Asynchronously fulfilled, when all the promises in the given iterable fulfill.
  The fulfillment value is an array of fulfillment values, in the order of the
  promises passed, regardless of completion order. If the iterable passed is
  non-empty but contains no pending promises, the returned promise is still
  asynchronously (instead of synchronously) fulfilled.
- Asynchronously rejected, when any of the promises in the given iterable
  rejects. The rejection reason is the rejection reason of the first promise
  that was rejected.

---

### Description

The `Promise.all()` method is one of the promise concurrency methods. It can be
useful for aggregating the results of multiple promises. It is typically used
when there are multiple related asynchronous tasks that the overall code relies
on to work successfully — all of whom we want to fulfill before the code
execution continues.

`Promise.all()` will reject immediately upon any of the input promises
rejecting. In comparison, the promise returned by `Promise.allSettled()` will
wait for all input promises to complete, regardless of whether or not one
rejects. Use `allSettled()` if you need the final result of every promise in the
input iterable.

---

### Examples

#### Using Promise.all()

Promise.all waits for all fulfillments (or the first rejection).

```js
const p1 = Promise.resolve(3)
const p2 = 1337
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo')
  }, 100)
})

Promise.all([p1, p2, p3]).then(values => {
  console.log(values) // [3, 1337, "foo"]
})
```

If the iterable contains non-promise values, they will be ignored, but still
counted in the returned promise array value (if the promise is fulfilled):

```js
// All values are non-promises, so the returned promise gets fulfilled
const p = Promise.all([1, 2, 3])
// The only input promise is already fulfilled,
// so the returned promise gets fulfilled
const p2 = Promise.all([1, 2, 3, Promise.resolve(444)])
// One (and the only) input promise is rejected,
// so the returned promise gets rejected
const p3 = Promise.all([1, 2, 3, Promise.reject(new Error('bad'))])

// Using setTimeout, we can execute code after the queue is empty
setTimeout(() => {
  console.log(p)
  console.log(p2)
  console.log(p3)
})

// Logs:
// Promise { <state>: "fulfilled", <value>: Array[3] }
// Promise { <state>: "fulfilled", <value>: Array[4] }
// Promise { <state>: "rejected", <reason>: Error: bad }
```

---

### Destructuring the result

You will find destructuring very useful if you are batching together a known
number of tasks.

```js
// With then()
Promise.all([p1, p2, p3]).then(([a, b, c]) => {
  console.log(a, b, c) // 3 1337 "foo"
})

// With await
const [a, b, c] = await Promise.all([p1, p2, p3])
```

Be careful: if the original promises and the result variables' order don't
match, you may run into subtle bugs.

---

### Asynchronicity or synchronicity of Promise.all

This following example demonstrates the asynchronicity of Promise.all when a
non-empty iterable is passed:

```js
// Passing an array of promises that are already resolved,
// to trigger Promise.all as soon as possible
const resolvedPromisesArray = [Promise.resolve(33), Promise.resolve(44)]

const p = Promise.all(resolvedPromisesArray)
// Immediately logging the value of p
console.log(p)

// Using setTimeout, we can execute code after the queue is empty
setTimeout(() => {
  console.log('the queue is now empty')
  console.log(p)
})

// Logs, in order:
// Promise { <state>: "pending" }
// the queue is now empty
// Promise { <state>: "fulfilled", <value>: Array[2] }
```

The same thing happens if Promise.all rejects:

```js
const mixedPromisesArray = [
  Promise.resolve(33),
  Promise.reject(new Error('bad'))
]
const p = Promise.all(mixedPromisesArray)
console.log(p)
setTimeout(() => {
  console.log('the queue is now empty')
  console.log(p)
})

// Logs:
// Promise { <state>: "pending" }
// the queue is now empty
// Promise { <state>: "rejected", <reason>: Error: bad }
```

Promise.all resolves synchronously if and only if the iterable passed is empty:

```js
const p = Promise.all([]) // Will be immediately resolved
const p2 = Promise.all([1337, 'hi']) // Non-promise values are ignored, but the evaluation is done asynchronously
console.log(p)
console.log(p2)
setTimeout(() => {
  console.log('the queue is now empty')
  console.log(p2)
})

// Logs:
// Promise { <state>: "fulfilled", <value>: Array[0] }
// Promise { <state>: "pending" }
// the queue is now empty
// Promise { <state>: "fulfilled", <value>: Array[2] }
```

---

### Using Promise.all() with async functions

Within async functions, it's very common to "over-await" your code. For example,
given the following functions:

```js
function promptForDishChoice() {
  return new Promise((resolve, reject) => {
    const dialog = document.createElement('dialog')
    dialog.innerHTML = `
<form method="dialog">
    <p>What would you like to eat?</p>
    <select>
        <option value="pizza">Pizza</option>
        <option value="pasta">Pasta</option>
        <option value="salad">Salad</option>
    </select>
    <menu>
        <li><button value="cancel">Cancel</button></li>
        <li><button type="submit" value="ok">OK</button></li>
    </menu>
</form>
        `
    dialog.addEventListener('close', () => {
      if (dialog.returnValue === 'ok') {
        resolve(dialog.querySelector('select').value)
      } else {
        reject(new Error('User cancelled dialog'))
      }
    })
    document.body.appendChild(dialog)
    dialog.showModal()
  })
}

async function fetchPrices() {
  const response = await fetch('/prices')
  return await response.json()
}
```

You may write a function like this:

```js
// Red background
async function getPrice() {
  const choice = await promptForDishChoice()
  const prices = await fetchPrices()
  return prices[choice]
}
```

However, note that the execution of `promptForDishChoice` and `fetchPrices`
don't depend on the result of each other. While the user is choosing their dish,
it's fine for the prices to be fetched in the background, but in the code above,
the await operator causes the async function to pause until the choice is made,
and then again until the prices are fetched. We can use Promise.all to run them
concurrently, so that the user doesn't have to wait for the prices to be fetched
before the result is given:

```js
// Green background
async function getPrice() {
  const [choice, prices] = await Promise.all([
    promptForDishChoice(),
    fetchPrices()
  ])
  return prices[choice]
}
```

Promise.all is the best choice of concurrency method here, because error
handling is intuitive — if any of the promises reject, the result is no longer
available, so the whole await expression throws.

Promise.all accepts an iterable of promises, so if you are using it to run
several async functions concurrently, you need to call the async functions and
use the returned promises. Directly passing the functions to Promise.all does
not work, since they are not promises.

```js
async function getPrice() {
  const [choice, prices] = await Promise.all([promptForDishChoice, fetchPrices])
  // `choice` and `prices` are still the original async functions;
  // Promise.all() does nothing to non-promises
}
```

---

### Promise.all fail-fast behavior

Promise.all is rejected if any of the elements are rejected. For example, if you
pass in four promises that resolve after a timeout and one promise that rejects
immediately, then Promise.all will reject immediately.

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('one'), 1000)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('two'), 2000)
})
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('three'), 3000)
})
const p4 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('four'), 4000)
})
const p5 = new Promise((resolve, reject) => {
  reject(new Error('reject'))
})

// Using .catch:
Promise.all([p1, p2, p3, p4, p5])
  .then(values => {
    console.log(values)
  })
  .catch(error => {
    console.error(error.message)
  })

// Logs:
// "reject"
```

It is possible to change this behavior by handling possible rejections:

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('p1_delayed_resolution'), 1000)
})

const p2 = new Promise((resolve, reject) => {
  reject(new Error('p2_immediate_rejection'))
})

Promise.all([p1.catch(error => error), p2.catch(error => error)]).then(
  values => {
    console.log(values[0]) // "p1_delayed_resolution"
    console.error(values[1]) // "Error: p2_immediate_rejection"
  }
)
```

---

## Promise.allSettled()

The `Promise.allSettled()` static method takes an iterable of promises as input
and returns a single Promise. This returned promise fulfills when all of the
input's promises settle (including when an empty iterable is passed), with an
array of objects that describe the outcome of each promise.

```js
const promise1 = Promise.resolve(3)
const promise2 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, 'foo')
)
const promises = [promise1, promise2]

Promise.allSettled(promises).then(results =>
  results.forEach(result => console.log(result.status))
)

// Expected output:
// "fulfilled"
// "rejected"
```

---

### Syntax

```js
Promise.allSettled(iterable)
```

#### Parameters

- **iterable**  
   An iterable (such as an Array) of promises.

#### Return value

A Promise that is:

- Already fulfilled, if the iterable passed is empty.
- Asynchronously fulfilled, when all promises in the given iterable have settled
  (either fulfilled or rejected). The fulfillment value is an array of objects,
  each describing the outcome of one promise in the iterable, in the order of
  the promises passed, regardless of completion order. Each outcome object has
  the following properties:
  - **status**  
     A string, either "fulfilled" or "rejected", indicating the eventual state
    of the promise.
  - **value**  
     Only present if status is "fulfilled". The value that the promise was
    fulfilled with.
  - **reason**  
     Only present if status is "rejected". The reason that the promise was
    rejected with.

If the iterable passed is non-empty but contains no pending promises, the
returned promise is still asynchronously (instead of synchronously) fulfilled.

---

### Description

The `Promise.allSettled()` method is one of the promise concurrency methods.
`Promise.allSettled()` is typically used when you have multiple asynchronous
tasks that are not dependent on one another to complete successfully, or you'd
always like to know the result of each promise.

In comparison, the Promise returned by `Promise.all()` may be more appropriate
if the tasks are dependent on each other, or if you'd like to immediately reject
upon any of them rejecting.

---

### Examples

#### Using Promise.allSettled()

```js
Promise.allSettled([
  Promise.resolve(33),
  new Promise(resolve => setTimeout(() => resolve(66), 0)),
  99,
  Promise.reject(new Error('an error'))
]).then(values => console.log(values))

// [
//   { status: 'fulfilled', value: 33 },
//   { status: 'fulfilled', value: 66 },
//   { status: 'fulfilled', value: 99 },
//   { status: 'rejected', reason: Error: an error }
// ]
```
