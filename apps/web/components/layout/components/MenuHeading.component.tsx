import { MenuClose, MenuOpen } from 'icons';

interface MenuHeadingProps {
  text?: string;
  onClick?: () => void;
  open?: boolean;
}
export const MenuHeading = ({
  text = 'personal-info',
  onClick = () => {},
  open,
}: MenuHeadingProps) => {
  return (
    <div
      onClick={onClick}
      className="flex gap-[10px] items-center py-[10px] px-[20px] borer-b-solid border-b-main-border border-b cursor-pointer select-none"
    >
      {open ? <MenuOpen /> : <MenuClose />}
      <span className="text-white">{text}</span>
    </div>
  );
};
