import Image from 'next/image';

export function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={500}
      height={500}
      priority
      data-parallax="0.05"
      className="block h-[150px] w-[150px] flex-none rounded-full object-cover"
      style={{
        boxShadow: '0 20px 44px -24px rgba(0, 0, 0, 0.85)',
        willChange: 'transform',
      }}
    />
  );
}
