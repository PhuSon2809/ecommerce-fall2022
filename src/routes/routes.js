import config from "~/config";
import Account from "~/pages/Account/Account";
import AddProduct from "~/pages/AddProduct/AddProduct";
import Home from "~/pages/Home/Home";
import Login from "~/pages/Authenticated/Login/Login";
import MyAddresses from "~/pages/MyAddresses/MyAddresses";
import Reports from "~/pages/Reports/Reports";
import SettingShop from "~/pages/SettingShop/SettingShop";
import ShopProfile from "~/pages/ShopProfile/ShopProfile";
import ViewOrders from "~/pages/ViewOrders/ViewOrders";
import ViewProducts from "~/pages/ViewProducts/ViewProducts";
import Authenticated from "~/pages/Authenticated/Authenticated";
import OrderDetail from "~/pages/OrderDetail/OrderDetail";
import AccountInfor from "~/pages/Account/AccountInfor";

const supplierRoutes = [

  {
    path: config.routes.home,
    component: Home,
  },
  {
    path: config.routes.detailAccount,
    component: AccountInfor,
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
    path: config.routes.orderDetail,
    component: OrderDetail,
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
