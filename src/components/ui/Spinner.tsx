import React from "react"
import { RiseLoader } from "react-spinners"

const override = {
    display: "block",
    margin: "100px auto"
}

interface SpinnerProps {
    loading: boolean
}

const Spinner: React.FC<SpinnerProps> = ({ loading }) => {
  return (
    <RiseLoader
    color="#0f172a"
    loading={loading}
    cssOverride={override}
    size={20}
    />
  )
}

export default Spinner