import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';

const ChatInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
    }
  }, [message]);

  // Focus input when not disabled
  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Quick suggestion buttons
  const quickSuggestions = [
    "Current AQI?",
    "Safe to exercise?",
    "Health tips",
    "Tomorrow's forecast"
  ];

  const handleSuggestionClick = (suggestion) => {
    if (!disabled) {
      onSendMessage(suggestion);
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white">
      {/* Quick Suggestions - Better mobile layout */}
      {message === '' && (
        <div className="px-3 py-2 border-b border-gray-100">
          <div className="flex flex-wrap gap-1.5">
            {quickSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                disabled={disabled}
                className="text-[10px] sm:text-xs bg-gray-100 text-gray-600 px-2 py-1 sm:px-3 sm:py-1 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area - Improved mobile layout */}
      <form onSubmit={handleSubmit} className="p-3 sm:p-4">
        <div className="flex items-end space-x-1.5 sm:space-x-2">
          {/* Additional Actions (Future: File upload, etc.) */}
          <button
            type="button"
            disabled={disabled}
            className="flex-shrink-0 p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="More options (coming soon)"
          >
            <Paperclip className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Text Input - Better mobile sizing */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={disabled ? "AI is thinking..." : "Ask about air quality..."}
              disabled={disabled}
              rows={1}
              className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-sm sm:text-base"
              style={{ minHeight: '36px', maxHeight: '100px' }}
            />
            
            {/* Character counter for long messages */}
            {message.length > 100 && (
              <div className="absolute -top-5 right-0 text-xs text-gray-400">
                {message.length}/500
              </div>
            )}
          </div>

          {/* Emoji Button (Future feature) */}
          <button
            type="button"
            disabled={disabled}
            className="flex-shrink-0 p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Emojis (coming soon)"
          >
            <Smile className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Send Button - Better mobile sizing */}
          <button
            type="submit"
            disabled={disabled || !message.trim()}
            className="flex-shrink-0 p-1.5 sm:p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Input Helper Text - Better mobile text sizing */}
        <div className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-gray-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <span>Enter to send, Shift+Enter for new line</span>
          {disabled && (
            <span className="text-blue-600 flex items-center text-xs">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-pulse mr-1"></div>
              AI is typing...
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChatInput;