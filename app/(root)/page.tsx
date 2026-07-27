import React from 'react';

// Static redirect for the root path since output: 'export' does not support server redirects
export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/en" />
      <title>Redirecting...</title>
      <p>Redirecting to English...</p>
    </>
  );
}
