import { useState } from 'react'
import { RefreshCw, Copy, Check, Save } from 'lucide-react'

function EmailGenerator({ currentEmail, domains, onGenerate, onSave, onCopy, copyFeedback }) {
  const [username, setUsername] = useState('')
  const [selectedDomain, setSelectedDomain] = useState(domains[0])
  const [saving, setSaving] = useState(false)
  const [saveNote, setSaveNote] = useState('')
  const [showSaveInput, setShowSaveInput] = useState(false)

  const handleGenerate = () => {
    onGenerate(username.trim() || null, selectedDomain)
    setUsername('')
  }

  const handleSave = async () => {
    setSaving(true)
    await onSave(currentEmail, saveNote)
    setSaving(false)
    setShowSaveInput(false)
    setSaveNote('')
  }

  const generatedId = 'current-email'

  return (
    <div className="space-y-4">
      {/* Current Email Display */}
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current Email</p>
        <div className="flex items-center justify-between gap-2">
          <code className="text-lg font-mono text-indigo-600 dark:text-indigo-400 break-all">
            {currentEmail}
          </code>
          <button
            onClick={() => onCopy(currentEmail, generatedId)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            title="Copy to clipboard"
          >
            {copyFeedback[generatedId] ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* Generate Controls */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {/* Username Input */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Username (optional)
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Random"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            />
          </div>

          {/* Domain Select */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Domain
            </label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {domains.map((domain) => (
                <option key={domain} value={domain}>
                  @{domain}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleGenerate}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Generate New
          </button>
          
          {!showSaveInput ? (
            <button
              onClick={() => setShowSaveInput(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          ) : (
            <div className="flex gap-2 flex-1">
              <input
                type="text"
                value={saveNote}
                onChange={(e) => setSaveNote(e.target.value)}
                placeholder="Note (optional)"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleSave()}
              />
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors font-medium text-sm"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => {
                  setShowSaveInput(false)
                  setSaveNote('')
                }}
                className="px-3 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Inbox Link */}
      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
        <a
          href={`https://generator.email/${currentEmail}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors text-sm font-medium"
        >
          <Inbox className="w-4 h-4" />
          Open Inbox at generator.email
        </a>
      </div>
    </div>
  )
}

export default EmailGenerator
