export function formatPrice(amount: number, currency: 'PKR' | 'USD' = 'PKR'): string {
  if (currency === 'USD') {
    const usdAmount = amount * 0.0036;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(usdAmount);
  }

  if (amount >= 10000000) {
    return `${(amount / 10000000).toFixed(2).replace(/\.00$/, '')} Crore`;
  } else if (amount >= 100000) {
    return `${(amount / 100000).toFixed(2).replace(/\.00$/, '')} Lac`;
  } else {
    return `PKR ${new Intl.NumberFormat('en-PK').format(amount)}`;
  }
}

export function formatArea(size: number, unit: string): string {
  return `${size} ${unit}`;
}

export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
}
