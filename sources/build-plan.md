# Suffolk Food Hall Demo App — Web Developer Build Plan

## Purpose of this document
This file is designed to be dropped into a new coding/project chat so the app can be built in the fewest prompts possible.

It turns the research into a practical, developer-ready build plan for a **client-facing demo app** for **Suffolk Food Hall**.

The goal is **not** to build a production-integrated app yet.

The goal is to build a **high-quality working demo** that:
- looks tailored to Suffolk Food Hall
- demonstrates strong product thinking
- is fast to build
- avoids the hidden time traps of real integrations

---

# 1. Project objective

Build a **mobile-first web app / PWA demo** for Suffolk Food Hall that presents a joined-up customer experience around:

- visiting
- events
- loyalty
- shop browsing
- restaurant booking handoff

This should feel like a premium, local, destination-led customer app.

## Core pitch
This is **not just an app**.
It is a **customer engagement and repeat-visit platform** for Suffolk Food Hall.

The demo should communicate:
- easier repeat visits
- clearer event discovery
- a more modern loyalty experience
- a better bridge between shop, dining, and visit planning

---

# 2. Critical delivery rule

## This is a demo, not a production system

Do **not** build real integrations in version one unless explicitly asked later.

Avoid:
- real payment integration
- real loyalty sync
- real POS / EPOS integration
- real stock syncing
- real gift card redemption
- real restaurant booking API integration
- real user authentication complexity

Instead:
- simulate logic with local/mock data
- use believable flows
- show clear upgrade paths for future integration

This is the single biggest time-saving decision.

---

# 3. Product strategy

Suffolk Food Hall is best represented as a:
- local premium food destination
- farm shop / deli / butchery / gifting destination
- events and experience venue
- restaurant + café visit destination
- repeat-visit local business

So the app should not feel like:
- a supermarket app
- a corporate ecommerce dashboard
- a generic booking app

It should feel like:
- warm
- premium
- rustic-modern
- visual
- easy to use
- mobile-first
- rooted in food, locality, and experience

---

# 4. Recommended scope for the demo

## Build only 5 main screens

### 1. Home / Today at Suffolk Food Hall
Purpose:
- entry point
- featured event
- opening hours
- quick actions
- premium visual presentation

Include:
- welcome message
- hero banner
- featured event card
- quick actions:
  - View Events
  - Shop Highlights
  - My Loyalty Card
  - Book Dining
- opening hours snippet
- seasonal highlight

### 2. Events
Purpose:
- show event discovery clearly
- make Suffolk Food Hall feel active and current

Include:
- upcoming events list
- date / time / price
- category tags
- “view details”
- event detail panel or page
- simulated booking / reserve CTA

### 3. Shop
Purpose:
- present the retail side without building full ecommerce complexity

Include:
- featured categories
- product cards
- product details
- add to basket
- simulated basket
- checkout explanation:
  - collection or delivery
  - final total may vary for weighed goods
  - payment may be confirmed later

### 4. Loyalty Wallet
Purpose:
- demonstrate the biggest perceived app value
- make the app feel member-driven

Include:
- digital loyalty card visual
- mock QR / barcode style card
- points balance
- personalised offers
- rewards tiles
- account summary

### 5. Book Dining
Purpose:
- make dining feel streamlined without building booking backend complexity

Include:
- select service:
  - breakfast
  - lunch
  - afternoon tea
- party size
- dietary / allergen notes
- booking summary
- CTA:
  - Continue to Booking
- this CTA can link to a placeholder/external booking page or a fake confirmation flow for demo purposes

---

# 5. Optional sixth screen

## Visit / Plan Your Visit
Add only if time allows.

Could include:
- map / destination zones
- opening hours by area
- family-friendly notes
- dog-friendly note
- parking / directions
- “what’s on today”

This is useful, but secondary if speed matters.

---

# 6. Fastest technical approach

## Preferred stack
Use:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- local mock data in JSON or TypeScript objects

Optional:
- next-pwa or equivalent later
- Framer Motion for small UI polish
- lucide-react icons

## Reason
This is the fastest route to:
- polished UI
- mobile-first layout
- reusable components
- easy deployment
- easy future expansion

---

# 7. Architecture recommendation

Keep it simple and clean.

