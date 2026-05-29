import React, { useState, useEffect, useRef } from 'react'

export default function App() {
    const [form, setForm] = useState({ template: 'modern', name: '', phone: '', education: '', skills: '', experience: '' })
    const [theme, setTheme] = useState('dark')

    useEffect(() => {
        // simple live-preview binding (avoid optional-chaining on assignment)
        const nameEl = document.getElementById('preview-name')
        if (nameEl) nameEl.innerText = form.name || 'Your Name'

        const roleEl = document.getElementById('preview-role')
        if (roleEl) roleEl.innerText = form.phone ? form.phone : 'Professional Title'

        const body = document.getElementById('preview-body')
        if (body) {
            body.innerHTML = `<p>${form.education ? `<strong>Education:</strong> ${form.education}<br/>` : ''}${form.skills ? `<strong>Skills:</strong> ${form.skills}<br/>` : ''}${form.experience ? `<strong>Experience:</strong> ${form.experience}` : 'No details yet — start typing.'}</p>`
        }
    }, [form])

    function handleChange(e) {
        const { id, value } = e.target
        setForm(prev => ({ ...prev, [id]: value }))
    }

    useEffect(() => {
        // apply theme on document root
        document.documentElement.classList.toggle('theme-dark', theme === 'dark')
    }, [theme])

    // Entrance-on-scroll: add animate class when element enters viewport
    useEffect(() => {
        const els = document.querySelectorAll('.animate-fade-up')
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.style.opacity = 1
                    e.target.classList.add('animate-fade-up')
                    io.unobserve(e.target)
                }
            })
        }, { threshold: 0.12 })
        els.forEach(el => {
            el.style.opacity = 0
            io.observe(el)
        })
        return () => io.disconnect()
    }, [])

    // ref for CTA to attach magnetic effect and confetti
    const ctaRef = useRef(null)
    useEffect(() => {
        const btn = ctaRef.current
        if (!btn) return

        function onMove(e) {
            const rect = btn.getBoundingClientRect()
            const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width
            const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height
            const inner = btn.querySelector('.magnet-inner')
            if (inner) {
                inner.style.transform = `translate(${dx * 8}px, ${dy * 6}px) scale(1.02)`
            }
        }
        function onLeave() {
            const inner = btn.querySelector('.magnet-inner')
            if (inner) inner.style.transform = ''
        }
        btn.addEventListener('mousemove', onMove)
        btn.addEventListener('mouseleave', onLeave)
        return () => { btn.removeEventListener('mousemove', onMove); btn.removeEventListener('mouseleave', onLeave) }
    }, [])

    // confetti burst helper
    function spawnConfetti(x = window.innerWidth / 2, y = 200) {
        const colors = ['#6c5ce7', '#00e5a8', '#ffd166', '#ff6b6b']
        for (let i = 0; i < 18; i++) {
            const el = document.createElement('div')
            el.className = 'confetti-piece'
            el.style.left = (x + (Math.random() - 0.5) * 120) + 'px'
            el.style.top = (y + (Math.random() - 0.5) * 40) + 'px'
            el.style.background = colors[Math.floor(Math.random() * colors.length)]
            el.style.transform = `rotate(${Math.random() * 360}deg)`
            document.body.appendChild(el)
            setTimeout(() => el.remove(), 1400)
        }
    }

    return (
        <div className="app-shell relative">
            <div className="hero-glow" aria-hidden />
            <header className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-display font-extrabold tracking-tight">CvCodeHub</h1>
                    <p className="text-sm muted">Beautiful, readable CVs — fast</p>
                </div>

                <div className="flex gap-3">
                    <button className="btn btn-secondary text-sm" onClick={() => alert('Invite (stub)')}>Invite</button>
                    <button className="btn btn-secondary text-sm" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? 'Light' : 'Dark'}</button>
                    <button className="btn cta shimmer transition-active" onClick={() => alert('Upgrade (stub)')}>Upgrade</button>
                </div>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className="glass-card p-6 card-hover animate-fade-up">
                    <h2 className="text-lg font-semibold mb-4">Build your CV</h2>

                    <div className="grid grid-cols-2 gap-3">
                        <label className="col-span-2">
                            <span className="text-xs label-strong">Template</span>
                            <select id="template" value={form.template} onChange={handleChange} className="w-full mt-1 p-3 rounded-md border border-white/6 bg-transparent text-current">
                                <option value="modern">Modern (Free)</option>
                                <option value="simple">Simple (Free)</option>
                                <option value="pro">Professional (Premium)</option>
                            </select>
                        </label>

                        <label>
                            <span className="text-xs label-strong">Full name</span>
                            <input id="name" value={form.name} onChange={handleChange} className="w-full mt-1 p-3 rounded-lg glow-focus bg-transparent border border-white/6 text-current" placeholder="Jane Doe" />
                        </label>

                        <label>
                            <span className="text-xs label-strong">Phone</span>
                            <input id="phone" value={form.phone} onChange={handleChange} className="w-full mt-1 p-3 rounded-md border border-white/6 bg-transparent text-current" placeholder="+1 555 555 5555" />
                        </label>

                        <label className="col-span-2">
                            <span className="text-xs label-strong">Education</span>
                            <textarea id="education" value={form.education} onChange={handleChange} rows={3} className="w-full mt-1 p-3 rounded-md border border-white/6 bg-transparent text-current" placeholder="School, degree, years" />
                        </label>

                        <label className="col-span-2">
                            <span className="text-xs label-strong">Skills</span>
                            <textarea id="skills" value={form.skills} onChange={handleChange} rows={2} className="w-full mt-1 p-3 rounded-md border border-white/6 bg-transparent text-current" placeholder="List your key skills" />
                        </label>

                        <label className="col-span-2">
                            <span className="text-xs label-strong">Experience</span>
                            <textarea id="experience" value={form.experience} onChange={handleChange} rows={4} className="w-full mt-1 p-3 rounded-md border border-white/6 bg-transparent text-current" placeholder="Roles, responsibilities, impact" />
                        </label>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                        <button className="px-4 py-2 rounded-lg cta shimmer pop" onClick={() => alert('Save CV (stub)')}>Save CV</button>
                        <button className="btn btn-secondary" onClick={() => alert('Download PDF (stub)')}>Download PDF</button>
                        <button className="btn btn-secondary text-sm" onClick={() => alert('AI Summary (stub)')}>🤖 AI Summary</button>
                    </div>
                </section>

                <aside className="space-y-4">
                    <div className="glass-card p-5 card-hover animate-fade-up" style={{ animationDelay: '120ms' }}>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10"></div>
                            <div>
                                <h3 id="preview-name" className="text-lg font-semibold">Your Name</h3>
                                <p id="preview-role" className="text-sm muted">Professional Title</p>
                            </div>
                        </div>

                        <div id="preview-body" className="mt-4 text-sm text-gray-600">No details yet — start typing on the left to preview.</div>

                        <div className="mt-4 flex gap-2">
                            <button className="btn btn-secondary">Export</button>
                            <button className="btn btn-ghost text-sm">Share</button>
                        </div>
                    </div>

                    <div className="glass-card p-4 card-hover animate-fade-up" style={{ animationDelay: '200ms' }}>
                        <h4 className="text-sm font-semibold mb-2">Tips</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>- Keep bullets short and impact-focused.</li>
                            <li>- Use metrics where possible (e.g., increased X by 20%).</li>
                        </ul>
                    </div>
                </aside>
            </main>
        </div>
    )
}
