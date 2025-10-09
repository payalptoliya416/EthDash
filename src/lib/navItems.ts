
import { ChartPieIcon, WalletIcon, ArchiveBoxArrowDownIcon, Cog6ToothIcon, UserIcon } from "@heroicons/react/24/outline";

export const navItemsByRole = {
  user: [
    { label: "Overview", icon: ChartPieIcon, href: "/overview" },
    { label: "Wallet", icon: WalletIcon, href: "/wallet" },
    { label: "Bank Withdrawal", icon: ArchiveBoxArrowDownIcon, href: "/bank-withdrawal" },
    { label: "Settings", icon: Cog6ToothIcon, href: "/setting" },
  ],
  admin: [
    { label: "Overview", icon: ChartPieIcon, href: "/admin/overview" },
    { label: "Active clients", icon: UserIcon, href: "/admin/active-clients" },
  ],
};