## Suggested structure

app/
- page.tsx
- events/page.tsx
- shop/page.tsx
- loyalty/page.tsx
- book/page.tsx

components/
- AppShell.tsx
- BottomNav.tsx
- Header.tsx
- HeroBanner.tsx
- SectionCard.tsx
- EventCard.tsx
- ProductCard.tsx
- LoyaltyCard.tsx
- OfferCard.tsx
- QuickActionGrid.tsx
- BookingForm.tsx

lib/
- demo-data.ts
- types.ts
- utils.ts

public/
- images/
  - hero placeholders
  - logo placeholder
  - category imagery

## App structure notes
- keep pages shallow
- avoid overengineering
- favour reusable components
- centralise mock data in one place

---

# 8. Data strategy

## Use mock data first
Do not rely on live APIs in the first build.

Create a single `demo-data.ts` file with:
- opening hours
- featured banners
- loyalty balance
- offers
- events
- categories
- products
- basket demo items
- restaurant service types

## Why
This removes:
- API fragility
- integration time
- external dependency issues
- inconsistent live data problems

## Mock data should still feel realistic
Use realistic demo items inspired by Suffolk Food Hall, such as:
- butchery
- deli
- hampers
- gift cards
- Easter / seasonal products
- tribute nights / food nights / workshops
- afternoon tea
- local produce highlights

Do not claim the demo is live-integrated unless it actually is.

---

# 9. UX / brand direction

## Brand feel
The interface should feel:
- premium rustic
- clean
- visual
- local
- warm
- food-led
- polished, not flashy

## Avoid
- neon startup styling
- overly dark fintech look
- sterile dashboards
- supermarket bargain aesthetic
- cluttered layouts

## Visual direction
Use:
- soft off-white / cream backgrounds
- muted green / earthy tones / warm charcoal
- elegant cards
- rounded corners
- strong spacing
- large imagery
- readable text
- clear hierarchy

## Design cues
Think:
- premium farm shop
- local food destination
- modern country retail experience

---

# 10. Navigation recommendation

Use a bottom nav for mobile demo clarity.

Tabs:
- Home
- Events
- Shop
- Loyalty
- Book

Optional:
- Visit instead of Book if you prioritise destination over dining

---

# 11. Component priorities

Build in this order for speed:

## Priority 1
- App shell
- mobile layout
- bottom navigation
- shared card component
- hero banner
- section headers

## Priority 2
- home screen
- loyalty card component
- event list cards
- product cards

## Priority 3
- booking flow
- basket / checkout simulation
- offers / rewards

## Priority 4
- animations
- polish
- installability / PWA extras

---

# 12. What should be simulated

## Loyalty
Simulate:
- points total
- member number
- loyalty QR / barcode
- offers

Do not build:
- real scan system
- real rewards logic
- real customer account backend

## Shop
Simulate:
- browse
- add to basket
- basket total
- checkout messaging
- order progress statuses

Do not build:
- real payments
- real inventory
- real shipping calculations
- real account-linked orders

## Events
Simulate:
- browse events
- view event details
- reserve / book CTA
- confirmation screen

Do not build:
- real ticketing infrastructure unless specifically requested later

## Booking
Simulate:
- service selection
- party size
- allergen notes
- summary
- handoff CTA

Do not build:
- direct booking integration
- true availability sync

---

# 13. Hidden complications to avoid in v1

These are the main traps that slow down builds.

## 1. Loyalty integration
Likely tied to an existing store process and not cleanly exposed to the web.

## 2. Weighed goods / delayed payment logic
This makes “normal ecommerce checkout” misleading if implemented naively.

## 3. Gift card logic
Digital voucher systems are much more complex than they look.

## 4. Booking ecosystem integration
Restaurant bookings appear to involve external systems, so full integration will need credentials and deeper technical review.

## 5. GDPR / cookies / account handling
Real user accounts and tracking raise compliance work that a demo does not need.

Conclusion:
avoid all of the above in the first pass.

---

# 14. Definition of success for the demo

The demo is successful if a client can immediately understand:

- what the app is for
- why it would help repeat visits
- how it modernises loyalty
- how it improves event discovery
- how it makes the business feel more premium and connected

