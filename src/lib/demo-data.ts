import type { EventItem, OfferItem, ProductItem, QuickAction, ServiceItem } from "@/lib/types";

export const siteMeta = {
  name: "Suffolk Food Hall",
  strapline: "A premium food hall and destination experience on the Orwell"
};

export const openingHours = [
  { label: "Farm Shop", hours: "Mon–Sat 8:30am–6:00pm · Sun 10:00am–4:00pm" },
  { label: "Restaurant", hours: "Breakfast & lunch daily · Afternoon tea selected days" },
  { label: "Today", hours: "Fresh counters, gifts, deli specials and riverside dining" }
];

export const quickActions: QuickAction[] = [
  { title: "View Events", description: "Food nights, tasting evenings and workshops", href: "/events" },
  { title: "Shop Highlights", description: "Seasonal hampers, deli picks and local produce", href: "/shop" },
  { title: "My Loyalty Card", description: "Points, offers and your digital member wallet", href: "/loyalty" },
  { title: "Book Dining", description: "Breakfast, lunch or afternoon tea planning", href: "/book" }
];

export const featuredEvent: EventItem = {
  id: "spring-supper",
  title: "Spring Supper Club",
  date: "18 April",
  time: "7:00pm",
  price: "£34 per guest",
  category: "Dining Event",
  description: "A seasonal tasting evening celebrating Suffolk produce, curated pairings and a relaxed shared-table atmosphere.",
  cta: "Reserve a place"
};

export const events: EventItem[] = [
  featuredEvent,
  {
    id: "wine-tasting",
    title: "Meet the Maker: English Wine Tasting",
    date: "24 April",
    time: "6:30pm",
    price: "£18 per guest",
    category: "Tasting",
    description: "Sample a guided flight of regional wines with paired deli bites and host notes.",
    cta: "Book tasting"
  },
  {
    id: "butchery-demo",
    title: "Butchery Counter Demo",
    date: "27 April",
    time: "11:00am",
    price: "Free",
    category: "In Store",
    description: "See the team break down a seasonal cut and share cooking ideas for the weekend.",
    cta: "Save reminder"
  },
  {
    id: "floristry",
    title: "Country Table Floristry Workshop",
    date: "2 May",
    time: "2:00pm",
    price: "£42 per guest",
    category: "Workshop",
    description: "Create a warm, food-hall-inspired centrepiece with expert guidance and refreshments.",
    cta: "Reserve workshop"
  }
];

export const shopCategories = ["Butchery", "Deli", "Bakery", "Hampers", "Seasonal", "Gift Cards"];

export const products: ProductItem[] = [
  {
    id: "hamper",
    name: "Suffolk Weekend Hamper",
    price: "£48.00",
    tag: "Best seller",
    description: "A premium hamper with chutneys, biscuits, preserves and savoury deli treats for gifting or hosting."
  },
  {
    id: "steak-box",
    name: "Butcher's Steak Box",
    price: "from £29.00",
    tag: "Fresh counter",
    description: "A curated selection of steaks prepared by the counter team. Final total may vary by weight."
  },
  {
    id: "afternoon-tea",
    name: "Afternoon Tea Voucher",
    price: "£52.00",
    tag: "Popular gift",
    description: "A gift-ready voucher for two including sweet and savoury favourites with riverside dining."
  },
  {
    id: "deli-board",
    name: "Local Cheese Board",
    price: "£16.50",
    tag: "Ready to collect",
    description: "A deli-prepared board featuring regional cheeses, crackers and seasonal accompaniments."
  }
];

export const basketPreview = [
  { id: "basket-preview-1", name: "Suffolk Weekend Hamper", price: 48 },
  { id: "basket-preview-2", name: "Local Cheese Board", price: 16.5 }
];

export const loyalty = {
  memberName: "Adam P.",
  memberNumber: "SFH-2048-7781",
  tier: "Kitchen Table Member",
  points: 420,
  nextReward: "580 points to £10 dining reward"
};

export const offers: OfferItem[] = [
  {
    id: "coffee",
    title: "Coffee & pastry reward",
    description: "Redeem 150 points for a midweek coffee and bakery pick-up.",
    expires: "Ends 20 April"
  },
  {
    id: "tea",
    title: "Afternoon tea priority access",
    description: "Members get early access to selected afternoon tea dates and seasonal menus.",
    expires: "Rolling member perk"
  },
  {
    id: "hamper",
    title: "10% off spring hampers",
    description: "A limited member offer across selected gift hampers and host bundles.",
    expires: "Ends 30 April"
  }
];

export const services: ServiceItem[] = [
  {
    id: "breakfast",
    title: "Breakfast",
    description: "A relaxed morning table with bakery favourites, coffee and cooked breakfast options.",
    times: ["8:30am", "9:00am", "10:00am"]
  },
  {
    id: "lunch",
    title: "Lunch",
    description: "Seasonal lunch menus and daily specials in the restaurant or terrace space.",
    times: ["12:00pm", "1:00pm", "2:00pm"]
  },
  {
    id: "afternoon-tea",
    title: "Afternoon Tea",
    description: "A premium afternoon tea experience with room for dietary notes and celebration details.",
    times: ["2:30pm", "3:00pm", "3:30pm"]
  }
];
