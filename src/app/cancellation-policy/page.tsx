import type { Metadata } from "next";
import Link from "next/link";
import { policy } from "@/data/policies";
import { site, whatsappLink } from "@/data/site";
import { PolicyLayout } from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description: `What happens if you need to cancel or change a trip with ${site.name}, or if we have to cancel.`,
};

export default function CancellationPage() {
  return (
    <PolicyLayout
      path="/cancellation-policy"
      title="Cancellation policy"
      intro={
        <p>
          Plans change, and weather in the hills can too. Here&apos;s what happens if you need to cancel or move your
          trip, or if we have to.
        </p>
      }
      sections={[
        {
          id: "you-cancel",
          title: "If you cancel",
          content: (
            <>
              <p>Refunds depend on how much notice you give, counted from the trip&apos;s start time:</p>
              <div className="overflow-hidden rounded-2xl border border-line">
                <table className="w-full text-left text-sm">
                  <thead className="bg-card text-xs uppercase tracking-widest text-muted">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">Notice given</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Refund of amount paid</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line bg-white">
                    {policy.cancellationTiers.map((t) => (
                      <tr key={t.notice}>
                        <td className="px-4 py-3 text-ink">{t.notice}</td>
                        <td className="px-4 py-3 font-semibold text-ink">{t.refund}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                To cancel, message us on{" "}
                <a href={whatsappLink("Hi, I need to cancel my booking.")} target="_blank" rel="noopener noreferrer" className="font-semibold text-moss underline">
                  WhatsApp
                </a>{" "}
                or email <a href={`mailto:${site.email}`} className="font-semibold text-moss underline">{site.email}</a>. The
                time we receive your message is the time we use.
              </p>
            </>
          ),
        },
        {
          id: "change-date",
          title: "Changing your date",
          content: (
            <p>
              Rather than cancel, you can move your trip to another date free of charge {policy.freeDateChange}. Changes
              made later than that are treated as a cancellation.
            </p>
          ),
        },
        {
          id: "we-cancel",
          title: "If we cancel",
          content: (
            <>
              <p>
                We may cancel or postpone a trip if heavy rain, storms, landslide risk, park closures or other conditions
                make it unsafe, or if something else outside our control prevents it going ahead.
              </p>
              <p>If we cancel, you can choose a new date, a different experience, or a full refund of everything you paid.</p>
            </>
          ),
        },
        {
          id: "weather",
          title: "Weather on the day",
          content: (
            <p>
              Light rain is normal in the hill country and trips usually go ahead. If your guide changes the route or
              shortens the trip for safety once it has started, this isn&apos;t treated as a cancellation and no refund is
              due, but we&apos;ll always try to make it up to you.
            </p>
          ),
        },
        {
          id: "late",
          title: "Late arrival & no-shows",
          content: (
            <p>
              If you&apos;re running late, let your guide know as soon as possible. We can usually wait a short while, but
              on timed trips (sunrise hikes, safaris, trains) we may have to leave without you. Missing the trip counts
              as a no-show.
            </p>
          ),
        },
        {
          id: "refunds",
          title: "How refunds are paid",
          content: (
            <p>
              Refunds go back using the method you paid with, {policy.refundTime} of the cancellation. Any bank or card
              fees charged by your provider are outside our control. See also our{" "}
              <Link href="/terms" className="font-semibold text-moss underline">booking terms</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
