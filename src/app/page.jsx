import { ClientOnly } from './client';
import { RootLayout } from './layout';

export function generateStaticParams() {
  return <RootLayout></RootLayout>;
}

export default function Page() {
  return <ClientOnly />;
}
