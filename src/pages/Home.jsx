import { Link } from "react-router-dom"
import { ArrowRight, ShieldCheck, Upload, PlayCircle } from "lucide-react"
import Footer from "../components/home/Footer"
import Header from "../components/home/Header"

import AuthContext from "../context/AuthContext";

export default function HomePage() {
 

  
   return (
    <div className="min-h-screen bg-slate-950 text-white">
       <Header />
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Secure Video Upload & <br />
          <span className="bg-linear-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
            Content Safety Analysis
          </span>
        </h1>

        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
          Upload videos, automatically analyze sensitive content, and stream only
          approved media. Built for safe, scalable video platforms.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-medium"
          >
            Create Workspace <ArrowRight size={16} />
          </Link>
          <Link
            to="/auth"
            className="px-6 py-3 border border-slate-700 rounded-md hover:bg-slate-800"
          >
            Sign In
          </Link>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold text-center mb-14">
          How StreamVault Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Upload size={22} />}
            title="Upload Video"
            desc="Users upload videos securely with real-time progress tracking."
          />

          <FeatureCard
            icon={<ShieldCheck size={22} />}
            title="Safety Analysis"
            desc="Each video is processed to detect sensitive content before it becomes public."
          />

          <FeatureCard
            icon={<PlayCircle size={22} />}
            title="Controlled Streaming"
            desc="Only approved videos are streamed using efficient HTTP range requests."
          />
        </div>
      </section>

     <Footer />
    
    </div>
  )
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-slate-700 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{desc}</p>
    </div>
  )
}
