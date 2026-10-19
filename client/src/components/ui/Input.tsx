import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  id,
  className = '',
  required,
  disabled,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-danger-500">*</span>}
        </label>
      )}

      <div className="relative rounded-lg shadow-2xs">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          required={required}
          className={`
            block w-full rounded-lg text-sm border transition-colors duration-150 py-2
            ${leftIcon ? 'pl-9' : 'pl-3.5'}
            ${rightIcon ? 'pr-9' : 'pr-3.5'}
            ${error
              ? 'border-danger-400 text-danger-900 placeholder-danger-300 focus:border-danger-500 focus:ring-1 focus:ring-danger-500'
              : 'border-slate-300 text-slate-900 placeholder-slate-400 hover:border-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
            }
            ${disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200' : 'bg-white'}
            ${className}
          `}
          {...props}
        />

        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs text-danger-600 mt-1 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-xs text-slate-500 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
