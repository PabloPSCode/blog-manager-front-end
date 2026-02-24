import { AccordionProps } from "@material-tailwind/react/components/Accordion";
import { AccordionBodyProps } from "@material-tailwind/react/components/AccordionBody";
import { AccordionHeaderProps } from "@material-tailwind/react/components/AccordionHeader";
import { AvatarProps } from "@material-tailwind/react/components/Avatar";
import { BreadcrumbsProps } from "@material-tailwind/react/components/Breadcrumbs";
import { ButtonProps } from "@material-tailwind/react/components/Button";
import { CardProps } from "@material-tailwind/react/components/Card";
import { CardBodyProps } from "@material-tailwind/react/components/CardBody";
import { CardFooterProps } from "@material-tailwind/react/components/CardFooter";
import { IconButtonProps } from "@material-tailwind/react/components/IconButton";
import { ListItemProps } from "@material-tailwind/react/components/ListItem";
import { SpinnerProps } from "@material-tailwind/react/components/Spinner";
import { TooltipProps } from "@material-tailwind/react/components/Tooltip";

declare module "@material-tailwind/react" {
  export const Button: React.FC<ButtonProps>;
  export const Card: React.FC<CardProps>;
  export const CardBody: React.FC<CardBodyProps>;
  export const CardFooter: React.FC<CardFooterProps>;
  export const IconButton: React.FC<IconButtonProps>;
  export const Tooltip: React.FC<TooltipProps>;
  export const Accordion: React.FC<AccordionProps>;
  export const AccordionBody: React.FC<AccordionBodyProps>;
  export const AccordionHeader: React.FC<AccordionHeaderProps>;
  export const Avatar: React.FC<AvatarProps>;
  export const Breadcrumbs: React.FC<BreadcrumbsProps>;
  export const ListItem: React.FC<ListItemProps>;
  export const Spinner: React.FC<SpinnerProps>;
}
