// "The drop cap" logo (design/flow-series-3, Flow Logos v2): a serif initial,
// lines of text, and a last line that becomes a wave. The letter is Lora Bold
// converted to a path, so it renders the same without the web font.
const LETTER = 'M21.82 29.84Q21.82 28.25 21.33 27.52Q20.83 26.8 19.98 26.63Q19.12 26.46 18.1 26.5L17.11 26.54V32.77Q17.11 33.79 17.07 34.71Q17.03 35.62 16.96 36.11H22.05Q23.19 36.11 24.25 35.6Q25.32 35.09 26 33.89Q26.68 32.69 26.68 30.64H29.15L28.96 39H8.9V36.49Q9.77 36.45 10.36 36.26Q10.95 36.07 11.27 35.39Q11.6 34.71 11.6 33.19V18.63Q11.6 17.61 11.65 16.66Q11.71 15.71 11.75 15.21Q11.14 15.25 10.23 15.27Q9.32 15.29 8.9 15.33V12.4H27.9L28.13 19.77H25.62Q25.62 17.68 24.9 16.62Q24.18 15.55 23.11 15.19Q22.05 14.83 21.02 14.87L19.65 14.91Q18.86 14.91 18.29 15.12Q17.72 15.33 17.41 16.03Q17.11 16.73 17.11 18.21V23.91H21.55L21.4 20.61H24.33V29.84Z';
const LINES = 'M37 15h19M37 26h19M37 37h13';
const WAVE = 'M8 49c5.3 4.4 10.7 4.4 16 0s10.7-4.4 16 0 10.7 4.4 16 0';

interface BrandLogoProps {
  /** 'mark' = letter + lines on the page background; 'icon' = rounded square app icon. */
  variant?: 'mark' | 'icon';
  size?: number;
  className?: string;
}

export function BrandLogo({ variant = 'mark', size = 40, className }: BrandLogoProps) {
  if (variant === 'icon') {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-label="English Flow" role="img">
        <rect width="64" height="64" rx="15" fill="hsl(var(--logo))" />
        <g transform="translate(6.4 6.4) scale(0.8)" fill="none" stroke="#fff" strokeLinecap="round">
          <path d={LETTER} fill="#fff" stroke="none" />
          <path d={LINES} strokeWidth="5" strokeOpacity="0.55" />
          <path d={WAVE} strokeWidth="5.4" />
        </g>
      </svg>
    );
  }
  // Lines and wave use the text colour, so the mark adapts to dark mode
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-label="English Flow" role="img">
      <path d={LETTER} fill="hsl(var(--logo))" />
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <path d={LINES} strokeWidth="5" strokeOpacity="0.55" />
        <path d={WAVE} strokeWidth="5.4" />
      </g>
    </svg>
  );
}
