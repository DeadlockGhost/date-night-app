import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Heart, Sparkles, Utensils,
  Clock, Send, Copy, Check, Mail,
  Volume2, VolumeX, Plus,
  Shirt, MessageCircleHeart,
  PartyPopper, Flame, Settings,
  X, RefreshCw
} from 'lucide-react';

export default function App() {
  const [stage, setStage] = useState('question');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });


  const [emailConfig, setEmailConfig] = useState({
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  targetEmail: import.meta.env.VITE_EMAILJS_TARGET_EMAIL || 's81547984@gmail.com',
});

  const [showConfigModal, setShowConfigModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [emailStatusMsg, setEmailStatusMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const [foodPlan, setFoodPlan] = useState('both');
  const [cravings, setCravings] = useState([
    'Hot Steamy Biryani 🍲',
    'Chocolate Ice Cream 🍨',
  ]);
  const [foodNotes, setFoodNotes] = useState('');

  const [activities, setActivities] = useState([
    { id: 'cuddles', title: '30-min Uninterrupted Cuddle Session', emoji: '🫂', desc: 'No phones allowed, pure warm spooning & heartbeats', checked: true },
    { id: 'drive', title: 'Late Night Long Drive & Ice Cream Run', emoji: '🚗🍦', desc: 'Windows down, romantic breeze, midnight cone', checked: true },
    { id: 'movie', title: 'You Pick the Movie, I Won’t Complain', emoji: '🎬🍿', desc: 'Rom-com, K-drama, or horror — I will watch with full attention', checked: true },
    { id: 'kiss_tax', title: 'Kiss Tax on Every Laughter', emoji: '💋', desc: 'Whenever you giggle or smile, you owe me 5 kisses immediately', checked: true },
    { id: 'dance', title: 'Romantic Slow Dance in the Room', emoji: '💃✨', desc: 'Soft lights, our favorite slow songs, hands around your waist', checked: false },
    { id: 'massage', title: 'Full Royalty Massage & Pampering', emoji: '💆‍♀️', desc: 'Foot & shoulder massage, hair stroking, absolute princess treatment', checked: true },
    { id: 'stargaze', title: 'Rooftop Stargazing & Sweet Talks', emoji: '🌌', desc: 'Looking at stars and talking about our future memories together', checked: false },
    { id: 'photos', title: 'Aesthetic Girlfriend Photoshoot', emoji: '📸💖', desc: 'I become your personal Instagram photographer until you get the perfect shot', checked: false },
  ]);
  const [newActivityText, setNewActivityText] = useState('');
  const [newActivityEmoji, setNewActivityEmoji] = useState('💖');

  const [timeSlot, setTimeSlot] = useState('7:30 PM (Candlelight & Sunset Glow ✨)');
  const [dressCode, setDressCode] = useState('Comfortable Cute PJs & Big Hoodies 🧸');
  const [excitement, setExcitement] = useState(500000);
  const [secretNote, setSecretNote] = useState('');

  const bgRef = useRef(null);

  // Background hearts
  useEffect(() => {
    if (!bgRef.current) return;
    const emojis = ['💖', '✨', '🌸', '🥰', '💕', '🌹'];
    let html = '';
    for (let i = 0; i < 8; i++) {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 4;
      const size = 1.2 + Math.random() * 1.5;
      html += `<span style="position:absolute;top:${top}%;left:${left}%;font-size:${size}rem;animation:floatPulse 4s ${delay}s infinite alternate ease-in-out;">${emojis[i % emojis.length]}</span>`;
    }
    bgRef.current.innerHTML = html;
  }, []);

  // Sound
  const playTone = (type = 'click') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;

      if (type === 'yes') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
        osc.start(); osc.stop(now + 0.4);
      } else if (type === 'dodge') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.linearRampToValueAtTime(140, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
        osc.start(); osc.stop(now + 0.15);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(740, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
        osc.start(); osc.stop(now + 0.1);
      }
    } catch { /* ignore */ }
  };

  // Confetti via canvas-confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#fecdd3'],
      emojis: ['💖', '🎉', '✨', '🌹', '👑'],
      scalar: 1.2,
    });
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: ['#f43f5e', '#ec4899'],
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ['#fb7185', '#fda4af'],
      });
    }, 250);
  };

  // Dodging No
  const noExcuses = [
    "No, I have to wash my hair 🙄",
    "Are you really sure? 🥺",
    "Think about the snacks! 🍕",
    "Error 404: 'No' is not permitted 🚫",
    "Oops! Button slipped away! 😜",
    "You know you love me! 💕",
    "Don't break my little heart! 💔",
    "Nice try, you are stuck with me! 🥰",
    "Resistance is futile, sweetie! 💍",
  ];

  const handleNoDodge = () => {
    playTone('dodge');
    setNoCount((prev) => prev + 1);
    setNoPos({
      x: (Math.random() - 0.5) * 280,
      y: (Math.random() - 0.5) * 180,
    });
  };

  // Activities
  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!newActivityText.trim()) return;
    setActivities([
      {
        id: `act_${Date.now()}`,
        title: newActivityText.trim(),
        emoji: newActivityEmoji,
        desc: 'Custom love wish crafted directly by the Queen 👸',
        checked: true,
      },
      ...activities,
    ]);
    setNewActivityText('');
    playTone('click');
  };

  const toggleActivity = (id) => {
    playTone('click');
    setActivities(activities.map((a) => (a.id === id ? { ...a, checked: !a.checked } : a)));
  };

  const toggleCraving = (item) => {
    playTone('click');
    setCravings((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  // Compile summary
  const getCompiledLoveData = () => {
    const selectedActs = activities
      .filter((a) => a.checked)
      .map((a) => `• ${a.emoji} ${a.title}`)
      .join('\n');

    const foodTitle =
      foodPlan === 'dinner' ? 'Grand Dinner Feast 🍽️🍷' :
      foodPlan === 'snacks' ? 'Snacks & Cuddle Feast 🍿🍕' :
      'Both! The Royal Dinner + Snacks & Dessert Combo 👑😋';

    return `💖 OFFICIAL DATE NIGHT BOOKING CONFIRMATION 💖\n` +
      `==========================================\n` +
      `TO: My Handsome Boyfriend 🤴❤️\n` +
      `FROM: Your Darling 👸✨\n\n` +
      `📅 DATE: Tomorrow Night!\n` +
      `⏰ TIME SLOT: ${timeSlot}\n` +
      `👗 DRESS CODE: ${dressCode}\n` +
      `🔥 EXCITEMENT LEVEL: ${excitement.toLocaleString()}% ❤️‍🔥\n\n` +
      `🍽️ FOOD PLAN:\n` +
      `Choice: ${foodTitle}\n` +
      `Cravings: ${cravings.length ? cravings.join(', ') : 'Surprise me with anything tasty!'}\n` +
      (foodNotes ? `Special Request: "${foodNotes}"\n\n` : `\n`) +
      `✨ SELECTED LOVE ACTIVITIES:\n${selectedActs || '• Endless Cuddles & Kisses'}\n\n` +
      (secretNote ? `💌 SECRET ORDERS FROM DARLING:\n"${secretNote}"\n\n` : '') +
      `==========================================\n` +
      `Status: Confirmed, Non-Refundable & Awaiting Romance! 🥰💋`;
  };

  // Submit — auto-send to Gmail
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    playTone('yes');
    setIsSending(true);
    setEmailStatusMsg('');

    const formattedMessage = getCompiledLoveData();
    const isConfigured =
      emailConfig.serviceId && emailConfig.templateId && emailConfig.publicKey;

    // No keys → auto-open Gmail
    if (!isConfigured) {
      const subject = encodeURIComponent('💖 Date Night Booking from Your Darling! 💌');
      const body = encodeURIComponent(formattedMessage);
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailConfig.targetEmail)}&su=${subject}&body=${body}`;
      window.open(gmailUrl, '_blank');

      setTimeout(() => {
        setIsSending(false);
        triggerConfetti();
        setStage('confirmed');
        setEmailStatusMsg(`📬 Gmail opened to send your booking to ${emailConfig.targetEmail}!`);
      }, 600);
      return;
    }

    // EmailJS
    const emailData = {
      service_id: emailConfig.serviceId,
      template_id: emailConfig.templateId,
      user_id: emailConfig.publicKey,
      template_params: {
        to_email: emailConfig.targetEmail,
        lover_name: 'Darling ',
        date_time: timeSlot,
        dress_code: dressCode,
        food_plan: foodPlan,
        cravings: cravings.join(', '),
        activities: activities.filter((a) => a.checked).map((a) => `${a.emoji} ${a.title}`).join(', '),
        excitement_level: `${excitement.toLocaleString()}%`,
        secret_note: secretNote || 'None! Just bring yourself and hugs 💕',
        full_summary: formattedMessage,
        message: formattedMessage,
      },
    };

    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData),
      });

      if (res.ok) {
        setIsSending(false);
        triggerConfetti();
        setStage('confirmed');
        setEmailStatusMsg(`✅ Booking email delivered to ${emailConfig.targetEmail}! 💌`);
      } else {
        const subject = encodeURIComponent('💖 Date Night Booking from Your Darling! 💌');
        const body = encodeURIComponent(formattedMessage);
        window.open(
          `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailConfig.targetEmail)}&su=${subject}&body=${body}`,
          '_blank'
        );
        setIsSending(false);
        triggerConfetti();
        setStage('confirmed');
        setEmailStatusMsg(`⚠️ EmailJS failed — Gmail opened instead for ${emailConfig.targetEmail}`);
      }
    } catch (err) {
      console.error(err);
      const subject = encodeURIComponent('💖 Date Night Booking from Your Darling! 💌');
      const body = encodeURIComponent(formattedMessage);
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailConfig.targetEmail)}&su=${subject}&body=${body}`,
        '_blank'
      );
      setIsSending(false);
      triggerConfetti();
      setStage('confirmed');
      setEmailStatusMsg(`⚠️ Network issue — Gmail opened instead for ${emailConfig.targetEmail}`);
    }
  };

  const openDirectGmail = () => {
    playTone('click');
    const subject = encodeURIComponent('💖 Date Night Booking from Your Darling! 💌');
    const body = encodeURIComponent(getCompiledLoveData());
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailConfig.targetEmail)}&su=${subject}&body=${body}`,
      '_blank'
    );
  };

  const openNativeMail = () => {
    playTone('click');
    const subject = encodeURIComponent('💖 Date Night Booking from Your Darling!');
    const body = encodeURIComponent(getCompiledLoveData());
    window.location.href = `mailto:${emailConfig.targetEmail}?subject=${subject}&body=${body}`;
  };

  const copyLoveSummary = () => {
    playTone('click');
    const text = getCompiledLoveData();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      className="min-h-screen text-slate-800 font-sans selection:bg-rose-200 relative overflow-x-hidden"
      style={{ background: 'linear-gradient(135deg, #ffe4e6 0%, #fce7f3 50%, #f3e8ff 100%)' }}
    >
      <div ref={bgRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40" />

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-rose-200/60 shadow-sm">
        <div className="max-w-2xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-md">
              <Heart className="w-5 h-5 fill-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-sm sm:text-lg font-bold text-rose-600 leading-tight">
                Darling's VIP Date Portal 💕
              </h1>
              <p className="text-[10px] sm:text-[11px] text-rose-400 font-medium">
                Tomorrow Night • Strictly VIP & Romantic
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200/60"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>
            <button
              onClick={() => setShowConfigModal(!showConfigModal)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 flex items-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Email</span>
            </button>
          </div>
        </div>
      </header>

      {/* EMAIL CONFIG MODAL */}
      {showConfigModal && (
        <div className="max-w-2xl mx-auto px-3 sm:px-4 mt-3 z-40 relative">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border-2 border-rose-300 shadow-xl text-xs sm:text-sm">
            <div className="flex items-center justify-between pb-3 border-b border-rose-100">
              <div className="flex items-center gap-2 font-bold text-rose-700">
                <Mail className="w-5 h-5 text-rose-500" />
                <span>EmailJS Setup (Auto-send to {emailConfig.targetEmail})</span>
              </div>
              <button onClick={() => setShowConfigModal(false)} className="p-1 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <ol className="list-decimal pl-5 space-y-1 my-3 text-slate-600 text-xs">
              <li>Sign up free at <a href="https://www.emailjs.com" target="_blank" rel="noreferrer" className="text-rose-600 font-bold underline">EmailJS.com</a></li>
              <li>Add Gmail service → copy <strong>Service ID</strong></li>
              <li>Create email template → copy <strong>Template ID</strong></li>
              <li>Account → API Keys → copy <strong>Public Key</strong></li>
            </ol>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Destination Gmail</label>
                <input
                  type="email"
                  value={emailConfig.targetEmail}
                  onChange={(e) => setEmailConfig({ ...emailConfig, targetEmail: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Public Key</label>
                <input
                  type="text"
                  value={emailConfig.publicKey}
                  onChange={(e) => setEmailConfig({ ...emailConfig, publicKey: e.target.value })}
                  placeholder="AbC123XyZ"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-slate-50 font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Service ID</label>
                <input
                  type="text"
                  value={emailConfig.serviceId}
                  onChange={(e) => setEmailConfig({ ...emailConfig, serviceId: e.target.value })}
                  placeholder="service_xxx"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-slate-50 font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Template ID</label>
                <input
                  type="text"
                  value={emailConfig.templateId}
                  onChange={(e) => setEmailConfig({ ...emailConfig, templateId: e.target.value })}
                  placeholder="template_xxx"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-slate-50 font-mono"
                />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-rose-100 flex justify-between items-center">
              <span className="text-[10px] text-rose-500 italic">
                *No keys? We'll auto-open Gmail instead.
              </span>
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-8 relative z-10">
        {/* STAGE 1 */}
        {stage === 'question' && (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-10 shadow-2xl border border-rose-200/80 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-100 text-rose-600 text-[10px] sm:text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4 text-rose-500 animate-spin" />
              <span>Official Boyfriend Proposal Notice</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-rose-600 tracking-tight mb-2">
              I Love You Darling! ❤️
            </h1>
            <div className="relative my-6 mx-auto max-w-sm rounded-3xl overflow-hidden shadow-lg border-2 border-rose-200 group">
              <img
                src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80"
                alt="Romantic"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80';
                }}
                className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent flex items-end justify-center pb-3">
                <span className="text-white text-[10px] sm:text-sm font-medium px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full">
                  ✨ Only for the prettiest girl in the world ✨
                </span>
              </div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200/80 mb-8">
              <p className="text-lg sm:text-2xl font-extrabold text-slate-800">
                Will you go on a date with me tomorrow? 🥺👉👈
              </p>
              <p className="text-[10px] sm:text-sm text-rose-500 font-medium mt-1">
                (Pick carefully... one button gives unlimited hugs and food!)
              </p>
            </div>
            <div className="relative min-h-[170px] flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
              <button
                onClick={() => { playTone('yes'); triggerConfetti(); setStage('booking'); }}
                style={{ transform: `scale(${1 + Math.min(noCount * 0.1, 0.45)})`, transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white font-extrabold text-base sm:text-xl rounded-2xl shadow-xl flex items-center justify-center gap-3 z-10 cursor-pointer active:scale-95"
              >
                <Heart className="w-6 h-6 fill-white animate-bounce" />
                <span>YES! A MILLION TIMES YES! 💖</span>
              </button>
              {noCount < 9 && (
                <button
                  onMouseEnter={handleNoDodge}
                  onClick={handleNoDodge}
                  style={{
                    transform: `translate(${noPos.x}px, ${noPos.y}px) scale(${Math.max(1 - noCount * 0.09, 0.45)})`,
                    transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                  className="w-full sm:w-auto px-5 py-4 bg-slate-100 text-slate-600 font-bold text-xs sm:text-base rounded-2xl border border-slate-300 cursor-pointer"
                >
                  {noExcuses[Math.min(noCount, noExcuses.length - 1)]}
                </button>
              )}
            </div>
            {noCount > 0 && (
              <p className="text-[10px] sm:text-xs text-rose-500 font-semibold mt-3 animate-pulse">
                Hehe! Trying to escape? You're officially trapped with my love forever! 🥰💋
              </p>
            )}
          </div>
        )}

        {/* STAGE 2 */}
        {stage === 'booking' && (
          <form onSubmit={handleBookingSubmit} className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-9 shadow-2xl border border-rose-200/80 space-y-7">
            <div className="text-center border-b border-rose-100 pb-5">
              <span className="text-[10px] font-bold text-rose-600 uppercase bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200">
                🎉 Date Night Confirmed! Now Let's Customize It 🥂
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-slate-800 mt-3">
                Your Date Night Menu & Activities 💖
              </h2>
            </div>

            {/* Food */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Utensils className="w-5 h-5 text-rose-500" />
                <h3 className="text-sm sm:text-lg font-bold">1. Tomorrow's Food:</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { key: 'dinner', emoji: '🍽️🍷', title: 'Grand Dinner', desc: 'Romantic candlelight, full courses, music.' },
                  { key: 'snacks', emoji: '🍿🍕', title: 'Snacks & Cuddles', desc: 'Street food, nachos, fries, boba.' },
                  { key: 'both', emoji: '👑😋', title: 'Both! (Queen)', desc: 'Big dinner + dessert runs + munchies.' },
                ].map((f) => (
                  <div
                    key={f.key}
                    onClick={() => { playTone('click'); setFoodPlan(f.key); }}
                    className={`p-4 rounded-2xl border-2 cursor-pointer ${foodPlan === f.key ? 'border-rose-500 bg-rose-50/70 ring-2 ring-rose-200' : 'border-slate-200 bg-white'}`}
                  >
                    <div className="text-3xl mb-2">{f.emoji}</div>
                    <h4 className="font-bold text-sm">{f.title}</h4>
                    <p className="text-[10px] text-slate-500 mt-1">{f.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200/80">
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-2">
                  What are you craving?
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Hot Steamy Biryani 🍲', 'Cheesy Gourmet Pizza 🍕', 'Spicy Momos & Dimsums 🥟',
                    'Creamy Pasta & Garlic Bread 🍝', 'Street Food & Chaat 🌮🍢', 'Crispy Burgers & Curly Fries 🍔🍟',
                    'Boba / Bubble Tea 🧋', 'Chocolate Ice Cream 🍨', 'Warm Waffles & Nutella 🧇🍫',
                  ].map((item) => {
                    const isSelected = cravings.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleCraving(item)}
                        className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold border flex items-center gap-1.5 ${isSelected ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-slate-700 border-slate-300'}`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        <span>{item}</span>
                      </button>
                    );
                  })}
                </div>
                <input
                  type="text"
                  value={foodNotes}
                  onChange={(e) => setFoodNotes(e.target.value)}
                  placeholder="Any particular spot in mind?"
                  className="w-full mt-3 px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                />
              </div>
            </div>

            {/* Activities */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <h3 className="text-sm sm:text-lg font-bold">2. Love Activities 💖</h3>
                </div>
                <span className="text-[10px] text-rose-600 font-semibold bg-rose-50 px-2 py-0.5 rounded-full">
                  {activities.filter((a) => a.checked).length} Selected
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activities.map((act) => (
                  <div
                    key={act.id}
                    onClick={() => toggleActivity(act.id)}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer flex items-start gap-3 ${act.checked ? 'border-rose-400 bg-rose-50/70' : 'border-slate-200 bg-white/70'}`}
                  >
                    <span className="text-2xl">{act.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs sm:text-sm truncate">{act.title}</h4>
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${act.checked ? 'bg-rose-500 border-rose-500 text-white' : 'border-slate-300 bg-white'}`}>
                          {act.checked && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">{act.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 border border-rose-200">
                <p className="text-[10px] font-bold text-rose-700 mb-2 flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" /> Add Custom Activity:
                </p>
                <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                  <select
                    value={newActivityEmoji}
                    onChange={(e) => setNewActivityEmoji(e.target.value)}
                    className="px-2 py-2 rounded-xl border border-rose-300 bg-white text-sm"
                  >
                    {['💖', '🧸', '🍦', '🍿', '✨', '💍', '💤', '🎮'].map((e) => (
                      <option key={e} value={e}>{e}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={newActivityText}
                    onChange={(e) => setNewActivityText(e.target.value)}
                    placeholder="e.g. 2 AM ice cream walk..."
                    className="flex-1 min-w-[120px] px-3 py-2 rounded-xl border border-rose-300 bg-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddActivity}
                    className="px-4 py-2 bg-rose-500 text-white font-bold text-xs rounded-xl flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>
            </div>

            {/* Time & Dress */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-rose-500" /> Preferred Time:
                </label>
                <div className="space-y-2">
                  {[
                    '6:30 PM (Golden Hour 🌅)',
                    '7:30 PM (Candlelight ✨)',
                  ].map((t) => (
                    <div
                      key={t}
                      onClick={() => { playTone('click'); setTimeSlot(t); }}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer ${timeSlot === t ? 'border-rose-500 bg-rose-50/80 font-bold text-rose-800' : 'border-slate-200 bg-white'}`}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-2 flex items-center gap-1.5">
                  <Shirt className="w-4 h-4 text-rose-500" /> Dress Code:
                </label>
                <div className="space-y-2">
                  {[
                    'Comfortable Cute PJs & Hoodies 🧸',
                    'Dress to Impress / Princess Fit 👗✨',
                    'Matching Couple Outfits 👯‍♀️💕',
                  ].map((d) => (
                    <div
                      key={d}
                      onClick={() => { playTone('click'); setDressCode(d); }}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer ${dressCode === d ? 'border-rose-500 bg-rose-50/80 font-bold text-rose-800' : 'border-slate-200 bg-white'}`}
                    >
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Excitement */}
            <div className="p-3 sm:p-4 rounded-2xl bg-rose-50/80 border border-rose-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-rose-500 animate-bounce" /> Excitement Level:
                </span>
                <span className="text-sm font-black text-rose-600 font-mono">
                  {excitement.toLocaleString()}% ❤️‍🔥
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="1000000"
                step="1000"
                value={excitement}
                onChange={(e) => setExcitement(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            {/* Secret Note */}
            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1.5 flex items-center gap-1.5">
                <MessageCircleHeart className="w-4 h-4 text-rose-500" /> Secret Note 💌
              </label>
              <textarea
                rows={3}
                value={secretNote}
                onChange={(e) => setSecretNote(e.target.value)}
                placeholder="Write any secret demands here..."
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white font-extrabold text-sm sm:text-lg rounded-2xl shadow-xl flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70"
              >
                {isSending ? (
                  <><RefreshCw className="w-5 h-5 spin" /><span>Sending to {emailConfig.targetEmail}... 💌</span></>
                ) : (
                  <><PartyPopper className="w-5 h-5" /><span>Complete Booking & Send to My Gmail! 🚀💖</span></>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STAGE 3 */}
        {stage === 'confirmed' && (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-10 shadow-2xl border border-rose-200 text-center space-y-5">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-lg animate-bounce">
              <PartyPopper className="w-10 h-10" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Official Booking Confirmed!
              </span>
              <h2 className="text-xl sm:text-4xl font-black text-slate-800 mt-2">
                Your Boyfriend is Preparing Everything! 🌹❤️
              </h2>
            </div>

            {emailStatusMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-[10px] text-rose-700 flex items-center justify-center gap-2">
                <Mail className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span>{emailStatusMsg}</span>
              </div>
            )}

            <div className="max-w-md mx-auto bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700 text-white rounded-3xl p-5 shadow-2xl relative overflow-hidden text-left">
              <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
                <Heart className="w-48 h-48 fill-white" />
              </div>
              <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-3">
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-rose-200 block">Boarding Pass</span>
                  <span className="font-black text-sm">VIP DATE NIGHT TICKET</span>
                </div>
                <span className="font-mono text-[10px] font-bold text-emerald-200 bg-emerald-950/40 px-2 py-0.5 rounded">
                  CONFIRMED ✅
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                <div><span className="text-[9px] text-rose-200 block uppercase font-bold">Queen:</span><span className="font-bold text-xs">Darling 👸💖</span></div>
                <div><span className="text-[9px] text-rose-200 block uppercase font-bold">Boyfriend:</span><span className="font-bold text-xs">Most In Love Guy 🤴🌹</span></div>
                <div><span className="text-[9px] text-rose-200 block uppercase font-bold">When:</span><span className="text-[10px]">{timeSlot.split('(')[0]}</span></div>
                <div><span className="text-[9px] text-rose-200 block uppercase font-bold">Dress:</span><span className="text-[10px]">{dressCode.split('/')[0]}</span></div>
                <div className="col-span-2"><span className="text-[9px] text-rose-200 block uppercase font-bold">Dinner:</span><span className="text-[10px]">{foodPlan === 'dinner' ? 'Grand Dinner 🍽️' : foodPlan === 'snacks' ? 'Snacks Feast 🍿' : 'Royal Combo 👑'}</span></div>
                <div className="col-span-2"><span className="text-[9px] text-rose-200 block uppercase font-bold">Activities:</span><span className="text-[10px] line-clamp-2">{activities.filter((a) => a.checked).map((a) => `${a.emoji} ${a.title}`).join(', ')}</span></div>
              </div>
              <div className="pt-2.5 border-t border-white/20 flex items-center justify-between text-[10px] text-rose-100">
                <span>Excitement: {excitement.toLocaleString()}% ❤️‍🔥</span>
                <span>Payment: 100 Kisses 💋</span>
              </div>
            </div>

            <div className="space-y-2.5 max-w-md mx-auto pt-2">
              <button
                type="button"
                onClick={openDirectGmail}
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Open Gmail to Send to {emailConfig.targetEmail}</span>
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={copyLoveSummary}
                  className="py-2.5 px-3 bg-white border border-slate-300 text-slate-700 font-semibold text-[10px] rounded-xl flex items-center justify-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                </button>
                <button
                  type="button"
                  onClick={openNativeMail}
                  className="py-2.5 px-3 bg-white border border-slate-300 text-slate-700 font-semibold text-[10px] rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-rose-500" />
                  <span>Mobile Mail</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => { playTone('click'); setStage('question'); setNoCount(0); }}
                className="text-[10px] text-slate-400 hover:text-slate-600 font-medium py-1 flex items-center justify-center gap-1 mx-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Start Over
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="text-center py-6 text-[10px] sm:text-xs text-rose-500/80 relative z-10 font-medium">
        <p>Built with all my love • Auto-sends to {emailConfig.targetEmail} 🥰🌹</p>
      </footer>
    </div>
  );
}