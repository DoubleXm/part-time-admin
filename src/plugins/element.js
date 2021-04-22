import Vue from "vue";
import {
  Button,
  Container,
  Aside,
  Header,
  Main,
  Footer,
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Scrollbar,
  Form,
  FormItem,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Tooltip,
  Drawer,
  ColorPicker,
  Switch,
  Dialog,
  Table,
  TableColumn,
  Pagination,
  Loading
} from "element-ui";
// 自定义主题样式
import "@/styles/element-variables.scss";

Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };
Vue.use(Button);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Row);
Vue.use(Col);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Scrollbar);
Vue.use(MenuItemGroup);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Avatar);
Vue.use(Tooltip);
Vue.use(Drawer);
Vue.use(ColorPicker);
Vue.use(Switch);
Vue.use(Dialog);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
