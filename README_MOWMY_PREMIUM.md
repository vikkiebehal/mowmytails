# Mowmy Tails Premium UI/UX Homepage

This package upgrades the Mowmy Tails Shopify homepage into a premium pet lifestyle ecommerce layout using the approved forest/sand/terracotta design system.

## Important
The existing `.mt-announcement` CSS rule has been preserved in `assets/mowmy-theme.css`. The homepage section does not add or modify the announcement bar.

## Push to GitHub

```bash
git clone https://github.com/vikkiebehal/mowmytails.git
cd mowmytails
cp -R /path-to-this-package/* .
git status
git add .
git commit -m "Upgrade Mowmy Tails premium UI/UX homepage"
git push origin main
```

## After pushing
Open Shopify Admin > Online Store > Themes > connected GitHub theme > Customize.
Set the homepage Best seller collection and replace hero/story placeholders with lifestyle photos.
