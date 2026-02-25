## Packages
react-markdown | For rendering AI-powered career recommendations and forum posts
date-fns | For formatting session dates and forum post timestamps
lucide-react | Already installed, but explicitly required for all iconography

## Notes
- Platform relies on Replit Auth for authentication. All protected routes should check `useAuth()`.
- Unauthenticated users will see the Marketing Landing Page.
- API endpoints map directly to the `api` object defined in `@shared/routes`.
- Tailwind configuration assumed to handle CSS custom properties as defined in `index.css`.
