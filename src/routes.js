// import
import React  from 'react';
import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Billing from "views/Dashboard/Billing.js";
import Profile from "views/Dashboard/Profile.js";

import {
  StatsIcon,
  CreditIcon,
  PersonIcon,
} from "components/Icons/Icons";
import { Icon } from "@chakra-ui/react" 
import { FaCarAlt, FaRegMap, FaCog } from 'react-icons/fa'

const dashRoutes = [
  {
    path: "/mapa",
    name: "Mapa",
    icon: <Icon as={FaRegMap} color='inherit' />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/entregas",
    name: "Entregas",
    icon: <StatsIcon color='inherit' />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/entregadores",
    name: "Entregadores",
    icon: <Icon as={FaCarAlt} color='inherit' />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/pagamentos",
    name: "Pagamentos",
    icon: <CreditIcon color='inherit' />,
    component: Billing,
    layout: "/admin",
  },
  {
    path: "/perfil",
    name: "Perfil",
    icon: <PersonIcon color='inherit' />,
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/configuracoes",
    name: "Configurações",
    icon: <Icon as={FaCog} color='inherit' />,
    component: Profile,
    layout: "/admin",
  },
];
export default dashRoutes;
