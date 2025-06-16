import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Share2 } from 'lucide-react';

interface QRCodeDisplayProps {
  vendorId: string;
  upiId: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ vendorId, upiId }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [canShare, setCanShare] = useState<boolean>(false);

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const upiString = `upi://pay?pa=${upiId}&pn=QRKart Vendor&mc=0000&tid=${vendorId}&tt=P&am=&cu=INR&url=`;
        const qrDataUrl = await QRCode.toDataURL(upiString, {
          width: 256,
          margin: 2,
          color: {
            dark: '#1F2937',
            light: '#FFFFFF',
          },
        });
        setQrCodeUrl(qrDataUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    // Check if navigator.share is available
    setCanShare(!!navigator.share && !!navigator.canShare);

    generateQRCode();
  }, [vendorId, upiId]);

  const handleDownload = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = `qrkart-qr-${vendorId}.png`;
      link.click();
    }
  };

  const handleShare = async () => {
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const file = new File([blob], `qrkart-qr-${vendorId}.png`, {
        type: 'image/png',
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'QRKart Payment QR Code',
          text: 'Scan this QR code to make payments via UPI',
          files: [file],
        });
      } else {
        alert('Sharing not supported on your device or browser.');
      }
    } catch (error) {
      console.error('Error sharing QR code:', error);
      alert('Failed to share QR code.');
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Payment QR Code</h3>

      <div className="text-center">
        {qrCodeUrl ? (
          <div className="space-y-4">
            <div className="inline-block p-4 bg-gray-50 rounded-2xl">
              <img
                src={qrCodeUrl}
                alt={`QR Code for UPI ID: ${upiId}`}
                className="w-48 h-48 mx-auto"
              />
            </div>

            <p className="text-sm text-gray-600">
              Customers can scan this QR code to pay you directly via UPI
            </p>

            <div className="flex justify-center space-x-3">
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>

              {canShare && (
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors duration-200"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeDisplay;
