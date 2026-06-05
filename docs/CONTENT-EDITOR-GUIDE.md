# Content Editor Guide

Run local editing with `npm run cms:local` and `npm run dev`, then open `/admin`.

Edit homepage text in `Homepage Settings`.

Update the logo in `Site Settings`. The current logo is a placeholder because `aima-assets/aima-logo.png` was missing. Replace it with official AIMA brand files.

Update contact details, social links, domain, and Google Form URL in `Site Settings`.

Add research themes, publications, projects, people, community narratives, gallery images, and opportunities through their CMS collections.

Required fields usually include title, slug, order, featured, and summary. Publications also need year, authors, venue, type, links, and placeholder status. People need group, role, affiliation, biography, interests, and active status.

Preview mode shows TODO labels. Production mode hides placeholder publications, projects, and people.

To undo a wrong update, revert the content file in Git and redeploy.
