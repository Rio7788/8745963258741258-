# THARU Juice Bar — static website + Firebase

Responsive, mobile-first four-page site: `index.html`, `menu.html`, `cart.html`, and `admin.html`. The site is designed for GitHub Pages (static hosting) and uses Firebase Authentication + Cloud Firestore for the live menu and admin functions. Customer cart data is stored in localStorage and checkout opens a preformatted WhatsApp message to **+94 78 928 0918**.

## Included
- Liquid-glass styling, rounded touch-friendly controls, responsive mobile bottom navigation, saved light/dark theme.
- English/Sinhala UI toggle and dual-language menu item fields.
- Juice, smoothie, snack and bakery categories; out-of-stock state.
- Cart quantity editing and WhatsApp checkout.
- Firebase email/password admin login; shop open/closed switch, announcement editor, and menu CRUD.
- Logo artwork at `images/logo001.svg`. `images/logo001.png` is also supplied for the requested favicon path.
- Demo menu fallback while Firebase is not configured. Demo mode is not a live database and admin writes are unavailable until Firebase is configured.

## 1. Create Firebase project (free tier, subject to quotas)
1. Open https://console.firebase.google.com/ and create a project.
2. In Project settings → General → Your apps, add a **Web app** and copy its config into `firebase-config.js`.
3. In Build → Firestore Database, create a database. Start in production mode.
4. In Build → Authentication → Sign-in method, enable **Email/Password**.
5. In Authentication → Users, add an admin user with an email and a strong password. Do not put the password in any file.
6. Open Firestore Rules, paste `firestore.rules`, replace `REPLACE_WITH_ADMIN_EMAIL` with the exact admin email, and publish the rules.
7. In Firestore Data, create a collection named `menuItems`. Each document should use this shape:

```json
{
  "name": { "en": "Mango Juice", "si": "අඹ යුෂ" },
  "description": { "en": "Fresh mango juice", "si": "නැවුම් අඹ යුෂ" },
  "category": "Juices",
  "price": 600,
  "image": "https://example.com/mango.jpg",
  "inStock": true
}
```

8. Create a document at `settings/public`:

```json
{
  "shopOpen": true,
  "announcement": { "en": "Fresh juices, happy days!", "si": "නැවුම් යුෂ, සතුටු දින!" }
}
```

9. In `firebase-config.js`, replace all `YOUR_...` placeholders with the actual Web app values. The web config is not a secret; the published rules and Authentication control access. Never add service-account keys to this repository.

## 2. GitHub Pages deployment
1. Create a GitHub repository, for example `tharu-juice-bar`.
2. Upload all files and folders from this project to the repository root. Keep the HTML files and `app.js` at the root.
3. Commit and push to the default branch.
4. Go to repository Settings → Pages. Under Build and deployment, choose **Deploy from a branch**, select your default branch and `/(root)`, then Save.
5. Wait for the deployment and open the URL shown in the Pages section. It will be `https://YOUR-USERNAME.github.io/tharu-juice-bar/` unless the repository is named differently.
6. Test menu, cart, checkout, language/theme controls, and admin login over the deployed HTTPS URL.

GitHub Pages is static hosting and has no server-side runtime. Firebase is a separate service; its free tier has quotas and terms that can change. The site itself does not require a paid server or custom domain. Avoid enabling paid-only Firebase products. The external Unsplash images and Google Fonts require an internet connection and are subject to their providers' availability/terms.

## 3. Admin usage
Visit `/admin.html`, then sign in with the email/password user created in Firebase Authentication. Use the dashboard to toggle shop status, edit the bilingual announcement, and add/edit/delete items. Admin functions require valid Firebase configuration and matching Firestore rules.

## 4. Important production notes
- **Security:** Admin authorization is enforced by Firebase Auth + Firestore Rules. `admin.html` is not truly secret; anyone can visit the page, but only the authenticated admin should be able to write data.
- **Shop status:** The admin switch stores the status in Firestore. This starter exposes status for the home page but does not block cart checkout when the shop is closed. Add a live status check to the checkout flow if you need a hard ordering lock.
- **Image uploads:** Admin uses image URLs to keep hosting free and avoid adding Firebase Storage billing considerations. Use reliable HTTPS image URLs. The uploaded-image requirement would need an image host or Firebase Storage setup.
- **WhatsApp:** Checkout opens WhatsApp with a prepared message. Customers still need to tap Send in WhatsApp; this does not send messages silently.
- **Reviews:** The Google Maps button uses the exact link supplied in the project request. Review text on the home page is sample copy; replace it with genuine customer reviews or remove it before publishing.
- **Favicon:** The project includes an SVG logo plus a PNG at `images/logo001.png` so the requested PNG favicon path resolves.
- **Pricing:** Prices are example LKR amounts and should be confirmed by the business.
- **No guarantee of perpetual free service:** GitHub Pages is free for public repositories within GitHub's current limits; Firebase free-tier quotas and policies may change.

## Local preview
Because this uses ES modules and Firebase's CDN imports, serve the folder over HTTP rather than opening the HTML with `file://`. For example, with Python installed run `python -m http.server 8000` from this folder and open `http://localhost:8000`.
