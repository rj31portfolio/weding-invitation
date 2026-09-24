# Wedding invitation

Open `index.html` in a browser, or upload this entire folder to any static website host. No build step, framework, or server is required. The design stays within a 430px mobile invitation on larger screens.

The revised design follows the supplied reference's seven panels: photo hero, floral invitation, stacked event details, circular-photo journey, compact gallery, combined venue and RSVP, and photo closing. The journey retains the three supplied ceremonies. A celebrations card replaces the reference's time card because no event times were supplied. Photos remain illustrative, so this is a layout recreation rather than a pixel-identical copy of the reference artwork.

## Personalize

- Change `brideName` at the top of `js/script.js` before publishing. The footer also offers a name editor, saved only in the current browser. A previously saved name overrides the configured default on that device.
- Optionally set `whatsappNumber` in the same configuration to the host’s international phone number with country code. Left empty, WhatsApp asks guests to choose a recipient.
- RSVP choices are saved on the guest’s device. Guests must press the WhatsApp link and send their message to notify the host; there is no backend or automatic guest list.
- Replace the illustrative JPEGs in `assets/images/` with your own photographs. The venue image is explicitly marked as inspiration, and does not depict the actual resort. Remove that label only when replacing it with a verified venue photo. The gallery is illustrative because no personal photos were provided.
- `assets/music/wedding.mp3` is an original 32-second synthesized plucked-string instrumental loop. Replace it with your preferred licensed wedding music. Music starts only after a tap.

All supplied family names, event dates, and named venues are preserved. No ceremony times, bride family details, or Haldi venue were invented. Google Maps opens a search for the supplied resort name and city. Google Fonts requires internet; serif and sans-serif fallback fonts remain usable offline. All photographs and music are local.

## Included interactions

Music play/pause; smooth section navigation; scroll reveal with reduced-motion support; lazy-loaded photography; keyboard-accessible gallery dialog; editable bride name; persistent attendance selection; prepared WhatsApp response; Google Maps link.

## Verification

Checked in headless Microsoft Edge: attendance selection and reload persistence, WhatsApp message content, bride-name editing, gallery opening and Escape closing, bundled MP3 playback, image loading, JavaScript errors, and horizontal overflow at 320, 390, 480, and 1440 pixels. See `ASSET-PROMPTS.md` for generation details.
