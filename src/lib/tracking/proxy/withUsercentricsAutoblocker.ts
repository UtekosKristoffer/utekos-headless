import { NextResponse } from 'next/server'
import { USERCENTRICS_AUTOBLOCKER_SCRIPT_TAG } from './usercentricsAutoblockerMarkup'

interface HtmlRewriterElement {
  prepend(content: string, options: { html: true }): void
}

interface HtmlRewriterInstance {
  on(
    selector: string,
    handlers: {
      element(element: HtmlRewriterElement): void
    }
  ): HtmlRewriterInstance
  transform(response: Response): Response
}

type HtmlRewriterConstructor = new () => HtmlRewriterInstance

/**
 * Prepends Usercentrics autoblocker before Next.js head chunks.
 * Next.js 16 injects `/_next/static/chunks/*` ahead of layout `<head>` children,
 * which breaks autoblocker unless we rewrite the HTML response in `src/proxy.ts`.
 */
export function withUsercentricsAutoblocker(response: NextResponse): NextResponse {
  const HTMLRewriterGlobal = (globalThis as { HTMLRewriter?: HtmlRewriterConstructor }).HTMLRewriter

  if (!HTMLRewriterGlobal) {
    return response
  }

  return new HTMLRewriterGlobal()
    .on('head', {
      element(element) {
        element.prepend(USERCENTRICS_AUTOBLOCKER_SCRIPT_TAG, { html: true })
      }
    })
    .transform(response) as NextResponse
}
