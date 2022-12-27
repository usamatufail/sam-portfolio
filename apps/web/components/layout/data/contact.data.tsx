import { EmailIcon, LinkIcon, PhoneIcon } from 'icons';
import { contact } from 'mocks';

export const contactData = {
  items1: [
    {
      href: `mailto:${contact.email}`,
      text: `${contact.email}`,
      icon: <EmailIcon />,
      isOutsideLink: true,
    },
    {
      href: `tel:${contact.phone}`,
      text: `${contact.phone}`,
      icon: <PhoneIcon />,
      isOutsideLink: true,
    },
  ],
  items2: [
    {
      href: `https://instagram.com/${contact.instagramHandle}`,
      text: `Instagram Account`,
      icon: <LinkIcon />,
      isOutsideLink: true,
    },
    {
      href: `https://twitter.com/${contact.twitterHandle}`,
      text: `Twitter Account`,
      icon: <LinkIcon />,
      isOutsideLink: true,
    },
    {
      href: `https://youtube.com/${contact.youtubeHandle}`,
      text: `Youtube Channel`,
      icon: <LinkIcon />,
      isOutsideLink: true,
    },
    {
      href: `https://facebook.com/${contact.facebookHandle}`,
      text: `Facebook Account`,
      icon: <LinkIcon />,
      isOutsideLink: true,
    },
  ],
};
