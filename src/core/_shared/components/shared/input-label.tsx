type InputLabelProps = {
  htmlFor: string
  label: string | undefined
}

export function InputLabel({ htmlFor, label }: InputLabelProps) {
  return (
    <>
      {label && (
        <label
          htmlFor={htmlFor}
          className="whitespace-pre-line text-xs peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
    </>
  )
}
