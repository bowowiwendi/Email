import { Copy, Check, Trash2, ExternalLink } from 'lucide-react'

function EmailList({ emails, onDelete, onCopy, copyFeedback }) {
  if (emails.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p>No saved emails yet</p>
        <p className="text-sm mt-1">Generate and save your first email!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
      {emails.map((email) => (
        <EmailCard
          key={email.id}
          email={email}
          onDelete={onDelete}
          onCopy={onCopy}
          copyFeedback={copyFeedback}
        />
      ))}
    </div>
  )
}

function EmailCard({ email, onDelete, onCopy, copyFeedback }) {
  const { id, email: emailAddr, username, domain, note, created_at, is_active } = email

  const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <div className={`p-4 rounded-lg border-2 transition-all ${
      is_active 
        ? 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600' 
        : 'bg-gray-100 dark:bg-gray-800 border-gray-100 dark:border-gray-700 opacity-60'
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Email Address */}
          <div className="flex items-center gap-2 mb-1">
            <code className="text-sm font-mono text-indigo-600 dark:text-indigo-400 break-all">
              {emailAddr}
            </code>
            <button
              onClick={() => onCopy(emailAddr, id)}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors flex-shrink-0"
              title="Copy to clipboard"
            >
              {copyFeedback[id] ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              )}
            </button>
          </div>

          {/* Note */}
          {note && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{note}</p>
          )}

          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span>Saved on {formattedDate}</span>
            <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-600 rounded-full">
              @{domain}
            </span>
            {is_active && (
              <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                Active
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          <a
            href={`https://generator.email/${emailAddr}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg transition-colors"
            title="Open inbox"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={() => onDelete(id)}
            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-colors"
            title="Delete email"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmailList
