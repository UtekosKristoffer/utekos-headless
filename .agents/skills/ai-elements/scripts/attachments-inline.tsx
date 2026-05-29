"use client";

import {
  Attachment,
  AttachmentHoverCard,
  AttachmentHoverCardContent,
  AttachmentHoverCardTrigger,
  AttachmentInfo,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
  getAttachmentLabel,
  getMediaCategory,
} from "@/app/components/ai-elements/attachments";
import { nanoid } from "nanoid";
import { memo, useCallback, useState } from "react";

type FileAttachment = {
  filename: string;
  id: string;
  mediaType: string;
  type: "file";
  url: string;
};

type SourceDocumentAttachment = {
  id: string;
  mediaType: string;
  sourceId: string;
  title: string;
  type: "source-document";
  url: string;
};

type ExampleAttachment = FileAttachment | SourceDocumentAttachment;

const initialAttachments: ExampleAttachment[] = [
  {
    filename: "mountain-landscape.jpg",
    id: nanoid(),
    mediaType: "image/jpeg",
    type: "file",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
  },
  {
    filename: "quarterly-report.pdf",
    id: nanoid(),
    mediaType: "application/pdf",
    type: "file",
    url: "",
  },
  {
    id: nanoid(),
    mediaType: "text/html",
    sourceId: "react-docs",
    title: "React Documentation",
    type: "source-document",
    url: "https://react.dev",
  },
  {
    filename: "podcast-episode.mp3",
    id: nanoid(),
    mediaType: "audio/mp3",
    type: "file",
    url: "",
  },
];

interface AttachmentItemProps {
  attachment: ExampleAttachment;
  onRemove: (id: string) => void;
}

const AttachmentItem = memo(({ attachment, onRemove }: AttachmentItemProps) => {
  const handleRemove = useCallback(
    () => onRemove(attachment.id),
    [onRemove, attachment.id],
  );

  const mediaCategory = getMediaCategory(attachment);
  const label = getAttachmentLabel(attachment);

  return (
    <AttachmentHoverCard key={attachment.id}>
      <AttachmentHoverCardTrigger asChild>
        <Attachment data={attachment} onRemove={handleRemove}>
          <div className="relative size-5 shrink-0">
            <div className="absolute inset-0 transition-opacity group-hover:opacity-0">
              <AttachmentPreview />
            </div>
            <AttachmentRemove className="absolute inset-0" />
          </div>
          <AttachmentInfo />
        </Attachment>
      </AttachmentHoverCardTrigger>

      <AttachmentHoverCardContent>
        <div className="space-y-3">
          {mediaCategory === "image" &&
            attachment.type === "file" &&
            attachment.url && (
              <div className="flex max-h-96 w-80 items-center justify-center overflow-hidden rounded-md border">
                <img
                  alt={label}
                  className="max-h-full max-w-full object-contain"
                  height={384}
                  src={attachment.url}
                  width={320}
                />
              </div>
            )}

          <div className="space-y-1 px-0.5">
            <h4 className="font-semibold text-sm leading-none">{label}</h4>
            {attachment.mediaType && (
              <p className="font-mono text-muted-foreground text-xs">
                {attachment.mediaType}
              </p>
            )}
          </div>
        </div>
      </AttachmentHoverCardContent>
    </AttachmentHoverCard>
  );
});

AttachmentItem.displayName = "AttachmentItem";

const Example = () => {
  const [attachments, setAttachments] =
    useState<ExampleAttachment[]>(initialAttachments);

  const handleRemove = useCallback((id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return (
    <div className="flex items-center justify-center p-8">
      <Attachments variant="inline">
        {attachments.map((attachment) => (
          <AttachmentItem
            attachment={attachment}
            key={attachment.id}
            onRemove={handleRemove}
          />
        ))}
      </Attachments>
    </div>
  );
};

export default Example;
