"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import { Check, LoaderCircle, RotateCcw, Send } from "lucide-react";
import { CtaButton } from "@/components/cta-button";

type SubmitState = "idle" | "submitting" | "success" | "error";

type ReviewRequestFormProps = {
  source?: string;
};

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

const qualificationFieldNames = {
  decision: "reviewDecision",
  initiative: "reviewInitiative",
  decisionDue: "reviewDecisionDue",
  commitment: "reviewCommitment",
  decisionOwner: "reviewDecisionOwner",
  evidence: "reviewEvidence",
  initiativeActive: "reviewInitiativeActive",
  sponsor: "reviewSponsor",
  boardReporting: "reviewBoardReporting",
  additionalContext: "reviewAdditionalContext"
} as const;

const directEmailHref =
  "mailto:info@marcpaul.tech?subject=Independent%20Initiative%20Review";

function getTextValue(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName);
  return typeof value === "string" ? value.trim() : "";
}

function buildQualificationSummary(formData: FormData) {
  const answers: Array<[label: string, fieldName: string]> = [
    ["Decision", qualificationFieldNames.decision],
    ["Initiative", qualificationFieldNames.initiative],
    ["Decision deadline", qualificationFieldNames.decisionDue],
    ["Requested commitment", qualificationFieldNames.commitment],
    ["Decision owner", qualificationFieldNames.decisionOwner],
    ["Available evidence", qualificationFieldNames.evidence],
    ["Initiative active", qualificationFieldNames.initiativeActive],
    ["Executive sponsor", qualificationFieldNames.sponsor],
    ["Board or investor reporting", qualificationFieldNames.boardReporting],
    ["Additional context", qualificationFieldNames.additionalContext]
  ];

  return answers
    .map(([label, fieldName]) => `${label}\n${getTextValue(formData, fieldName) || "Not provided"}`)
    .join("\n\n");
}

