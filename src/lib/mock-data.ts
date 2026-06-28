// Mock data for SubSnoop dashboard
// Replace with real API calls in production

export interface Subscription {
  id: string;
  name: string;
  iconBg: string;
  iconLetter: string;
  lastCharged: string;
  nextCharge: string;
  amount: number;
  period: "month" | "year";
  variant: "active" | "soon" | "irregular";
  category: string;
}

export const subscriptions: Subscription[] = [
  {
    id: "netflix",
    name: "Netflix",
    iconBg: "#E50914",
    iconLetter: "N",
    lastCharged: "Jun 15",
    nextCharge: "Jul 15",
    amount: 15.99,
    period: "month",
    variant: "active",
    category: "Entertainment",
  },
  {
    id: "spotify",
    name: "Spotify",
    iconBg: "#1DB954",
    iconLetter: "S",
    lastCharged: "Jun 22",
    nextCharge: "Jul 22",
    amount: 9.99,
    period: "month",
    variant: "active",
    category: "Entertainment",
  },
  {
    id: "github",
    name: "GitHub Pro",
    iconBg: "#24292e",
    iconLetter: "G",
    lastCharged: "Jun 1",
    nextCharge: "Jul 1",
    amount: 4.0,
    period: "month",
    variant: "active",
    category: "Developer Tools",
  },
  {
    id: "adobe",
    name: "Adobe Creative Cloud",
    iconBg: "#FF0000",
    iconLetter: "A",
    lastCharged: "Jun 8",
    nextCharge: "Jul 8",
    amount: 59.99,
    period: "month",
    variant: "active",
    category: "Productivity",
  },
  {
    id: "telia",
    name: "Telia 5G + TV",
    iconBg: "#0099DE",
    iconLetter: "T",
    lastCharged: "Jun 28",
    nextCharge: "Jul 28",
    amount: 44.95,
    period: "month",
    variant: "active",
    category: "Telecom",
  },
  {
    id: "youtube",
    name: "YouTube Premium",
    iconBg: "#FF0000",
    iconLetter: "Y",
    lastCharged: "May 5",
    nextCharge: "Aug 5",
    amount: 11.99,
    period: "month",
    variant: "irregular",
    category: "Entertainment",
  },
  {
    id: "fitness360",
    name: "Fitness360",
    iconBg: "#FF6B00",
    iconLetter: "F",
    lastCharged: "Mar 10",
    nextCharge: "—",
    amount: 29.99,
    period: "month",
    variant: "soon",
    category: "Health & Fitness",
  },
];

export const stats = {
  monthlyBurn: 127.4,
  activeCount: 14,
  yearlyEstimate: 1528.8,
  potentialSavings: 34.97,
};

export const spendingTrend = [
  { month: "Jul", amount: 89 },
  { month: "Aug", amount: 95 },
  { month: "Sep", amount: 91 },
  { month: "Oct", amount: 106 },
  { month: "Nov", amount: 98 },
  { month: "Dec", amount: 115 },
  { month: "Jan", amount: 120 },
  { month: "Feb", amount: 118 },
  { month: "Mar", amount: 125 },
  { month: "Apr", amount: 130 },
  { month: "May", amount: 132 },
  { month: "Jun", amount: 127.4 },
];

export const categories = [
  { name: "Entertainment", amount: 37.97, color: "#E50914" },
  { name: "Developer Tools", amount: 4.0, color: "#24292e" },
  { name: "Health & Fitness", amount: 29.99, color: "#FF6B00" },
  { name: "Productivity", amount: 59.99, color: "#FF0000" },
  { name: "Telecom", amount: 44.95, color: "#0099DE" },
];

export const healthScore = 70;
export const upcomingAlerts = [
  {
    id: "adobe-renewal",
    title: "Adobe CC renews in 5 days",
    text: "€59.99 on Jul 8 — consider annual plan to save €120/yr",
  },
  {
    id: "fitness-unused",
    title: "Fitness360 not detected since Mar",
    text: "You likely cancelled. Remove from tracking?",
  },
];
