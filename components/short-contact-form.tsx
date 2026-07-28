"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import { Check, LoaderCircle, RotateCcw, Send } from "lucide-react";
import { Button } from "@/components/button";

type SubmitState = "idle" | "submitting" | "success" | "error";

const googleForm = {
  action: process.env.NEXT_PUBLIC_GOOGLE_FORM_ACTION_URL?.trim() ?? "",
  fields: {
    name: process.env.NEXT_PUBLIC_GOOGLE_FORM_NAME_FIELD?.trim() ?? "",
    email: process.env.NEXT_PUBLIC_GOOGLE_FORM_EMAIL_FIELD?.trim() ?? "",
    organisation: process.env.NEXT_PUBLIC_GOOGLE_FORM_ORGANISATION_FIELD?.trim() ?? "",
    area: process.env.NEXT_PUBLIC_GOOGLE_FORM_AREA_FIELD?.trim() ?? "",
    message: process.env.NEXT_PUBLIC_GOOGLE_FORM_MESSAGE_FIELD?.trim() ?? "",
    timing: process.env.NEXT_PUBLIC_GOOGLE_FORM_TIMING_FIELD?.trim() ?? ""
  }
};

const googleFieldNames = Object.values(googleForm.fields);
const isGoogleFormConfigured =
  /^https:\/\/docs\.google\.com\/forms\/d\/e\/.+\/formResponse$/.test(googleForm.action) &&
  googleFieldNames.every((fieldName) => /^entry\.\d+$/.test(fieldName)) &&
  new Set(googleFieldNames).size === googleFieldNames.length;

const localFields = {
  organisation: "contactOrganisation",
  subject: "contactSubject",
  message: "contactMessage"
} as const;

const directEmailHref = "mailto:info@marcpaul.tech?subject=General%20enquiry";

function getTextValue(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName);
  return typeof value === "string" ? value.trim() : "";
}

function buildMessage(formData: FormData) {
  const subject = getTextValue(formData, localFields.subject);
  const message = getTextValue(formData, localFields.message);
  return `Subject\n${subject}\n\nMessage\n${message}`;
}

