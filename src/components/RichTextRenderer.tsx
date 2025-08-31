// Path: src/components/RichTextRenderer.tsx

'use client'

/**
 * @fileoverview The main entry-point for the rich text rendering system.
 * This module exports a React component that takes a complete rich text AST
 * and renders it into a React tree.
 *
 * @module components/RichTextRenderer
 */

import React from 'react'
import renderNode from './renderNode'
import type { RootNode } from '@/types/interface'
import type { RenderableNode } from '@/types'

interface RichTextRendererProps {
  /** The root node of the rich text Abstract Syntax Tree (AST) to be rendered. */
  content: RootNode | null
}

/**
 * Renders a complete rich text document from an AST structure.
 * This component serves as the public-facing entry point, orchestrating the
 * rendering process by delegating each individual node to the `renderNode` helper.
 *
 * @component
 * @param {RichTextRendererProps} props - The properties for the component.
 * @returns {React.ReactElement | null} A React Fragment containing the rendered
 * rich text content, or `null` if the content is empty or invalid.
 */
export function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content?.children?.length) {
    return null
  }

  return <>{content.children.map(renderNode as (node: RenderableNode, index: number) => React.ReactNode)}</>
}

export default RichTextRenderer
