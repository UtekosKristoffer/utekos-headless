// Path: src/types/api/validations/ValidationResult.ts
import type { CaptureBody } from '@types'
import type { NextResponse } from 'next/server'
export type ValidationResult =
  | { success: true; body: CaptureBody; token: string }
  | { success: false; errorResponse: NextResponse }
