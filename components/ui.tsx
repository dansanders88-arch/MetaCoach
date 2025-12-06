import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  brandColor?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'primary', 
  brandColor,
  style,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2";
  
  let variantStyles = "";
  let customStyle = { ...style };

  if (variant === 'primary') {
    variantStyles = "text-white shadow hover:opacity-90";
    if (brandColor) {
      customStyle = { ...customStyle, backgroundColor: brandColor };
    } else {
      variantStyles += " bg-indigo-600 hover:bg-indigo-700";
    }
  } else if (variant === 'secondary') {
    variantStyles = "bg-slate-700 text-slate-100 shadow-sm hover:bg-slate-600";
  } else if (variant === 'ghost') {
    variantStyles = "hover:bg-slate-800 text-slate-300 hover:text-white";
  } else if (variant === 'danger') {
    variantStyles = "bg-red-900/50 text-red-200 hover:bg-red-900/70 border border-red-900";
  }

  return (
    <button 
      className={cn(baseStyles, variantStyles, className)} 
      style={customStyle}
      {...props} 
    />
  );
};

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("rounded-xl border border-slate-700 bg-surface text-slate-100 shadow", className)} {...props} />
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => (
  <input
    className={cn(
      "flex h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 text-white",
      className
    )}
    {...props}
  />
);

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className, ...props }) => (
  <label
    className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-300", className)}
    {...props}
  />
);

export const Badge: React.FC<React.HTMLAttributes<HTMLSpanElement> & { variant?: 'default' | 'success' | 'warning' }> = ({ className, variant = 'default', ...props }) => {
    const variants = {
        default: "bg-slate-700 text-slate-200",
        success: "bg-emerald-900/50 text-emerald-400 border border-emerald-900",
        warning: "bg-amber-900/50 text-amber-400 border border-amber-900",
    }
    return (
        <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none", variants[variant], className)} {...props} />
    )
}
