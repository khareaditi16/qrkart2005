import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Download, Share2, Copy, RefreshCw, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthProvider';

interface QRGeneratorProps {
  onClose: () => void;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ onClose }) => {
  const { user } = useAuth();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [qrType, setQrType] = useState<'payment' | 'profile' | 'contact'>('payment');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [upiId, setUpiId] = useState<string>('vendor@paytm');
  const [loading, setLoading] = useState(false);

  const generateQRCode = async () => {
    setLoading(true);
    try {
      let qrData = '';
      
      switch (qrType) {
        case 'payment':
          qrData = `upi://pay?pa=${upiId}&pn=${user?.name || 'QRKart Vendor'}&mc=0000&tid=${user?.id}&tt=P${customAmount ? `&am=${customAmount}` : ''}&cu=INR&url=`;
          break;
        case 'profile':
          qrData = `https://qrkart.com/vendor/${user?.id}`;
          break;
        case 'contact':
          qrData = `BEGIN:VCARD\nVERSION:3.0\nFN:${user?.name}\nORG:QRKart Vendor\nEMAIL:${user?.email}\nEND:VCARD`;
          break;
      }

      const qrDataUrl = await QRCode.toDataURL(qrData, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1F2937',
          light: '#FFFFFF',
        },
        errorCorrectionLevel: 'M',
      });
      setQrCodeUrl(qrDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateQRCode();
  }, [qrType, customAmount, upiId]);

  const handleDownload = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = `qrkart-${qrType}-qr-${user?.id}.png`;
      link.click();
    }
  };

  const handleShare = async () => {
    if (navigator.share && qrCodeUrl) {
      try {
        const response = await fetch(qrCodeUrl);
        const blob = await response.blob();
        const file = new File([blob], `qrkart-${qrType}-qr.png`, { type: 'image/png' });
        
        await navigator.share({
          title: `QRKart ${qrType.charAt(0).toUpperCase() + qrType.slice(1)} QR Code`,
          text: `My QRKart ${qrType} QR code`,
          files: [file],
        });
      } catch (error) {
        console.error('Error sharing QR code:', error);
      }
    }
  };

  const copyToClipboard = async () => {
    if (qrCodeUrl) {
      try {
        const response = await fetch(qrCodeUrl);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        alert('QR code copied to clipboard!');
      } catch (error) {
        console.error('Error copying QR code:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Generate QR Code</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            ×
          </button>
        </div>

        {/* QR Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">QR Code Type</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { type: 'payment', label: 'Payment', icon: '💳' },
              { type: 'profile', label: 'Profile', icon: '👤' },
              { type: 'contact', label: 'Contact', icon: '📞' },
            ].map((option) => (
              <button
                key={option.type}
                onClick={() => setQrType(option.type as any)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  qrType === option.type
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-lg mb-1">{option.icon}</div>
                <div className="text-xs font-medium">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Options */}
        {qrType === 'payment' && (
          <div className="mb-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="your-upi@bank"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fixed Amount (Optional)
              </label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter amount in ₹"
              />
            </div>
          </div>
        )}

        {/* QR Code Display */}
        <div className="text-center mb-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : qrCodeUrl ? (
            <div className="space-y-4">
              <div className="inline-block p-4 bg-gray-50 rounded-2xl">
                <img 
                  src={qrCodeUrl} 
                  alt={`${qrType} QR Code`}
                  className="w-64 h-64 mx-auto"
                />
              </div>
              <p className="text-sm text-gray-600">
                {qrType === 'payment' && 'Customers can scan to pay you via UPI'}
                {qrType === 'profile' && 'Share your vendor profile'}
                {qrType === 'contact' && 'Share your contact information'}
              </p>
            </div>
          ) : null}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-3">
          <button
            onClick={generateQRCode}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Regenerate</span>
          </button>
          
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
          
          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-2 px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
          >
            <Copy className="w-4 h-4" />
            <span>Copy</span>
          </button>
          
          {navigator.share && (
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;