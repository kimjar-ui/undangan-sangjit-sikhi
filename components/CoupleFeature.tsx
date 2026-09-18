export default function CoupleFeature() {
  return (
    <section className="relative h-[85svh] w-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/couple-main.webp"
        alt="Sikhi Vessabhu & Yuniar Melania mengenakan busana adat Bali"
        className="h-full w-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep via-maroon-deep/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 px-6 pb-12 text-center">
        <p className="font-script text-4xl text-gold-light sm:text-5xl">
          Yuniar &amp; Sikhi
        </p>
        <p className="mt-2 font-body text-xs tracking-wide2 text-ivory/80">
          Menuju satu ikatan yang direstui kedua keluarga
        </p>
      </div>
    </section>
  );
}
