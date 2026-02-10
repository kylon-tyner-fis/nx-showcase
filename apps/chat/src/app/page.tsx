'use client';

import { useState } from 'react';
import styles from './page.module.scss';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const result = await response.json();
      if (result.success) {
        setMessages((prev) => [...prev, { role: 'ai', content: result.data }]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: 'Error: Service unavailable.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Nx + Fastify AI Chat</h1>
      </header>

      <div className={styles.messageWindow}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`${styles.message} ${m.role === 'user' ? styles.user : styles.ai}`}
          >
            {m.content}
          </div>
        ))}
        {isLoading && <div className={styles.loading}>AI is thinking...</div>}
      </div>

      <form onSubmit={handleSubmit} className={styles.inputArea}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
