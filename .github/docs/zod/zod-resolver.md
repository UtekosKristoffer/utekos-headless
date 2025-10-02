resolver: Resolver This function allows you to use any external validation
library such as Yup, Zod, Joi, Vest, Ajv and many others. The goal is to make
sure you can seamlessly integrate whichever validation library you prefer. If
you're not using a library, you can always write your own logic to validate your
forms.

Copy npm install @hookform/resolvers Props Name Type Description values object
This object contains the entire form values. context object This is the context
object which you can provide to the useForm config. It is a mutable object that
can be changed on each re-render. options { "criteriaMode": "string", "fields":
"object", "names": "string[]" } This is the option object containing information
about the validated fields, names and criteriaMode from useForm. RULES Schema
validation focuses on field-level error reporting. Parent-level error checking
is limited to the direct parent level, which is applicable for components such
as group checkboxes. This function will be cached. Re-validation of an input
will only occur one field at time during a user’s interaction. The lib itself
will evaluate the error object to trigger a re-render accordingly. A resolver
can not be used with the built-in validators (e.g.: required, min, etc.) When
building a custom resolver: Make sure that you return an object with both values
and errors properties. Their default values should be an empty object. For
example: {}. The keys of the errors object should match the name values of your
fields, but they must be hierarchical rather than a single key for deep errors:
❌ { "participants.1.name": someErr } will not set or clear properly - instead,
use ✅ { participants: [null, { name: someErr } ] } as this is reachable as
errors.participants[1].name - you can still prepare your errors using flat keys,
and then use a function like this one from the zod resolver:
toNestErrors(flatErrs, resolverOptions)

```ts
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const schema = z.object({
  name: z.string(),
  age: z.number(),
})

type Schema = z.infer<typeof schema>

const App = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  })

  return (
    <form
      onSubmit={handleSubmit((data) => {
        // handle inputs
        console.log(data)
      })}
    >
      <input {...register("name")} />
      <input {...register("age", { valueAsNumber: true })} type="number" />
      <input type="submit" />
    </form>
  )
}
```

```ts
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    age: yup.number().required(),
  })
  .required()

const App = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema), // yup, joi and even your own.
  })

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <input {...register("name")} />
      <input type="number" {...register("age")} />
      <input type="submit" />
    </form>
  )
}
```
