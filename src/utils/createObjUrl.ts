export default function createObjUrl(
  file: File | undefined,
  cb: (url?: string) => void,
) {
  if (file) {
    const url = URL.createObjectURL(file)

    cb(url)
    // Cleanup old URL
    return () => URL.revokeObjectURL(url)
  } else {
    cb()
  }
}
