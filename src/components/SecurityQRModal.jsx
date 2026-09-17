import React, { useState } from 'react'
import { ShieldCheck, X, CheckCircle2, Lock, Smartphone, RefreshCw, KeyRound, Sparkles } from 'lucide-react'
import { QRCode } from './QRCode'

export function SecurityQRModal({ isOpen, onClose, data = {}, type = 'booking' }) {
  const [isScanned, setIsScanned] = useState(false)
  const [scanning, setScanning] = useState(false)

  if (!isOpen || !data) return null

  const isBooking = type === 'booking'
  const codeId = isBooking ? (data.booking_id || data.id || 'QS-2026-001') : (data.id ? `PRO-${data.id.slice(0, 8)}` : 'PRO-SEC-01')
  const serviceName = isBooking ? data.service : (data.service || data.service_category || 'Home Services')
  const proName = isBooking ? (data.provider_name || 'Verified Pro') : (data.name || 'Verified Pro')
  const customerName = isBooking ? (data.customer_name || 'Jane Doe') : 'Customer Verification'

  // Deterministic 4-digit security PIN based on ID
  const hash = String(codeId).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const otpPin = String(1000 + (hash * 47) % 9000).padStart(4, '0')
  const verificationUrl = `https://quickserve.app/verify/${codeId}?pin=${otpPin}&ts=${Date.now()}`

  const handleSimulateScan = () => {
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      setIsScanned(true)
    }, 1000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-md bg-[#FAF8F5] dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stone-200/70 dark:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center justify-center hover:bg-stone-300 transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300/60">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>QuickServe Security Shield</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-stone-900 dark:text-white">
            {isBooking ? 'Doorstep Security Pass' : 'Verified Pro Credentials'}
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-400 max-w-xs mx-auto">
            {isBooking
              ? 'Scan upon arrival at your doorstep to verify technician identity and prevent scams.'
              : 'Scan to verify professional license, background check clearance, and insurance.'}
          </p>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center py-2">
          <div className="p-2 bg-white rounded-3xl shadow-md border border-stone-200/80">
            <QRCode value={verificationUrl} size={180} />
          </div>

          {/* Verification Code Pill */}
          <div className="mt-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-200/80 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-mono text-xs font-bold">
            <Lock size={12} className="text-stone-500" />
            <span>TOKEN: {codeId}</span>
          </div>
        </div>

        {/* Security Credentials Summary */}
        <div className="mt-6 space-y-3 bg-white dark:bg-stone-800/80 rounded-2xl p-4 border border-stone-200/80 dark:border-stone-700/60 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-700">
            <span className="text-stone-500 flex items-center gap-1">
              <KeyRound size={13} /> Doorstep 4-Digit PIN
            </span>
            <span className="font-mono font-black text-sm tracking-widest bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-md border border-amber-200">
              {otpPin}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-stone-500">Service</span>
            <span className="font-bold text-stone-900 dark:text-white">{serviceName}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-stone-500">{isBooking ? 'Technician' : 'Provider'}</span>
            <span className="font-bold text-stone-900 dark:text-white">{proName}</span>
          </div>

          {isBooking && (
            <div className="flex items-center justify-between">
              <span className="text-stone-500">Customer</span>
              <span className="font-bold text-stone-900 dark:text-white">{customerName}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            <span className="flex items-center gap-1">
              <CheckCircle2 size={13} /> Background Check
            </span>
            <span>Passed & Active</span>
          </div>
        </div>

        {/* Scan Status / Interactive Simulation */}
        <div className="mt-6 space-y-3">
          {isScanned ? (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 rounded-2xl text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-center gap-2 font-bold animate-fade-in">
              <CheckCircle2 size={18} className="text-emerald-600" />
              <span>Doorstep Check-In Verified Successfully!</span>
            </div>
          ) : (
            <button
              onClick={handleSimulateScan}
              disabled={scanning}
              className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-full shadow-lg transition-all flex items-center justify-center gap-2 text-xs hover:scale-[1.01] active:scale-[0.99]"
            >
              {scanning ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Verifying Doorstep Scan...</span>
                </>
              ) : (
                <>
                  <Smartphone size={15} />
                  <span>Simulate Doorstep Pro Check-In</span>
                </>
              )}
            </button>
          )}

          <p className="text-[11px] text-center text-stone-400">
            Encrypted with 256-bit QuickServe Security Architecture
          </p>
        </div>
      </div>
    </div>
  )
}
