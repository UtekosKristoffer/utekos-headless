# Mutating Data

In the previous chapter, you implemented search and pagination using URL Search
Params and Next.js APIs. Let's continue working on the Invoices page by adding
the ability to create, update, and delete invoices!

---

## In this chapter...

### Topics Covered

- What React Server Actions are and how to use them to mutate data.
- How to work with forms and Server Components.
- Best practices for working with the native FormData object, including type
  validation.
- How to revalidate the client cache using the `revalidatePath` API.
- How to create dynamic route segments with specific IDs.

---

## What are Server Actions?

> React Server Actions allow you to run asynchronous code directly on the
> server.  
> They eliminate the need to create API endpoints to mutate your data.  
> Instead, you write asynchronous functions that execute on the server and can
> be invoked from your Client or Server Components.

**Security** is a top priority for web applications, as they can be vulnerable
to various threats.  
Server Actions include features like encrypted closures, strict input checks,
error message hashing, host restrictions, and more — all working together to
significantly enhance your application security.

---

## Using forms with Server Actions

In React, you can use the `action` attribute in the `<form>` element to invoke
actions.  
The action will automatically receive the native `FormData` object, containing
the captured data.

```tsx
// Server Component
export default function Page() {
  // Action
  async function create(formData: FormData) {
    'use server'
    // Logic to mutate data...
  }
  // Invoke the action using the "action" attribute
  return <form action={create}>...</form>
}
```

**Advantage:** Invoking a Server Action within a Server Component enables
progressive enhancement—forms work even if JavaScript has not yet loaded on the
client.

---

## Next.js with Server Actions

Server Actions are deeply integrated with Next.js caching.  
When a form is submitted through a Server Action, you can mutate data and
revalidate the associated cache using APIs like `revalidatePath` and
`revalidateTag`.

---

## Creating an invoice

### Steps

1. **Create a form** to capture the user's input.
2. **Create a Server Action** and invoke it from the form.
3. **Extract the data** from the `formData` object.
4. **Validate and prepare the data** to be inserted into your database.
5. **Insert the data** and handle any errors.
6. **Revalidate the cache** and redirect the user back to invoices page.

---

### 1. Create a new route and form

Inside the `/invoices` folder, add a new route segment called `/create` with a
`page.tsx` file:

```tsx
// /dashboard/invoices/create/page.tsx
import Form from '@/app/ui/invoices/create-form'
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'
import { fetchCustomers } from '@/app/lib/data'

export default async function Page() {
  const customers = await fetchCustomers()
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true
          }
        ]}
      />
      <Form customers={customers} />
    </main>
  )
}
```

Your page is a Server Component that fetches customers and passes it to the
`<Form>` component.

---

### 2. Create a Server Action

Navigate to your `lib/` directory and create a new file named `actions.ts`.  
At the top of this file, add the React `use server` directive:

```typescript
// /app/lib/actions.ts
'use server'

export async function createInvoice(formData: FormData) {}
```

In your `<Form>` component, import `createInvoice` and add an `action` attribute
to the `<form>` element:

```tsx
// /app/ui/invoices/create-form.tsx
import { createInvoice } from '@/app/lib/actions'

export default function Form({ customers }) {
  return <form action={createInvoice}>{/* ... */}</form>
}
```

---

### 3. Extract the data from formData

Use the `.get(name)` method:

```typescript
// /app/lib/actions.ts
'use server'

export async function createInvoice(formData: FormData) {
  const rawFormData = {
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status')
  }
  // Test it out:
  console.log(rawFormData)
}
```

---

### 4. Validate and prepare the data

Your invoices table expects data in the following format:

```typescript
// /app/lib/definitions.ts
export type Invoice = {
  id: string // Will be created on the database
  customer_id: string
  amount: number // Stored in cents
  status: 'pending' | 'paid'
  date: string
}
```

#### Type validation and coercion

Use Zod for validation:

```typescript
// /app/lib/actions.ts
'use server'
import { z } from 'zod'

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string()
})

const CreateInvoice = FormSchema.omit({ id: true, date: true })

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status')
  })
}
```

#### Storing values in cents

```typescript
const amountInCents = amount * 100
```

#### Creating new dates

```typescript
const date = new Date().toISOString().split('T')[0]
```

---

### 5. Inserting the data into your database

```typescript
import { z } from 'zod'
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status')
  })
  const amountInCents = amount * 100
  const date = new Date().toISOString().split('T')[0]

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `
}
```

---

### 6. Revalidate and redirect

Use `revalidatePath` and `redirect` from Next.js:

```typescript
'use server'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

export async function createInvoice(formData: FormData) {
  // ...
  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}
```

---

## Updating an invoice

### Steps

1. Create a new dynamic route segment with the invoice id.
2. Read the invoice id from the page params.
3. Fetch the specific invoice from your database.
4. Pre-populate the form with the invoice data.
5. Update the invoice data in your database.

---

### 1. Create a Dynamic Route Segment with the invoice id

Create a dynamic route called `[id]`, then a new route called `edit` with a
`page.tsx` file.

```tsx
// /app/ui/invoices/table.tsx
<td className='flex justify-end gap-2 whitespace-nowrap px-6 py-4 text-sm'>
  <UpdateInvoice id={invoice.id} />
  <DeleteInvoice id={invoice.id} />
</td>
```

```tsx
// /app/ui/invoices/buttons.tsx
export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className='rounded-md border p-2 hover:bg-gray-100'
    >
      <PencilIcon className='w-5' />
    </Link>
  )
}
```

---

### 2. Read the invoice id from page params

```tsx
// /app/dashboard/invoices/[id]/edit/page.tsx
import Form from '@/app/ui/invoices/edit-form'
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'
import { fetchCustomers } from '@/app/lib/data'

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const id = params.id
  // ...
}
```

---

### 3. Fetch the specific invoice

```tsx
// /dashboard/invoices/[id]/edit/page.tsx
import Form from '@/app/ui/invoices/edit-form'
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data'

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const id = params.id
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers()
  ])
  // ...
}
```

---

### 4. Pass the id to the Server Action

Use JS `bind`:

```tsx
// /app/ui/invoices/edit-form.tsx
import { updateInvoice } from '@/app/lib/actions'

export default function EditInvoiceForm({ invoice, customers }) {
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id)

  return <form action={updateInvoiceWithId}>{/* ... */}</form>
}
```

---

### 5. Update the invoice in your database

```typescript
// /app/lib/actions.ts
const UpdateInvoice = FormSchema.omit({ id: true, date: true })

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status')
  })

  const amountInCents = amount * 100

  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `

  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}
```

---

## Deleting an invoice

Wrap the delete button in a `<form>` and pass the id using `bind`:

```tsx
// /app/ui/invoices/buttons.tsx
import { deleteInvoice } from '@/app/lib/actions'

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id)

  return (
    <form action={deleteInvoiceWithId}>
      <button type='submit' className='rounded-md border p-2 hover:bg-gray-100'>
        <span className='sr-only'>Delete</span>
        <TrashIcon className='w-4' />
      </button>
    </form>
  )
}
```

```typescript
// /app/lib/actions.ts
export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`
  revalidatePath('/dashboard/invoices')
}
```

---

## Further reading

In this chapter, you learned how to use Server Actions to mutate data.  
You also learned how to use the `revalidatePath` API to revalidate the Next.js
cache and `redirect` to redirect the user to a new page.

You can also read more about security with Server Actions for additional
learning.