export function ShortContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const organisationRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLInputElement>(null);
  const timingRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const submittedRef = useRef(false);
  const submitTimerRef = useRef<number | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const frameName = `general-contact-${useId().replace(/:/g, "")}`;

  useEffect(
    () => () => {
      if (submitTimerRef.current) window.clearTimeout(submitTimerRef.current);
    },
    []
  );

  useEffect(() => {
    if (submitState !== "success") return;
    const frame = window.requestAnimationFrame(() => successRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [submitState]);

  const showSubmissionError = (reason: "configuration" | "timeout" | "frame") => {
    submittedRef.current = false;
    if (submitTimerRef.current) window.clearTimeout(submitTimerRef.current);
    setSubmitState("error");
    track("General Contact Form Error", { location: "contact-page", reason });
    window.requestAnimationFrame(() => errorRef.current?.focus());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (
      !isGoogleFormConfigured ||
      !organisationRef.current ||
      !messageRef.current ||
      !timingRef.current
    ) {
      event.preventDefault();
      showSubmissionError("configuration");
      return;
    }

    const formData = new FormData(event.currentTarget);
    organisationRef.current.value =
      getTextValue(formData, localFields.organisation) || "Not provided";
    messageRef.current.value = buildMessage(formData);
    timingRef.current.value = new Date().toISOString().slice(0, 10);

    submittedRef.current = true;
    setSubmitState("submitting");
    track("General Contact Form Submit", { location: "contact-page" });

    if (submitTimerRef.current) window.clearTimeout(submitTimerRef.current);
    submitTimerRef.current = window.setTimeout(() => {
      if (submittedRef.current) showSubmissionError("timeout");
    }, 15000);
  };

  const handleFrameLoad = () => {
    if (!submittedRef.current) return;

    submittedRef.current = false;
    if (submitTimerRef.current) window.clearTimeout(submitTimerRef.current);
    formRef.current?.reset();
    setSubmitState("success");
    track("General Contact Form Success", { location: "contact-page" });
  };

  const resetForm = () => {
    setSubmitState("idle");
    window.requestAnimationFrame(() => {
      formRef.current
        ?.querySelector<HTMLInputElement>('input:not([type="hidden"])')
        ?.focus();
    });
  };

  return (
    <>
      {submitState === "success" ? (
        <div
          ref={successRef}
          className="contact-form-success"
          role="status"
          aria-live="polite"
          tabIndex={-1}
        >
          <span className="contact-form-success-icon" aria-hidden="true">
            <Check size={28} strokeWidth={1.8} />
          </span>
          <p className="contact-dialog-kicker">Message received</p>
          <h3>Thank you. I received your message.</h3>
          <p>I will reply by email.</p>
          <div className="contact-form-success-actions">
            <Button
              type="button"
              variant="secondary"
              className="button-contact-secondary"
              onClick={resetForm}
              icon={<RotateCcw size={17} />}
              isCta={true}
            >
              Send another message
            </Button>
          </div>
        </div>
      ) : (
        <form
          ref={formRef}
          className="contact-form"
          action={isGoogleFormConfigured ? googleForm.action : undefined}
          method="post"
          target={frameName}
          aria-busy={submitState === "submitting"}
          onSubmit={handleSubmit}
        >
          <input
            ref={organisationRef}
            type="hidden"
            name={googleForm.fields.organisation}
          />
          <input type="hidden" name={googleForm.fields.area} value="General enquiry" />
          <input ref={messageRef} type="hidden" name={googleForm.fields.message} />
          <input ref={timingRef} type="hidden" name={googleForm.fields.timing} />

          <p className="form-required-note">Fields marked optional may be left blank.</p>
          <div className="contact-form-grid">
            <div className="form-field">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                name={googleForm.fields.name || "contactName"}
                type="text"
                autoComplete="name"
                maxLength={120}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-email">Work email</label>
              <input
                id="contact-email"
                name={googleForm.fields.email || "contactEmail"}
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={180}
                required
              />
            </div>

            <div className="form-field form-field-wide">
              <label htmlFor="contact-organisation">
                Organisation <span>Optional</span>
              </label>
              <input
                id="contact-organisation"
                name={localFields.organisation}
                type="text"
                autoComplete="organization"
                maxLength={160}
              />
            </div>

            <div className="form-field form-field-wide">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                name={localFields.subject}
                type="text"
                maxLength={180}
                required
              />
            </div>

            <div className="form-field form-field-wide">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name={localFields.message}
                rows={6}
                minLength={10}
                maxLength={3000}
                aria-describedby="contact-message-hint"
                required
              />
              <p id="contact-message-hint" className="form-hint">
                Include the context needed to understand your enquiry. Please do not send
                confidential material here.
              </p>
            </div>
          </div>

          {submitState === "error" && (
            <p ref={errorRef} className="contact-form-error" role="alert" tabIndex={-1}>
              The message could not be sent. Try again, or{" "}
              <a href={directEmailHref}>send it by email</a>.
            </p>
          )}

          <div className="contact-form-footer">
            <p>
              Google Forms processes this submission. Read the <a href="/privacy">privacy notice</a>{" "}
              or <a href={directEmailHref}>use email instead</a>.
            </p>
            <Button
              type="submit"
              variant="primary"
              className="button-contact-primary"
              disabled={submitState === "submitting"}
              icon={
                submitState === "submitting" ? (
                  <LoaderCircle className="form-spinner" size={18} />
                ) : (
                  <Send size={17} />
                )
              }
              isCta={true}
            >
              {submitState === "submitting" ? "Sending" : "Send enquiry"}
            </Button>
          </div>
        </form>
      )}

      <iframe
        className="contact-form-target"
        name={frameName}
        title="Contact form response"
        aria-hidden="true"
        tabIndex={-1}
        onLoad={handleFrameLoad}
        onError={() => {
          if (submittedRef.current) showSubmissionError("frame");
        }}
      />
    </>
  );
}