## Demo success test
A client should be able to say:
“I can see how this would improve customer experience and bring our shop, dining, and events together.”

---

# 15. Fastest build sequence

Follow this exact order.

## Step 1
Create project shell and theme

## Step 2
Build bottom navigation and shared layout

## Step 3
Build Home screen

## Step 4
Build Loyalty screen

## Step 5
Build Events screen

## Step 6
Build Shop screen

## Step 7
Build Book Dining screen

## Step 8
Add basket simulation and confirmations

## Step 9
Polish spacing, mobile responsiveness, and branding

## Step 10
Optional:
- subtle animation
- PWA support
- fake notifications
- splash/loading polish

---

# 16. Prompting strategy for efficient AI-assisted build

Use one strong build prompt rather than many scattered ones.

## Best practice
Prompt for:
- full app structure
- all pages
- all components
- seeded data
- polished styling
- mobile-first layout
- no fake production integrations

## Important instruction to include
Tell the coding model clearly:
- this is a demo, not production
- use mock data
- do not overengineer backend
- keep components modular
- make it visually client-ready
- prioritise polish over technical depth

---

# 17. Master build brief to paste into a coding chat

Use the following prompt:

---

You are acting as a senior web developer and product-focused frontend engineer.

Build a **mobile-first Next.js demo app** for **Suffolk Food Hall** as a client-facing prototype.

## Goal
Create a polished, premium-feeling demo that presents Suffolk Food Hall as a joined-up digital experience around:
- events
- loyalty
- shop browsing
- visit planning
- restaurant booking handoff

## Important constraints
This is a **demo only**, not a production-integrated app.

Use **mock data only**.
Do not implement:
- real payment systems
- real stock sync
- real loyalty backend
- real gift card redemption
- real booking API integration
- complex authentication

Instead, simulate believable flows and make the UI look presentation-ready.

## Tech requirements
Use:
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui where useful
- clean reusable components
- strong spacing and polished mobile UI

## Brand direction
The app should feel:
- premium rustic
- warm
- local
- modern
- food-led
- elegant, not corporate

Avoid:
- sterile dashboards
- startup neon styling
- clutter
- supermarket discount vibes

## Required pages
Build these pages:
1. Home / Today at Suffolk Food Hall
2. Events
3. Shop
4. Loyalty Wallet
5. Book Dining

Optional if cleanly possible:
6. Visit / Plan Your Visit

## Required features by page

### Home
- hero banner
- quick actions
- opening hours snippet
- featured event
- featured offers
- seasonal highlight cards

### Events
- upcoming events list
- event cards with date/time/price
- event detail view or modal
- reserve/book CTA
- simulated confirmation flow

### Shop
- categories
- product cards
- product detail view
- basket
- simulated checkout
- messaging around collection/delivery and weighed items

### Loyalty
- digital loyalty card visual
- mock QR or barcode
- points balance
- offers / rewards
- member summary

### Book Dining
- service selector
- party size
- dietary/allergen notes
- summary step
- continue-to-booking CTA
- simulated handoff or placeholder external link

## UX requirements
- bottom navigation for mobile
- strong typography hierarchy
- reusable card components
- responsive layout
- realistic seeded content inspired by Suffolk Food Hall
- elegant use of icons
- subtle polish and transitions if appropriate

## File structure
Keep the code modular and organised.
Create:
- app pages
- components
- central mock data file
- reusable types
- clean architecture suitable for future expansion

## Output requirements
Provide the complete code needed for the demo app, including:
- pages
- components
- seeded data
- navigation
- styling
- any small helper utilities

Make it look like a demo that could be presented to a real client.

---

# 18. Optional second prompt for refinement

After the first build, if needed, use this:

Refine the Suffolk Food Hall demo app to feel more premium and client-ready.

Improve:
- visual hierarchy
- spacing
- imagery placement
- card styling
- onboarding feel
- realism of seeded content
- transitions
- overall polish

Keep the architecture clean and do not add real integrations.
Prioritise making it look like something ready for a real presentation to Suffolk Food Hall.

---

# 19. Final developer instruction

If speed is the priority:
- do not research more first
- do not chase integrations
- do not expand scope
- do not rebuild the website
- do not turn this into a backend project

Build the polished demo first.

That is the most efficient path.
