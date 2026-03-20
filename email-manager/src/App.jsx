import { useState, useEffect } from 'react'
import { Mail, RefreshCw, Trash2, Copy, Check, Plus, Inbox } from 'lucide-react'
import { supabase } from './lib/supabaseClient'
import EmailGenerator from './components/EmailGenerator'
import EmailList from './components/EmailList'
import './App.css'

// Available domains from generator.email
const AVAILABLE_DOMAINS = [
  'liveforms.org',
  'thaitudang.xyz',
  'streamingku.live',
  'arapps.me',
  'zoomintens.com',
  'dudscc.com',
  'thaihp.net',
  'zenbyul.com',
  'icloudmail.kr',
  '88cloud.cc',
  'extraku.shop',
  'sadove.shop',
  'giangholang.xyz',
  'porhantek.shop',
  'dishow.net'
]

function App() {
  const [currentEmail, setCurrentEmail] = useState('')
  const [savedEmails, setSavedEmails] = useState([])
  const [loading, setLoading] = useState(true)
  const [copyFeedback, setCopyFeedback] = useState({})

  // Generate random username
  const generateUsername = () => {
    const adjectives = ['happy', 'swift', 'calm', 'bright', 'quick', 'smart', 'cool', 'fresh', 'wild', 'bold']
    const nouns = ['panda', 'tiger', 'eagle', 'wolf', 'fox', 'bear', 'lion', 'hawk', 'deer', 'owl']
    const num = Math.floor(Math.random() * 1000)
    return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${num}`
  }

  // Generate new email
  const generateEmail = (customUsername = null, customDomain = null) => {
    const username = customUsername || generateUsername()
    const domain = customDomain || AVAILABLE_DOMAINS[Math.floor(Math.random() * AVAILABLE_DOMAINS.length)]
    return `${username}@${domain}`
  }

  // Initialize with a new email
  useEffect(() => {
    const email = generateEmail()
    setCurrentEmail(email)
  }, [])

  // Load saved emails from Supabase
  useEffect(() => {
    loadSavedEmails()
  }, [])

  const loadSavedEmails = async () => {
    try {
      const { data, error } = await supabase
        .from('saved_emails')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setSavedEmails(data || [])
    } catch (error) {
      console.error('Error loading saved emails:', error)
    } finally {
      setLoading(false)
    }
  }

  // Save email to Supabase
  const saveEmail = async (email, note = '') => {
    const [username, domain] = email.split('@')
    
    try {
      const { data, error } = await supabase
        .from('saved_emails')
        .upsert({
          email,
          username,
          domain,
          note,
          is_active: true
        }, { onConflict: 'email' })
        .select()

      if (error) throw error
      
      loadSavedEmails()
      return { success: true, data }
    } catch (error) {
      console.error('Error saving email:', error)
      return { success: false, error: error.message }
    }
  }

  // Delete email from Supabase
  const deleteEmail = async (id) => {
    try {
      const { error } = await supabase
        .from('saved_emails')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      loadSavedEmails()
      return { success: true }
    } catch (error) {
      console.error('Error deleting email:', error)
      return { success: false, error: error.message }
    }
  }

  // Copy email to clipboard
  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopyFeedback(prev => ({ ...prev, [id]: true }))
      setTimeout(() => {
        setCopyFeedback(prev => ({ ...prev, [id]: false }))
      }, 2000)
      return { success: true }
    } catch (error) {
      console.error('Error copying to clipboard:', error)
      return { success: false, error: error.message }
    }
  }

  // Handle new email generation
  const handleGenerateNew = (username, domain) => {
    const email = generateEmail(username, domain)
    setCurrentEmail(email)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Email Manager</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Temporary Email Generator</p>
            </div>
          </div>
          <a
            href="https://generator.email"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Powered by generator.email
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Email Generator Section */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Inbox className="w-5 h-5" />
                Generate Email
              </h2>
              
              <EmailGenerator
                currentEmail={currentEmail}
                domains={AVAILABLE_DOMAINS}
                onGenerate={handleGenerateNew}
                onSave={saveEmail}
                onCopy={copyToClipboard}
                copyFeedback={copyFeedback}
              />
            </div>

            {/* Info Card */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-2">
                📌 Cara Penggunaan
              </h3>
              <ul className="text-sm text-indigo-800 dark:text-indigo-400 space-y-1">
                <li>• Generate email temporary untuk verifikasi</li>
                <li>• Simpan email favorit untuk akses cepat</li>
                <li>• Kunjungi generator.email untuk cek inbox</li>
                <li>• Copy email dan gunakan untuk signup</li>
              </ul>
            </div>
          </div>

          {/* Saved Emails Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Saved Emails
              <span className="ml-auto text-sm font-normal text-gray-500">
                {savedEmails.length} email(s)
              </span>
            </h2>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="w-6 h-6 animate-spin text-indigo-600" />
              </div>
            ) : (
              <EmailList
                emails={savedEmails}
                onDelete={deleteEmail}
                onCopy={copyToClipboard}
                copyFeedback={copyFeedback}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Built with React + Vite + Supabase + Vercel</p>
        <p className="mt-1">Data stored in Supabase • Deploy on Vercel</p>
      </footer>
    </div>
  )
}

export default App
