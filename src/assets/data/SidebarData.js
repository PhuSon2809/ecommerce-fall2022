import StorefrontIcon from "@mui/icons-material/Storefront";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import config from "~/config";

export const SidebarData = [
  {
    title: "Home",
    path: config.routes.home,
    icon: <HomeOutlinedIcon fontSize="medium" />,
  },
  {
    title: "Product",
    icon: <ShoppingBagOutlinedIcon fontSize="medium" />,
    iconClosed: <KeyboardArrowDownOutlinedIcon fontSize="medium" />,
    iconOpened: <KeyboardArrowLeftOutlinedIcon fontSize="medium" />,

    subNav: [
      {
        title: "My Products",
        path: config.routes.viewProducts,
      },
      {
        title: "Add New Product",
        path: config.routes.addProduct,
      },
    ],
  },
  {
    title: "Order",
    icon: <ShoppingCartCheckoutOutlinedIcon fontSize="medium" />,
    iconClosed: <KeyboardArrowDownOutlinedIcon fontSize="medium" />,
    iconOpened: <KeyboardArrowLeftOutlinedIcon fontSize="medium" />,

    subNav: [
      {
        title: "My Orders",
        path: config.routes.viewOrders,
      },
      {
        title: "Cancellation",
        path: config.routes.ordersCancel,
      },
    ],
  },
  {
    title: "Shop",
    icon: <StorefrontIcon fontSize="medium" />,
    iconClosed: <KeyboardArrowDownOutlinedIcon fontSize="medium" />,
    iconOpened: <KeyboardArrowLeftOutlinedIcon fontSize="medium" />,

    subNav: [
      {
        title: "Shop Profile",
        path: config.routes.shopProfile,
      },
      {
        title: "My Reports",
        path: config.routes.reports,
      },
    ],
  },
  {
    title: "Settings",
    icon: <SettingsOutlinedIcon fontSize="medium" />,
    iconClosed: <KeyboardArrowDownOutlinedIcon fontSize="medium" />,
    iconOpened: <KeyboardArrowLeftOutlinedIcon fontSize="medium" />,

    subNav: [
      {
        title: "My Addresses",
        path: config.routes.myAddresses,
      },
      {
        title: "Shop Settings",
        path: config.routes.settingShop,
      },
      {
        title: "Account",
        path: config.routes.account,
      },
    ],
  },
];
