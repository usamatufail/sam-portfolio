import { MenuHeading } from './MenuHeading.component';
import { MenuItem, MenuItemProps } from './MenuItem.component';

export const Menu = ({
  open,
  setOpen,
  items,
  heading,
}: {
  open: boolean;
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  items: MenuItemProps[];
  heading: string;
}) => {
  return (
    <div>
      {/* Sidebar Heading 1 */}
      <MenuHeading
        text={heading}
        onClick={() => setOpen((prev: boolean) => !prev)}
        open={open}
      />
      {/* Sidebar Menu 1 */}
      {open && (
        <div className="flex flex-col border-r-solid borer-b-solid border-b-main-border border-b py-[10px]">
          {items.map(({ href, text, icon, isOutsideLink }) => {
            return (
              <MenuItem
                key={href}
                href={href}
                text={text}
                icon={icon}
                isOutsideLink={isOutsideLink}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
