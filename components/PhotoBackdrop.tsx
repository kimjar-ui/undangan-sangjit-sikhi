export default function PhotoBackdrop() {
  const photos = [
    "/images/bg-1.webp",
    "/images/bg-2.webp",
    "/images/bg-3.webp",
    "/images/bg-4.webp",
    "/images/bg-5.webp",
  ];

  return (
    <section className="relative overflow-hidden py-24">
      {/* Kolase foto redup sebagai latar */}
      <div className="absolute inset-0 grid grid-cols-5">
        {photos.map((src) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-top"
          />
        ))}
      </div>

      {/* Lapisan merah transparan di atas foto, biar teks tetap terbaca dan tetap elegan */}
      <div className="absolute inset-0 bg-maroon-deep/85" />

      <div className="relative z-10 mx-auto max-w-content px-6 text-center">
        <p className="font-script text-3xl text-gold-light sm:text-4xl">
          Restu orang tua, awal dari segalanya
        </p>
        <div className="mx-auto my-6 h-px w-20 bg-gradient-to-r from-transparent via-gold-light to-transparent" />
        <p className="font-body text-sm leading-relaxed text-ivory/80">
          Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
          berkenan hadir dan memberikan restu dalam acara Sangjit kami.
        </p>
      </div>
    </section>
  );
}
