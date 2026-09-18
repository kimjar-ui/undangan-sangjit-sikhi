import Divider from "./Divider";

type Portrait = {
  src: string;
  name: string;
};

const portraits: Portrait[] = [
  { src: "/images/yuniar.webp", name: "Yuniar Melania" },
  { src: "/images/sikhi.webp", name: "Sikhi Vessabhu" },
];

export default function Gallery() {
  return (
    <section className="bg-ivory px-6 py-20">
      <div className="mx-auto max-w-content text-center">
        <p className="font-body text-xs tracking-wide2 text-maroon/70">
          Galeri Kami
        </p>
        <Divider className="my-6" />

        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {portraits.map((portrait) => (
            <figure key={portrait.src} className="flex flex-col items-center">
              <div className="w-full overflow-hidden border border-gold/50 p-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={portrait.src}
                  alt={`Potret ${portrait.name}`}
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 font-script text-2xl text-maroon-deep">
                {portrait.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