export function ReviewRequestForm({ source = "request-review-page" }: ReviewRequestFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLInputElement>(null);
  const timingRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const submittedRef = useRef(false);
  const submitTimerRef = useRef<number | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const frameName = `review-request-${useId().replace(/:/g, "")}`;

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
    track("Review Request Form Error", { location: source, reason });
    window.requestAnimationFrame(() => errorRef.current?.focus());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!isGoogleFormConfigured || !messageRef.current || !timingRef.current) {
      event.preventDefault();
      showSubmissionError("configuration");
      return;
    }

    const formData = new FormData(event.currentTarget);
    messageRef.current.value = buildQualificationSummary(formData);
    timingRef.current.value = getTextValue(formData, qualificationFieldNames.decisionDue);

    submittedRef.current = true;
    setSubmitState("submitting");
    track("Review Request Form Submit", { location: source });

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
    track("Review Request Form Success", { location: source });
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
          <p className="contact-dialog-kicker">Request received</p>
          <h3>Thank you. I received your review request.</h3>
          <p>
            I will read the decision context and reply with an assessment of fit and required
            access.
          </p>
          <div className="contact-form-success-actions">
            <CtaButton
              type="button"
              variant="secondary"
              className="button-contact-secondary"
              icon={<RotateCcw size={17} />}
              onClick={resetForm}
            >
              Submit another request
            </CtaButton>
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
          <input type="hidden" name={googleForm.fields.area} value="Independent Initiative Review" />
          <input ref={messageRef} type="hidden" name={googleForm.fields.message} />
          <input ref={timingRef} type="hidden" name={googleForm.fields.timing} />

          <p className="form-required-note">Complete every field except those marked optional.</p>
          <div className="contact-form-grid">
            <div className="form-field">
              <label htmlFor="review-request-name">Name</label>
              <input
                id="review-request-name"
                name={googleForm.fields.name || "reviewContactName"}
                type="text"
                autoComplete="name"
                maxLength={120}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="review-request-email">Work email</label>
              <input
                id="review-request-email"
                name={googleForm.fields.email || "reviewContactEmail"}
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={180}
                required
              />
            </div>

            <div className="form-field form-field-wide">
              <label htmlFor="review-request-organisation">Organisation</label>
              <input
                id="review-request-organisation"
                name={googleForm.fields.organisation || "reviewContactOrganisation"}
                type="text"
                autoComplete="organization"
                maxLength={160}
                required
              />
            </div>

            <div className="form-field form-field-wide">
              <label htmlFor="review-request-decision">What decision is due?</label>
              <textarea
                id="review-request-decision"
                name={qualificationFieldNames.decision}
                rows={4}
                minLength={20}
                maxLength={1800}
                aria-describedby="review-request-decision-hint"
                required
              />
              <p id="review-request-decision-hint" className="form-hint">
                Describe the choice and any options that remain open.
              </p>
            </div>

            <div className="form-field form-field-wide">
              <label htmlFor="review-request-initiative">Initiative or programme</label>
              <textarea
                id="review-request-initiative"
                name={qualificationFieldNames.initiative}
                rows={3}
                minLength={10}
                maxLength={1400}
                aria-describedby="review-request-initiative-hint"
                required
              />
              <p id="review-request-initiative-hint" className="form-hint">
                Briefly describe the work, intended result, and people affected.
              </p>
            </div>

            <div className="form-field">
              <label htmlFor="review-request-due">Decision deadline</label>
              <input
                id="review-request-due"
                name={qualificationFieldNames.decisionDue}
                type="date"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="review-request-owner">Decision owner</label>
              <input
                id="review-request-owner"
                name={qualificationFieldNames.decisionOwner}
                type="text"
                maxLength={180}
                aria-describedby="review-request-owner-hint"
                required
              />
              <p id="review-request-owner-hint" className="form-hint">
                Give the owner&apos;s name and role.
              </p>
            </div>

            <div className="form-field form-field-wide">
              <label htmlFor="review-request-commitment">What commitment is requested?</label>
              <textarea
                id="review-request-commitment"
                name={qualificationFieldNames.commitment}
                rows={3}
                minLength={10}
                maxLength={1400}
                aria-describedby="review-request-commitment-hint"
                required
              />
              <p id="review-request-commitment-hint" className="form-hint">
                This may be a budget, contract, hire, platform choice, acquisition, or public promise.
              </p>
            </div>

            <div className="form-field">
              <label htmlFor="review-request-active">Is the initiative already active?</label>
              <select
                id="review-request-active"
                name={qualificationFieldNames.initiativeActive}
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Choose yes or no
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="review-request-reporting">Board or investor reporting?</label>
              <select
                id="review-request-reporting"
                name={qualificationFieldNames.boardReporting}
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Choose yes or no
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-field form-field-wide">
              <label htmlFor="review-request-sponsor">Executive sponsor</label>
              <input
                id="review-request-sponsor"
                name={qualificationFieldNames.sponsor}
                type="text"
                maxLength={180}
                aria-describedby="review-request-sponsor-hint"
                required
              />
              <p id="review-request-sponsor-hint" className="form-hint">
                Give the sponsor&apos;s name and role, or write “None”.
              </p>
            </div>

            <div className="form-field form-field-wide">
              <label htmlFor="review-request-evidence">What evidence is available?</label>
              <textarea
                id="review-request-evidence"
                name={qualificationFieldNames.evidence}
                rows={4}
                minLength={10}
                maxLength={1800}
                aria-describedby="review-request-evidence-hint"
                required
              />
              <p id="review-request-evidence-hint" className="form-hint">
                List the business case, technical assessment, proposal, prototype, research, or
                operating data available.
              </p>
            </div>

            <div className="form-field form-field-wide">
              <label htmlFor="review-request-context">
                Additional context <span>Optional</span>
              </label>
              <textarea
                id="review-request-context"
                name={qualificationFieldNames.additionalContext}
                rows={4}
                maxLength={2200}
                aria-describedby="review-request-context-hint"
              />
              <p id="review-request-context-hint" className="form-hint">
                Add any relevant constraints, sensitivities, or links.
              </p>
            </div>
          </div>

          {submitState === "error" && (
            <p ref={errorRef} className="contact-form-error" role="alert" tabIndex={-1}>
              The request could not be sent. Try again, or{" "}
              <a href={directEmailHref}>send the brief by email</a>.
            </p>
          )}

          <div className="contact-form-footer">
            <p>
              Google Forms processes this submission. Read the <a href="/privacy">privacy notice</a>{" "}
              or <a href={directEmailHref}>use email instead</a>.
            </p>
            <CtaButton
              className="button-contact-primary"
              type="submit"
              disabled={submitState === "submitting"}
              icon={
                submitState === "submitting" ? (
                  <LoaderCircle className="form-spinner" size={18} />
                ) : (
                  <Send size={17} />
                )
              }
            >
              {submitState === "submitting" ? "Sending" : "Submit review request"}
            </CtaButton>
          </div>
        </form>
      )}

      <iframe
        className="contact-form-target"
        name={frameName}
        title="Review request form response"
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
