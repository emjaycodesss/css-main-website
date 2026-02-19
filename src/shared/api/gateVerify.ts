/**
 * Gate verification API: Stickrun verify route (testapi.stickrun.net/verify).
 * Used by the gate landing flow to validate codes before showing the registration form.
 */

/** Base URL for Stickrun test API (override via VITE_GATE_VERIFY_URL in production if needed) */
const GATE_VERIFY_BASE =
  import.meta.env?.VITE_GATE_VERIFY_URL ?? 'https://testapi.stickrun.net';

/** Response shape when verify returns success (adjust if API returns different fields) */
export interface GateVerifySuccess {
  ok?: boolean;
  valid?: boolean;
  [key: string]: unknown;
}

/** Result of a verify request: success with optional payload, or error message */
export type GateVerifyResult =
  | { success: true; data?: GateVerifySuccess }
  | { success: false; message: string };

/**
 * Calls the Stickrun /verify/:code route with the given code.
 * GET /verify/:code — 2xx treated as success, 4xx as invalid code. Code is in the path, not the body.
 *
 * @param code - Verification code (e.g. from QR scan)
 * @returns Promise resolving to GateVerifyResult
 */
export async function verifyGateCode(code: string): Promise<GateVerifyResult> {
  const trimmed = code.trim();
  if (!trimmed) {
    return { success: false, message: 'Please enter the verification code' };
  }

  /** Code in path: /verify/:code */
  const url = `${GATE_VERIFY_BASE}/verify/${encodeURIComponent(trimmed)}`;
  let res: Response;

  try {
    res = await fetch(url, { method: 'GET' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { success: false, message: `Verification failed: ${message}. Please try again.` };
  }

  const contentType = res.headers.get('Content-Type') || '';

  if (res.ok) {
    let data: GateVerifySuccess | undefined;
    if (contentType.includes('application/json')) {
      try {
        data = (await res.json()) as GateVerifySuccess;
      } catch {
        // ignore JSON parse failure; success by status is enough
      }
    }
    return { success: true, data };
  }

  /* 4xx: invalid code or bad request */
  let message = 'Invalid code. Please try again.';
  if (contentType.includes('application/json')) {
    try {
      const body = (await res.json()) as { message?: string; error?: string };
      message = body.message || body.error || message;
    } catch {
      // use default message
    }
  }
  return { success: false, message };
}

/** Payload for POST /verify/verify-attendance (code, email, name, section, program) */
export interface VerifyAttendancePayload {
  code: string;
  email: string;
  name: string;
  section: string;
  program: string;
}

/** Success response from verify-attendance */
export interface VerifyAttendanceSuccess {
  success: true;
  message: string;
  verifyAttendance?: {
    verified: boolean;
    event_code: string;
    email: string;
    name: string;
    section: string;
    program: string;
    time_in: string;
  };
}

/** Result of submit verify-attendance */
export type VerifyAttendanceResult =
  | VerifyAttendanceSuccess
  | { success: false; message: string };

/**
 * POST /verify/verify-attendance — submit attendance after code verification.
 * Live: testapi.stickrun.net/verify/verify-attendance
 * Sends code, email, name, section, program in JSON body.
 *
 * @param payload - code (event code), email, name, section, program
 * @returns Promise resolving to VerifyAttendanceResult
 */
export async function submitVerifyAttendance(
  payload: VerifyAttendancePayload
): Promise<VerifyAttendanceResult> {
  const { code, email, name, section, program } = payload;
  const trimmedCode = (code || '').trim().toUpperCase();
  const trimmedEmail = (email || '').trim().toLowerCase();
  const trimmedName = (name || '').trim();
  const trimmedSection = (section || '').trim();
  const trimmedProgram = (program || '').trim();

  if (!trimmedCode) {
    return { success: false, message: 'Event code is required' };
  }
  if (!trimmedEmail) {
    return { success: false, message: 'Email is required' };
  }
  if (!trimmedName) {
    return { success: false, message: 'Name is required' };
  }
  if (!trimmedSection) {
    return { success: false, message: 'Section is required' };
  }
  if (!trimmedProgram) {
    return { success: false, message: 'Program is required' };
  }

  const url = `${GATE_VERIFY_BASE}/verify/verify-attendance`;
  let res: Response;

  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: trimmedCode,
        email: trimmedEmail,
        name: trimmedName,
        section: trimmedSection,
        program: trimmedProgram,
      }),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Network error';
    return { success: false, message: `Submission failed: ${msg}. Please try again.` };
  }

  const contentType = res.headers.get('Content-Type') || '';

  if (res.ok) {
    if (contentType.includes('application/json')) {
      try {
        const json = (await res.json()) as VerifyAttendanceSuccess & { error?: string };
        return {
          success: true,
          message: json.message ?? 'Attendance verified and recorded',
          verifyAttendance: json.verifyAttendance,
        };
      } catch {
        return { success: true, message: 'Attendance recorded' };
      }
    }
    return { success: true, message: 'Attendance recorded' };
  }

  /* 4xx/5xx: use API error message */
  let message = 'Submission failed. Please try again.';
  if (contentType.includes('application/json')) {
    try {
      const body = (await res.json()) as { error?: string; message?: string };
      message = body.error ?? body.message ?? message;
    } catch {
      // keep default
    }
  }
  return { success: false, message };
}
