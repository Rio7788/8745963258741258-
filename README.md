# THARU Juice Bar — GitHub Pages + Firebase

A mobile-first static website with Home, Menu, Cart/Checkout and an admin panel. Built with HTML, CSS and vanilla JavaScript modules. Hosting on GitHub Pages is free; Firebase's Spark plan is free within its current quotas. Usage beyond free quotas/features can require billing, so check Firebase's current plan and quotas.

## Files
- `index.html` — home, gallery, about and Google Maps review/directions CTA
- `menu.html` — Firestore menu, category filters, Sinhala/English switch, stock states
- `cart.html` — localStorage cart and WhatsApp checkout to **+94 78 928 0918**
- `admin.html` — Firebase Authentication sign-in, shop open/closed, bilingual menu CRUD and announcements
- `styles.css`, `app.js`, `firebase-config.js`, `images/logo001.png`
- `firestore.rules` — starter rules; replace the admin email before publishing

## 1. Create Firebase project (free Spark plan)
1. Go to https://console.firebase.google.com and create a project.
2. Add a **Web App** and copy its config into `firebase-config.js`. Keep the `YOUR_...` fields replaced with actual values.
3. In **Build → Firestore Database**, create a database. Start in production mode.
4. In **Build → Authentication → Sign-in method**, enable **Email/Password**.
5. In Authentication → Users, add the staff/admin email and set a strong password.
6. Edit `firestore.rules`: replace `REPLACE_WITH_ADMIN_EMAIL` with the exact admin email, then publish the rules. Do not deploy with the placeholder.
7. In Firestore, you can optionally create `settings/shop` with `{ status: "open", announcementEn: "", announcementSi: "" }`. Menu documents in `menu` should use:
   - `nameEn` (string), `nameSi` (string)
   - `descriptionEn` (string), `descriptionSi` (string)
   - `price` (number, LKR), `category` (`juices`, `smoothies`, `snacks`, `bakery`)
   - `image` (public HTTPS image URL), `inStock` (boolean)
8. Open `admin.html` on your deployed site and sign in to manage menu items. The admin page is not linked in the main navigation except in the footer; security comes from Auth and Firestore Rules, not from calling it secret.

### Firebase notes
- Firebase Web App configuration is public. Never put service-account credentials or private keys in frontend files.
- The rules above restrict writes to the configured admin email. For a larger business, prefer custom claims set by a trusted server/admin SDK rather than email matching.
- GitHub Pages is static hosting, so do not put secrets in the browser. Firebase rules are essential.
- `app.js` displays sample seed items if Firebase has not been configured or the `menu` collection is empty. Once the collection has documents, Firestore is the source of truth.
- Images are HTTPS URLs to Unsplash for the sample gallery/menu. Replace with photos you own or have permission to use.

## 2. Publish with GitHub Pages
1. Create a GitHub repository, for example `tharu-juice-bar`.
2. Upload all project files and the `images` folder to the repository root (not inside an extra nested folder).
3. Commit and push to the default branch (usually `main`).
4. Open repository **Settings → Pages**.
5. Under Build and deployment, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
6. Wait for the Pages deployment. Your site will use `https://YOUR-USERNAME.github.io/tharu-juice-bar/` (or `https://YOUR-USERNAME.github.io/` for a user site). No custom domain is required.
7. Open the site on a phone and test language toggle, theme toggle, menu, stock status, cart and WhatsApp checkout.

## 3. Before launch checklist
- [ ] Replace Firebase config placeholders.
- [ ] Publish Firestore rules with your actual admin email.
- [ ] Create an admin user in Firebase Authentication.
- [ ] Test read/write access on `menu` and `settings/shop`.
- [ ] Confirm WhatsApp number and Google Maps URL.
- [ ] Replace sample photos and confirm image usage rights.
- [ ] Test the WhatsApp message on Android and iPhone.
- [ ] Keep backups of your Firestore menu.
- [ ] Review Firebase quotas and terms periodically; free hosting does not mean unlimited backend usage.

## Behavior / limitations
- WhatsApp checkout composes the order in a `wa.me` link. Customers must press Send in WhatsApp; the website cannot silently send messages.
- Cart contents are local to the customer's browser/device.
- The menu and shop status update live when Firestore is configured.
- GitHub Pages itself has no server-side code. No order database or online payment processing is included.
