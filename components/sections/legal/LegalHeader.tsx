import { Reveal } from "@/components/motion";

interface LegalHeaderProps {
  title: string;
  lastUpdated: string;
}

export default function LegalHeader({ title, lastUpdated }: LegalHeaderProps) {
  return (
    <Reveal className="flex w-full max-w-[628px] flex-col items-start gap-[12px]" yPx={16}>
      <h1
        className="w-full font-inter text-[28px] font-semibold leading-none tracking-[-0.56px] sm:text-[36px] sm:tracking-[-0.72px] lg:text-[40px] lg:tracking-[-0.8px]"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.6) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {title}
      </h1>
      
      <p
        className="w-full font-inter text-[12px] font-medium leading-[1.5] tracking-[-0.24px]"
        style={{ color: 'rgba(255, 255, 255, 0.7)' }}
      >
        {lastUpdated}
      </p>
    </Reveal>
  );
}
