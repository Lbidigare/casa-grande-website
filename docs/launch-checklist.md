# Launch checklist

## Information (in `src/data/casa-grande.yaml`)
- [ ] Street address and ZIP code
- [ ] Current rent for each apartment type confirmed (`rent_confirmed: true`)
- [ ] Square footage and bathrooms for each apartment type
- [ ] Short description of each apartment type
- [ ] Each in-apartment amenity confirmed for every unit (or note exceptions)
- [ ] Community patio / outdoor seating confirmed
- [ ] Cat, parking and carport details (or remove those lines if not publishing)

## Assets
- [ ] Logo in `src/assets/brand/`
- [ ] Homepage exterior photo (`hero_photo`)
- [ ] Floor plan drawings for both apartment types
- [ ] Gallery photos with descriptive `alt` text
- [ ] Map image for the Location page

## Review
- [ ] Accessibility review (keyboard navigation, contrast, alt text, headings)
- [ ] Fair-housing-sensitive language review
- [ ] Test on iPhone and Android: Call and Email links work
- [ ] Set `preview_mode: false` and confirm the build passes

## Publishing
- [ ] GitHub repository Settings → Pages → Source: **GitHub Actions**
- [ ] Optional: custom domain (update `site`/`base` in `astro.config.mjs`)
