"use client";

import { useRouter } from "next/navigation";

export default function ShowQRPage() {
  const router = useRouter();
  const qrCodeImage = localStorage.getItem("qrCodeImage");

  const handleNext = () => {
    router.push("/setting/show-qr/verify-2fa");
  };

  return (
    <div className="grid grid-cols-2">
      <div className="common-bg flex flex-col items-center gap-6">
        <h2 className="text-xl font-semibold text-gray-700 text-center">
          Scan this QR code in your Authenticator app
        </h2>
        {qrCodeImage ? (
          <img src={qrCodeImage} alt="QR Code" className="w-64 h-64" />
        ) : (
          <p className="text-red-500">No QR code found</p>
        )}
        <button
          onClick={handleNext}
          className="bg-purple text-white px-6 py-2 rounded-md hover:bg-purple transition cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
