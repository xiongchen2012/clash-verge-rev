import LogsPage from "./logs";
import ProxiesPage from "./proxies";
import ProfilesPage from "./profiles";
import SettingsPage from "./settings";
import ConnectionsPage from "./connections";
import RulesPage from "./rules";
import HomePage from "./home";
import UnlockPage from "./unlock";
import { BaseErrorBoundary } from "@/components/base";

import ProxiesSvg from "@/assets/image/itemicon/proxies.svg?react";
import ProxiesSvg2 from "@/assets/image/itemicon/proxies2.svg?react";
import ProfilesSvg from "@/assets/image/itemicon/profiles.svg?react";
import ProfilesSvg2 from "@/assets/image/itemicon/profiles2.svg?react";
import ConnectionsSvg from "@/assets/image/itemicon/connections.svg?react";
import ConnectionsSvg2 from "@/assets/image/itemicon/connections2.svg?react";
import RulesSvg from "@/assets/image/itemicon/rules.svg?react";
import RulesSvg2 from "@/assets/image/itemicon/rules2.svg?react";
import LogsSvg from "@/assets/image/itemicon/logs.svg?react";
import SettingsSvg from "@/assets/image/itemicon/settings.svg?react";
import SettingsSvg2 from "@/assets/image/itemicon/settings2.svg?react";
import HomeSvg from "@/assets/image/itemicon/home.svg?react";
import UnlockSvg from "@/assets/image/itemicon/unlock.svg?react";

import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";

export const routers = [
  {
    label: "Label-Home",
    path: "/home",
    icon: [<HomeSvg />, <HomeRoundedIcon />],
    element: <HomePage />,
  },
  {
    label: "Label-Profiles",
    path: "/profile",
    icon: [<ProfilesSvg2 />, <ProfilesSvg />],
    element: <ProfilesPage />,
  },
  {
    label: "Label-Proxies",
    path: "/",
    icon: [<ProxiesSvg2 />, <ProxiesSvg />],
    element: <ProxiesPage />,
  },
  {
    label: "Label-Rules",
    path: "/rules",
    icon: [<RulesSvg2 />, <RulesSvg />],
    element: <RulesPage />,
  },
  {
    label: "Label-Connections",
    path: "/connections",
    icon: [<ConnectionsSvg2 />, <ConnectionsSvg />],
    element: <ConnectionsPage />,
  },
  {
    label: "Label-Logs",
    path: "/logs",
    icon: [<SubjectRoundedIcon />, <LogsSvg />],
    element: <LogsPage />,
  },
  {
    label: "Label-Unlock",
    path: "/unlock",
    icon: [<UnlockSvg />, <LockOpenRoundedIcon />],
    element: <UnlockPage />,
  },
  {
    label: "Label-Settings",
    path: "/settings",
    icon: [<SettingsSvg2 />, <SettingsSvg />],
    element: <SettingsPage />,
  },
].map((router) => ({
  ...router,
  element: (
    <BaseErrorBoundary key={router.label}>{router.element}</BaseErrorBoundary>
  ),
}));
