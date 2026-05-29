"use client";

import { SchemaDisplay } from "@/app/components/ai-elements/schema-display";

const Example = () => (
  <SchemaDisplay description="List all users" method="GET" path="/api/users" />
);

export default Example;
