import type { Metadata } from "next";
import Link from "next/link";
import { policy } from "@/data/policies";
import { site } from "@/data/site";
import { PolicyLayout } from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Booking Terms",
  description: `Terms and conditions for booking a guided experience with ${site.name}.`,
};

export default function TermsPage() {
  return (
    <PolicyLayout
      path="/terms"
      title="Booking terms"
      intro={
        <p>
          These terms apply when you book a guided experience with {site.name}, based at {site.address}. By confirming
          a booking you agree to them, so please read them before you book.
        </p>
      }
      sections={[
        {
          id: "booking",
          title: "Making a booking",
          content: (
            <>
              <p>
                Enquiring is free. Once we&apos;ve agreed the date, route, group size and price with you, your booking is
                confirmed when you pay a {policy.deposit} deposit and we send you a written confirmation by WhatsApp or
                email.
              </p>
              <p>The person making the booking accepts these terms on behalf of everyone in their group.</p>
            </>
          ),
        },
        {
          id: "prices",
          title: "Prices & payment",
          content: (
            <>
              <p>
                Prices are shown in Sri Lankan rupees (LKR) per person unless stated otherwise. Group discounts and
                what&apos;s included are listed on each experience page and confirmed when you book.
              </p>
              <p>
                The balance is due {policy.balanceDue}. We accept {policy.paymentMethods}.
              </p>
            </>
          ),
        },
        {
          id: "changes",
          title: "Changes & cancellations",
          content: (
            <p>
              You can change your date free of charge {policy.freeDateChange}. Refunds when you cancel, and what happens
              if we have to cancel, are set out in our{" "}
              <Link href="/cancellation-policy" className="font-semibold text-moss underline">cancellation policy</Link>.
            </p>
          ),
        },
        {
          id: "fitness",
          title: "Fitness & health",
          content: (
            <>
              <p>
                Each experience has a difficulty grade. Please choose one that suits your fitness, and tell us before
                the trip about any medical conditions, injuries, allergies or pregnancy that could affect you.
              </p>
              <p>
                Your guide may change the route, slow the pace or turn back if they believe it&apos;s needed for the
                group&apos;s safety. Their decision on safety matters is final.
              </p>
            </>
          ),
        },
        {
          id: "conduct",
          title: "On the trip",
          content: (
            <ul className="list-disc space-y-2 pl-5">
              <li>Follow your guide&apos;s instructions, especially on steep or exposed ground.</li>
              <li>Respect local communities, religious sites, wildlife and park rules.</li>
              <li>Take your litter home. Don&apos;t remove plants, animals or artefacts.</li>
              <li>
                We may refuse to take, or ask to leave, anyone under the influence of alcohol or drugs, or whose behaviour
                puts others at risk. No refund is due in that case.
              </li>
            </ul>
          ),
        },
        {
          id: "insurance",
          title: "Insurance",
          content: (
            <p>
              You are responsible for having travel insurance that covers hiking, trekking and the other activities you
              book, including medical treatment and emergency evacuation.
            </p>
          ),
        },
        {
          id: "liability",
          title: "Our responsibility",
          content: (
            <>
              <p>
                We plan every trip carefully and use trained, licensed guides. Outdoor activities carry some risk, and by
                booking you accept that risk. We are not responsible for loss, injury or delay caused by events outside
                our control, such as weather, natural events, road closures, strikes or the actions of third parties.
              </p>
              <p>Please look after your own belongings; we can&apos;t accept responsibility for items lost or damaged.</p>
            </>
          ),
        },
        {
          id: "photos",
          title: "Photos",
          content: (
            <p>
              Guides sometimes take photos during trips. We will only use photos where you can be identified on our
              website or social media if you agree.
            </p>
          ),
        },
        {
          id: "law",
          title: "Governing law",
          content: <p>These terms are governed by the laws of Sri Lanka.</p>,
        },
      ]}
    />
  );
}
