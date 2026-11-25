import type { Metadata } from "next";
import { site } from "@/data/site";
import { PolicyLayout } from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects and uses your personal information.`,
};

// Written to match what this site actually does today:
// no accounts, no server-side form storage, no analytics, a Google Maps embed on /contact,
// and localStorage for the packing checklist. Update if any of that changes.
export default function PrivacyPage() {
  return (
    <PolicyLayout
      path="/privacy"
      title="Privacy policy"
      intro={
        <p>
          {site.name} respects your privacy. This page explains what information we collect when you use this website
          or book a trip with us, why we collect it, and what you can ask us to do with it.
        </p>
      }
      sections={[
        {
          id: "collect",
          title: "What we collect",
          content: (
            <>
              <p>We only collect what you choose to send us when you enquire or book, such as:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>your name, email address and phone or WhatsApp number;</li>
                <li>trip details: dates, number of guests, hotel or pick-up location;</li>
                <li>anything you tell us that helps us plan safely, such as fitness, health or dietary needs;</li>
                <li>payment records for bookings.</li>
              </ul>
              <p>This website doesn&apos;t have user accounts and doesn&apos;t use analytics or advertising trackers.</p>
            </>
          ),
        },
        {
          id: "contact-form",
          title: "The enquiry form",
          content: (
            <p>
              Our enquiry form doesn&apos;t store anything on our website. When you press send, it opens WhatsApp or your
              own email app with your message filled in, and nothing is sent until you send it from there. Those messages
              are then handled under WhatsApp&apos;s or your email provider&apos;s own privacy terms, as well as this
              policy.
            </p>
          ),
        },
        {
          id: "use",
          title: "How we use it",
          content: (
            <ul className="list-disc space-y-2 pl-5">
              <li>to answer your enquiry and plan your trip;</li>
              <li>to confirm bookings, take payments and send you trip details;</li>
              <li>to keep you safe on the trip, for example knowing about a medical condition;</li>
              <li>to meet legal and accounting requirements.</li>
            </ul>
          ),
        },
        {
          id: "sharing",
          title: "Who we share it with",
          content: (
            <>
              <p>We never sell your information. We only share what&apos;s needed to run your trip, for example with:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>your guide and driver;</li>
                <li>accommodation, park or activity providers that are part of your booking;</li>
                <li>emergency services, if needed for your safety;</li>
                <li>authorities, where the law requires it.</li>
              </ul>
            </>
          ),
        },
        {
          id: "cookies",
          title: "Cookies & storage",
          content: (
            <>
              <p>This website doesn&apos;t set its own tracking cookies.</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  The packing checklist on our travel guide remembers your ticks in your own browser (local storage). It
                  never leaves your device, and you can clear it with the Reset button.
                </li>
                <li>
                  The map on our contact page is provided by Google Maps. It only loads if you press &quot;Show
                  map&quot;, and Google may then set its own cookies under Google&apos;s privacy policy.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "keep",
          title: "How long we keep it",
          content: (
            <p>
              We keep enquiry and booking details only as long as we need them for your trip and for our legal and
              accounting records, then delete them.
            </p>
          ),
        },
        {
          id: "rights",
          title: "Your rights",
          content: (
            <p>
              You can ask us at any time what information we hold about you, and ask us to correct or delete it. Email{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-moss underline">{site.email}</a> and
              we&apos;ll respond as soon as we can.
            </p>
          ),
        },
        {
          id: "changes",
          title: "Changes to this policy",
          content: <p>We may update this policy from time to time. The date at the top shows when it last changed.</p>,
        },
      ]}
    />
  );
}
