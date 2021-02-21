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
  Scrollbar
} from "element-ui";

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
