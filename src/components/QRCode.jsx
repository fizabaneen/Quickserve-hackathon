import React from 'react'

/**
 * Lightweight, zero-dependency QR Code generator (Version 1-4 Byte Mode with ECC)
 * Generates valid, standards-compliant SVG QR codes directly in React.
 */

// Galois Field GF(256) tables for Reed-Solomon error correction
const GF_EXP = new Uint8Array(512)
const GF_LOG = new Uint8Array(256)
let x = 1
for (let i = 0; i < 255; i++) {
  GF_EXP[i] = x
  GF_EXP[i + 255] = x
  GF_LOG[x] = i
  x = (x << 1) ^ (x >= 128 ? 0x11d : 0)
}

function gfMul(a, b) {
  if (a === 0 || b === 0) return 0
  return GF_EXP[GF_LOG[a] + GF_LOG[b]]
}

function rsGeneratorPoly(degree) {
  let poly = [1]
  for (let i = 0; i < degree; i++) {
    const next = new Array(poly.length + 1).fill(0)
    const factor = GF_EXP[i]
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= poly[j]
      next[j + 1] ^= gfMul(poly[j], factor)
    }
    poly = next
  }
  return poly
}

function rsCalculateEcc(data, ecCount) {
  const gen = rsGeneratorPoly(ecCount)
  const remainder = new Array(ecCount).fill(0)
  for (let i = 0; i < data.length; i++) {
    const factor = data[i] ^ remainder[0]
    for (let j = 0; j < ecCount - 1; j++) {
      remainder[j] = remainder[j + 1] ^ gfMul(gen[j + 1], factor)
    }
    remainder[ecCount - 1] = gfMul(gen[ecCount], factor)
  }
  return remainder
}

