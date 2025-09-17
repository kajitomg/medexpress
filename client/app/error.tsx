"use client"

import { Button } from "@/shared/ui"

function Error({ reset }: { reset?: () => void }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div>
        <h2>Что-то пошло не так!</h2>
        <Button onClick={reset}>Попробовать снова</Button>
      </div>
    </div>
  )
}

export default Error
