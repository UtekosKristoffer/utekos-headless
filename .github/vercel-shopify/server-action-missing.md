# Failed to Find Server Action

## Why This Message Occurred

For security purposes, **Next.js** creates encrypted, non-deterministic keys (IDs) to allow the client to reference and call Server Actions. These keys are periodically recalculated between builds for enhanced security.

When self-hosting your Next.js application across multiple servers, each server instance may end up with a different encryption key, leading to potential inconsistencies.

---

## Possible Ways to Fix It

- **Set a Persistent Encryption Key:**  
    To mitigate this, set the `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` environment variable. This ensures that your encryption keys are persistent across builds, and all server instances use the same key.  
    > **Note:** This variable must be an AES-GCM encrypted value.

- **Vercel Deployments:**  
    If you are deploying your Next.js application to **Vercel**, you can use the [Skew Protection](https://vercel.com/docs/deployments/skew-protection) feature to ensure assets and functions from the previous version remain available, even after a new version is deployed.

---

## References

- [Next.js Server Actions Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- [Vercel Skew Protection](https://vercel.com/docs/deployments/skew-protection)
