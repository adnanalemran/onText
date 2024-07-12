import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="flex gap-1 bg-slate-800">
      <Link href="/"><nav className='bg-slate-900 p-4 hover:bg-slate-950'>Home</nav></Link>
      <nav  className='bg-slate-900 p-4 hover:bg-slate-950'><Link href="/add-task">Add task</Link></nav>
      <nav className='bg-slate-900 p-4 hover:bg-slate-950'><a href="https://github.com">GitHub</a></nav>
      <Link href="/about" prefetch={false} ><nav className='bg-slate-900 p-4 hover:bg-slate-950'>About</nav></Link>
    </div>
  );
}
