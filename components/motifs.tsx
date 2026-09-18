export function CloudBorder({ className = "" }: { className?: string }) {
  // Motif awan keberuntungan (ruyi cloud), disusun berulang sebagai pembatas dekoratif.
  return (
    <svg
      viewBox="0 0 400 60"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g fill="currentColor" opacity="0.9">
        {[0, 80, 160, 240, 320].map((x) => (
          <g key={x} transform={`translate(${x},0)`}>
            <circle cx="20" cy="30" r="14" />
            <circle cx="34" cy="22" r="10" />
            <circle cx="48" cy="30" r="12" />
            <circle cx="62" cy="20" r="8" />
            <path
              d="M6 40 Q40 55 74 40"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function CraneMotif({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  // Siluet bangau terbang, motif tradisional simbol umur panjang & kesetiaan.
  return (
    <svg
      viewBox="0 0 160 120"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M20 80 Q45 55 70 62 Q60 45 78 30" />
        <path d="M70 62 Q95 50 130 55" />
        <path d="M70 62 Q80 75 65 95" />
        <path d="M78 30 L86 18" />
        <circle cx="80" cy="27" r="3" fill="currentColor" stroke="none" />
        <path d="M130 55 Q142 50 150 40" opacity="0.7" />
      </g>
    </svg>
  );
}

export function PlumBlossomCorner({ className = "" }: { className?: string }) {
  // Ranting bunga plum (mei hua), motif sudut dekoratif.
  const petal = (rotate: number) => (
    <ellipse
      cx="0"
      cy="-6"
      rx="4.5"
      ry="6"
      transform={`rotate(${rotate})`}
      fill="currentColor"
    />
  );
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <path
        d="M10 110 Q30 80 25 50 Q22 30 40 15"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M25 50 Q45 45 55 60"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      {[0, 20].map((offset) => (
        <g key={offset} transform={`translate(${40 + offset},${15 + offset * 1.6})`}>
          {[0, 72, 144, 216, 288].map((r) => (
            <g key={r}>{petal(r)}</g>
          ))}
          <circle r="2.5" fill="#3D0E1A" />
        </g>
      ))}
      <g transform="translate(55,60)" opacity="0.85">
        {[0, 72, 144, 216, 288].map((r) => (
          <g key={r}>{petal(r)}</g>
        ))}
        <circle r="2" fill="#3D0E1A" />
      </g>
    </svg>
  );
}
