import { MapPin, Clock } from "lucide-react";
import Divider from "./Divider";

export default function EventDetails() {
  return (
    <section className="bg-blush px-6 py-20">
      <div className="mx-auto max-w-content text-center">
        <p className="font-body text-xs tracking-wide2 text-maroon/70">
          Acara Sangjit
        </p>
        <Divider className="my-6" />

        <div className="flex flex-col items-start gap-6 text-left">
          <p className="font-body text-sm text-ink/70">
            Sabtu, 01 November 2026
          </p>

          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <span className="font-body text-sm text-ink/80">
              10.00 WIB &mdash; selesai
            </span>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <div>
              <p className="font-body text-sm font-medium text-ink">
                Kediaman Keluarga Mempelai Wanita
              </p>
              <p className="font-body text-sm text-ink/70">
                Bojong Menteng RT 007/RW 002 No. 20,
                <br />
                Kec. Rawalumbu, Kota Bekasi, Jawa Barat 17117
              </p>
              <a
                href="https://maps.app.goo.gl/M4RDWMih9kaAcsrYA"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-body text-sm text-maroon underline decoration-gold/60 underline-offset-4 hover:text-maroon-deep"
              >
                Buka di Google Maps
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 overflow-hidden border border-gold/50">
          <iframe
            title="Lokasi Acara Sangjit"
            src="https://www.google.com/maps?q=-6.2928067,106.9763482&z=17&output=embed"
            width="100%"
            height="280"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
