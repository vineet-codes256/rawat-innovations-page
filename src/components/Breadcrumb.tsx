'use client';

import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
    >
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href="/"
            className="text-gray-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <svg
              className="w-4 h-4 mx-2 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {item.current ? (
              <span
                className="text-blue-600 font-medium"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : item.href ? (
              <Link
                href={item.href}
                className="text-gray-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-600">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
