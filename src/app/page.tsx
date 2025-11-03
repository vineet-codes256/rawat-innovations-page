import HomePageClient from '../components/HomePageClient';
// Re-enable dynamic rendering to ensure production build stability while we investigate static prerender issues
export const dynamic = 'force-dynamic';

export default function HomePage() {
  return <HomePageClient />;
}
