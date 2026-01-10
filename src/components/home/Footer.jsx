import React from 'react'

const Footer = () => {
  return (
   <footer className="border-t border-zinc-800 py-12 text-center text-sm text-zinc-500">
  <p className="text-zinc-300 font-semibold tracking-wide text-lg">
    StreamVault
  </p>

  <p className="mt-2 max-w-xl mx-auto text-zinc-500 leading-relaxed">
    Upload, analyze, and stream videos securely — anytime, anywhere.
  </p>

  <p className="mt-4 text-xs text-zinc-600">
    © {new Date().getFullYear()} StreamVault. All rights reserved.
  </p>
</footer>

  )
}

export default Footer