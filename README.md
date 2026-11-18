# Dev Khatanhar — SAP SD Consultant Portfolio

React 18 + TypeScript + Vite + Tailwind CSS + lucide-react.

## Run locally

```bash
npm install
npm run dev
```

## Update content

All content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts). Components never hard-code text.

- `profile.github` is empty because the resume has no GitHub link. Add a URL and the GitHub buttons appear on their own.
- Skill ids in `experience[].skills` and `engagements[].skills` must match an id in `skills[]`. That link powers the cross-highlighting.
- To replace the resume, overwrite `public/Dev_Resume.docx`.

## Contact form

The form validates on the client and only simulates sending. For real delivery, replace the `setTimeout` in
`src/components/Contact.tsx` with Formspree, Netlify Forms or an API route.

## Deploy

- **Vercel:** import the folder. It auto-detects Vite (build `npm run build`, output `dist`).
- **Netlify:** `netlify.toml` is already set up (build `npm run build`, publish `dist`).
