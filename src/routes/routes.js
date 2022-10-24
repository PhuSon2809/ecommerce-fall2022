import config from "~/config";
import Account from "~/pages/Account/Account";
import AddProduct from "~/pages/AddProduct/AddProduct";
import Home from "~/pages/Home/Home";
import Login from "~/pages/Login/Login";
import MyAddresses from "~/pages/MyAddresses/MyAddresses";
import Reports from "~/pages/Reports/Reports";
import SettingShop from "~/pages/SettingShop/SettingShop";
import ShopProfile from "~/pages/ShopProfile/ShopProfile";
import ViewOrders from "~/pages/ViewOrders/ViewOrders";
import ViewProducts from "~/pages/ViewProducts/ViewProducts";

const supplierRoutes = [
  {
    path: config.routes.login,
    component: Login,
    layout: null,
  },
  {
    path: config.routes.home,
    component: Home,
  },
  {
    path: config.routes.viewProducts,
    component: ViewProducts,
  },
  {
    path: config.routes.addProduct,
    component: AddProduct,
  },
  {
    path: config.routes.viewOrders,
    component: ViewOrders,
  },
  {
    path: config.routes.shopProfile,
    component: ShopProfile,
  },
  {
    path: config.routes.reports,
    component: Reports,
  },
  {
    path: config.routes.myAddresses,
    component: MyAddresses,
  },
  {
    path: config.routes.settingShop,
    component: SettingShop,
  },
  {
    path: config.routes.account,
    component: Account,
  },
];

const adminRoutes = [];

export { supplierRoutes, adminRoutes };
