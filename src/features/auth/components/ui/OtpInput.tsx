import OtpInput, { type OTPInputProps } from 'react-otp-input'

export default function UiOtpInput({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="w-full flex items-center justify-center" dir="ltr">
      <OtpInput
        value={value}
        onChange={onChange}
        containerStyle="w-full flex items-center gap-x-2"
        numInputs={6}
        renderInput={(props, index) => (
          <input
            {...props}
            key={`react-input-otp-index-${index}`}
            className="grow text-center h-[50px] border border-black rounded-md "
          />
        )}
      />
    </div>
  )
}
