'use client';

import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
      setErrorMessage('Failed to send. Please try again.');
    }
  }

  return (
    <main className="relative min-h-screen">
      <Navigation />

      <section className="pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-black dark:text-white">
            Contact
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mb-12">
            Get in touch. Send us a message and we&apos;ll get back to you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-black dark:text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                placeholder="Your name"
                disabled={status === 'sending'}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-black dark:text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                placeholder="your@email.com"
                disabled={status === 'sending'}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-black dark:text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent resize-y min-h-[120px]"
                placeholder="Your message"
                disabled={status === 'sending'}
              />
            </div>

            {status === 'success' && (
              <p className="text-green-600 dark:text-green-400 text-sm">
                Message sent. We&apos;ll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-600 dark:text-red-400 text-sm">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full md:w-auto px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
