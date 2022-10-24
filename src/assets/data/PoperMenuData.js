import {
  CopyIcon,
  DeleteIcon,
  EditIcon,
  VisibilityOffIcon,
} from "~/components/Icons";

export const PoperMenuData = [
  {
    title: "Edit program",
    icon: <EditIcon />,
  },
  {
    title: "Duplicate program",
    icon: <CopyIcon />,
  },
  {
    title: "De-activate program",
    icon: <VisibilityOffIcon />,
  },
  {
    title: "Delete program",
    icon: <DeleteIcon />,
    color: "gray",
  },
];