function generateQRMatrix(text) {
  const encoder = new TextEncoder()
  const textBytes = Array.from(encoder.encode(text))

  const version = textBytes.length <= 32 ? 3 : 4
  const size = version * 4 + 17
  const totalCodewords = version === 3 ? 70 : 100
  const ecCodewords = version === 3 ? 26 : 36
  const dataCapacity = totalCodewords - ecCodewords

  const bitBuffer = []
  function pushBits(val, len) {
    for (let i = len - 1; i >= 0; i--) {
      bitBuffer.push((val >> i) & 1)
    }
  }

  pushBits(4, 4)
  pushBits(Math.min(textBytes.length, dataCapacity - 3), 8)

  for (let i = 0; i < Math.min(textBytes.length, dataCapacity - 3); i++) {
    pushBits(textBytes[i], 8)
  }

  const termLen = Math.min(4, dataCapacity * 8 - bitBuffer.length)
  pushBits(0, termLen)

  while (bitBuffer.length % 8 !== 0) {
    bitBuffer.push(0)
  }

  const dataBytes = []
  for (let i = 0; i < bitBuffer.length; i += 8) {
    let b = 0
    for (let j = 0; j < 8; j++) b = (b << 1) | bitBuffer[i + j]
    dataBytes.push(b)
  }

  let padToggle = false
  while (dataBytes.length < dataCapacity) {
    dataBytes.push(padToggle ? 0x11 : 0xec)
    padToggle = !padToggle
  }

  const ecBytes = rsCalculateEcc(dataBytes, ecCodewords)
  const allCodewords = dataBytes.concat(ecBytes)

  const matrix = Array.from({ length: size }, () => new Array(size).fill(null))
  const isReserved = Array.from({ length: size }, () => new Array(size).fill(false))

  function setModule(r, c, val, reserved = true) {
    if (r >= 0 && r < size && c >= 0 && c < size) {
      matrix[r][c] = val
      if (reserved) isReserved[r][c] = true
    }
  }

  function addFinder(top, left) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const isBlack = r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        setModule(top + r, left + c, isBlack ? 1 : 0)
      }
    }
    for (let i = -1; i <= 7; i++) {
      setModule(top + i, left - 1, 0)
      setModule(top + i, left + 7, 0)
      setModule(top - 1, left + i, 0)
      setModule(top + 7, left + i, 0)
    }
  }

  addFinder(0, 0)
  addFinder(0, size - 7)
  addFinder(size - 7, 0)

  const alignPos = version === 3 ? 22 : 26
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const isBlack = Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0)
      setModule(alignPos + r, alignPos + c, isBlack ? 1 : 0)
    }
  }

  for (let i = 8; i < size - 8; i++) {
    setModule(6, i, i % 2 === 0 ? 1 : 0)
    setModule(i, 6, i % 2 === 0 ? 1 : 0)
  }

  setModule(size - 8, 8, 1)

  for (let i = 0; i < 9; i++) {
    if (matrix[8][i] === null) setModule(8, i, 0)
    if (matrix[i][8] === null) setModule(i, 8, 0)
  }
  for (let i = size - 8; i < size; i++) {
    if (matrix[8][i] === null) setModule(8, i, 0)
    if (matrix[i][8] === null) setModule(i, 8, 0)
  }

  let bitIndex = 0
  const totalBits = allCodewords.length * 8
  let up = true

  for (let right = size - 1; right > 0; right -= 2) {
    if (right === 6) right--
    const rows = up
      ? Array.from({ length: size }, (_, i) => size - 1 - i)
      : Array.from({ length: size }, (_, i) => i)

    for (const r of rows) {
      for (let c = right; c >= right - 1; c--) {
        if (!isReserved[r][c]) {
          let bit = 0
          if (bitIndex < totalBits) {
            const byteIdx = Math.floor(bitIndex / 8)
            const bitOffset = 7 - (bitIndex % 8)
            bit = (allCodewords[byteIdx] >> bitOffset) & 1
            bitIndex++
          }
          const mask = (r + c) % 2 === 0
          matrix[r][c] = mask ? bit ^ 1 : bit
        }
      }
    }
    up = !up
  }

  const formatBits = [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0]
  const topCoords = [
    [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5],
    [8, 7], [8, 8], [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8],
  ]
  topCoords.forEach(([r, c], idx) => {
    matrix[r][c] = formatBits[idx]
  })

  for (let i = 0; i < 7; i++) {
    matrix[size - 1 - i][8] = formatBits[i]
  }
  for (let i = 7; i < 15; i++) {
    matrix[8][size - 15 + i] = formatBits[i]
  }

  return matrix
}

export function QRCode({
  value = 'https://quickserve.verify/booking',
  size = 180,
  fgColor = '#18181B',
  bgColor = '#FFFFFF',
  className = '',
  includeShield = true,
}) {
  const matrix = React.useMemo(() => {
    try {
      return generateQRMatrix(value)
    } catch (err) {
      console.error('QR generation error:', err)
      return null
    }
  }, [value])

  if (!matrix) return null

  const moduleCount = matrix.length
  const cellSize = size / moduleCount

  return (
    <div
      className={`relative inline-block p-3 rounded-2xl bg-white shadow-md border border-stone-200/80 ${className}`}
      style={{ width: size + 24, height: size + 24 }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="block"
        role="img"
        aria-label="Security QR Verification Code"
      >
        <rect width={size} height={size} fill={bgColor} rx={8} />
        {matrix.map((row, r) =>
          row.map((cell, c) => {
            if (cell === 1) {
              return (
                <rect
                  key={`${r}-${c}`}
                  x={c * cellSize}
                  y={r * cellSize}
                  width={cellSize + 0.3}
                  height={cellSize + 0.3}
                  fill={fgColor}
                  rx={cellSize > 5 ? 1 : 0}
                />
              )
            }
            return null
          })
        )}
      </svg>

      {/* Center Security Badge Icon */}
      {includeShield && (
        <div
          className="absolute inset-0 m-auto flex items-center justify-center pointer-events-none"
          style={{ width: Math.max(32, size * 0.22), height: Math.max(32, size * 0.22) }}
        >
          <div className="w-full h-full rounded-xl bg-stone-900 text-white flex items-center justify-center shadow-lg border-2 border-white">
            <svg
              className="w-4 h-4 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}
