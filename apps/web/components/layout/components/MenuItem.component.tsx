import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export interface MenuItemProps {
  href: string;
  text: string;
  icon: ReactNode;
  isOutsideLink?: boolean;
}

interface RenderChildrenProps extends MenuItemProps {
  isActive?: boolean;
}

const RenderChildren = (props: RenderChildrenProps) => {
  return (
    <div className="flex gap-[10px] items-center pl-[35px] py-[5px] cursor-pointer">
      {props.icon}
      <span
        className={`hover:text-white transition-all ${
          props.isActive ? 'text-white' : ''
        }`}
      >
        {props.text}
      </span>
    </div>
  );
};

export const MenuItem = ({
  href,
  text,
  icon,
  isOutsideLink,
}: MenuItemProps) => {
  const pathname = useRouter().pathname;
  const isActive =
    href === '/about' || href === '/contact'
      ? pathname === href
      : pathname.includes(href);
  return (
    <>
      {isOutsideLink ? (
        <a href={href} target="_blank" rel="noreferrer">
          <RenderChildren
            text={text}
            href={href}
            icon={icon}
            isActive={isActive}
          />
        </a>
      ) : (
        <Link href={href}>
          <RenderChildren
            text={text}
            href={href}
            icon={icon}
            isActive={isActive}
          />
        </Link>
      )}
    </>
  );
};
