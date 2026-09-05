import { redirect } from 'next/navigation';

// "Start Here" is the docs entry point. A real page (rather than a
// next.config redirect) so this also works under `output: 'export'`.
export default function StartHerePage() {
  redirect('/docs');
}
