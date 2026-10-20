# Signature Events website

Event styling and hire website for Signature Events, Harare. Plain HTML, CSS and JavaScript. No build step.

Open `index.html` in a browser to view the site. Upload the whole folder to any web host to publish it.

## Which file is which page

| Page | File | What an editor changes here |
|---|---|---|
| Home | `index.html` | Hero, welcome text, package summary cards, closing banner |
| Packages | `packages.html` | Price tables, what each package includes, extras and their prices |
| Gallery | `gallery.html` | Photos |
| About | `about.html` | About text |
| Contact | `contact.html` | How to book, booking conditions, phone, address, enquiry form |

Open any page in a text editor. Each section starts with a comment banner that says which tag is the title, which is the quote and which is the body text.

## How every page is written

- **`h1`** is the page title. There is exactly one per page.
- **`h2`** is a section title.
- **`h3`** is a smaller title inside a section (a package name, a booking step).
- **`p`** is body text. `p.quote`, `p.tg`, `p.q` and `p.s` are the italic quotes and taglines.
- To change wording, edit the text between the tags and leave the tags and `class` names alone.

Page outlines:

```
index.html     h1 SIGNATURE EVENTS (hero)
               h2 WELCOME TO SIGNATURE EVENTS        h3 Classic / Gold / Premium
               h2 OUR PACKAGES                       h3 Classic / Gold / Premium cards
               h2 LET'S CREATE SOMETHING BEAUTIFUL
packages.html  h1 PACKAGES & PRICING
               h2 CLASSIC    h2 GOLD    h2 PREMIUM   (price table + inclusions each)
               h2 THE FINISHING TOUCHES              h3 Classic / Gold / Premium extras
gallery.html   h1 THE SIGNATURE LOOK                 (nine photos)
about.html     h1 ABOUT SIGNATURE EVENTS
               h2 LET'S CREATE SOMETHING BEAUTIFUL
contact.html   h1 CONTACT SIGNATURE EVENTS
               h2 HOW TO BOOK                        h3 three steps, booking information
               h2 ENQUIRE ABOUT YOUR EVENT           (contact details and form)
```

## Shared blocks (same on every page)

The header menu and the footer are identical on all five pages. If you change a menu link, the address or the footer text, make the same change in all five files. The block is marked with a "SHARED" comment.

## Folder structure

```
signature-events/
  index.html  packages.html  gallery.html  about.html  contact.html
  css/style.css     All styling. Colours and fonts are tokens at the top of the file.
  js/settings.js    Phone number, WhatsApp message, form endpoint (loaded on every page)
  js/main.js        Menu, petals, scroll-up button, WhatsApp bubble (every page)
  js/form.js        Enquiry form, price estimate, extras list (contact.html only)
  js/gallery.js     Photo lightbox (gallery.html only)
  images/           The ten catalogue photos used by the site
```

## Common edits

| To change | Edit |
|---|---|
| Colours, fonts | `:root` block at the top of `css/style.css` |
| Prices | Tables in `packages.html`, the `PRICES` object in `js/form.js`, and the "Starting from" prices on the cards in `index.html` |
| Extras | Lists in `packages.html` and the `EXTRAS` list in `js/form.js` |
| Package inclusions | The "Setup includes" lists in `packages.html` |
| Booking conditions (deposit, fees) | The step cards and the notice list in `contact.html` |
| Phone and WhatsApp number | `WA` in `js/settings.js`, plus the visible number and `wa.me/263789571647` links in the HTML pages |
| Photos | Replace files in `images/` (keep the names) or change the `src` in the page |
| Add a gallery photo | Copy a `<button>` in `gallery.html`, change `src` and `alt`, give it the next `data-lb` number |
| Number of falling petals | The `for` loop in the "FALLING PETALS" section of `js/main.js` |

## Links to the enquiry form

Any button can send a visitor to the form with a package already chosen:

- `contact.html#enquiry` opens the form.
- `contact.html?package=gold#enquiry` opens it with Gold selected (`classic`, `gold` or `premium`).

## Enquiry form

The form validates every field. Delivery is not connected yet. Until it is, "Send enquiry" prepares the enquiry as a WhatsApp message and says it has not been sent.

To receive enquiries by email, create a form endpoint with a service such as Formspree and paste its URL into `FORM_ENDPOINT` in `js/settings.js`. The form then posts JSON to that URL and shows a success message only when the service accepts it.

## Fonts

Cormorant Garamond (headings) and Inter (body) load from Google Fonts. The site falls back to Georgia and system fonts if they cannot load.
