export default function Footer(){
  return (
    <footer className="border-t mt-12 bg-white">
      <div className="container py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="font-semibold">MyStore</div>
          <div className="text-sm text-slate-600 mt-1">© {new Date().getFullYear()} MyStore. All rights reserved.</div>
        </div>
        <div className="flex gap-6 text-sm text-slate-600">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  )
}
