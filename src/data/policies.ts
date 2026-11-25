// Settings used across /terms, /cancellation-policy and /privacy.
// TODO: replace these placeholder rules with the business's real ones,
// then set `draft: false` to hide the "draft" notice on every policy page.

export const policy = {
  draft: true,
  lastUpdated: "25 November 2026",

  deposit: "25%", // paid to confirm a booking
  balanceDue: "on the day of the trip, before departure",
  paymentMethods: "bank transfer, card or cash, as agreed when you book",

  // Refund of the amount paid when the guest cancels. Ordered longest notice first.
  cancellationTiers: [
    { notice: "7 days or more before the trip", refund: "Full refund" },
    { notice: "2 to 6 days before", refund: "50% refund" },
    { notice: "Less than 48 hours before, or no-show", refund: "No refund" },
  ],
  refundTime: "within 7 working days",
  freeDateChange: "up to 48 hours before the trip, subject to availability",
};

export const policyLinks = [
  { href: "/terms", label: "Booking terms" },
  { href: "/cancellation-policy", label: "Cancellation policy" },
  { href: "/privacy", label: "Privacy" },
];
