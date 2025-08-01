// File: src/components/RichTextRenderer.tsx
"use client";
import React from "react";


interface TextNode {
  type: "text";
  value: string;
  bold?: boolean;
  italic?: boolean;
}

interface ListItemNode {
  type: "list-item";
  children: TextNode[];
}

interface ListNode {
  type: "list";
  listType: "ordered" | "unordered";
  children: ListItemNode[];
}

interface ParagraphNode {
  type: "paragraph";
  children: TextNode[];
}

// A union type for any node that can appear inside the root's 'children' array.
type RootChildNode = ParagraphNode | ListNode;

// The top-level node. We export this so other components can use it.
export interface RootNode {
  type: "root";
  children: RootChildNode[];
}

// --- Recursive Node Renderer ---
// This function receives a single node and returns the corresponding JSX element.
const renderNode = (node: any, index: number): React.ReactNode => {
  // We use 'any' here for simplicity to handle the deeply nested children properties.
  switch (node.type) {
    case "paragraph":
      return <p key={index}>{node.children.map(renderNode)}</p>;

    case "list":
      const listItems = node.children.map(renderNode);
      if (node.listType === "unordered") {
        return (
          <ul key={index} className="list-disc list-inside space-y-1">
            {listItems}
          </ul>
        );
      }
      return (
        <ol key={index} className="list-decimal list-inside space-y-1">
          {listItems}
        </ol>
      );

    case "list-item":
      return <li key={index}>{node.children.map(renderNode)}</li>;

    case "text":
      let textElement: React.ReactNode = node.value;
      if (node.bold) {
        textElement = <strong>{textElement}</strong>;
      }
      if (node.italic) {
        textElement = <em>{textElement}</em>;
      }
      return <React.Fragment key={index}>{textElement}</React.Fragment>;

    default:
      return null;
  }
};

// --- Main Component ---
// This is the entry point that starts the rendering process.
export function RichTextRenderer({ content }: { content: RootNode | null }) {
  if (!content || !content.children || content.children.length === 0) {
    return null;
  }

  // The component maps over the CHILDREN of the root node,
  // passing each child to the renderNode function.
  return <>{content.children.map(renderNode)}</>;
}
